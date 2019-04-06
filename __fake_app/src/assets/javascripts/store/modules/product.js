import productApi from "../api/product"

const moduleProduct = {
  namespaced: true,
  state: {
    products: [],
    csrf: null
  },
  mutations: {
    SAVE(state, products) {
      state.products = products;
    },
    APPEND(state, data) {
      let object = state.products.find(element => element.id === data.id);
      if (!object) {
        state.products.push(data);
      }
    },
    UPDATE(state, data) {
      let objectIndex = state.products.findIndex(element => element.id === data.id);
      if (objectIndex >= 0) {
        state.products[objectIndex] = data;
      }
    },
    DELETE(state, id) {
      state.products = state.products.filter(element => element.id !== id);
    },
    CSRF(state, token) {
      state.csrf = token;
    }
  },
  getters: {
    getById: (state) => (id) => {
      let object = state.products.find(element => element.id === id);
      if (object) {
        return object;
      }
      return {};
    }
  },
  actions: {
    productIndex({ commit }, { self }) {
      productApi.index(
        function success(data) {
          commit("CSRF", data.csrf);
          commit("SAVE", data.products);
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not load products!"
          });
        }
      )
    },
    new({ commit }, { self }) {
      productApi.new(
        function success(data) {
          commit("CSRF", data.csrf);
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not load CSRF Token!"
          });
        }
      )
    },
    show({ commit }, { self }) {
      productApi.show(
        self.id,
        function success(data) {
          commit("CSRF", data.csrf);
          commit("APPEND", data.product);
          self.product = self.getById(parseInt(self.id));
        },
        function failure(data) {
          self.$root.$emit("message", data.responseJSON.flash);
        }
      )
    },
    submit({ commit }, { self }) {
      productApi.submit(
        self,
        function success(data) {
          if (self.method == "POST") {
            commit("APPEND", self.product);
          } else if (self.method == "PATCH") {
            commit("UPDATE", self.product);
          }
          self.$root.$emit("message", data.flash);
        },
        function failure(data) {
          if (!data.responseJSON) {
            self.$root.$emit("message", {
              danger: "Could not save Product!"
            });
            return;
          }
          if (data.responseJSON.error) {
            // CSRF check failed
            self.$root.$emit("message", { danger: data.responseJSON.error });
          } else if (data.responseJSON.flash) {
            // Amber Exceptions (param validation, product not found, etc)
            self.$root.$emit("message", data.responseJSON.flash);
            if (data.responseJSON.errors) {
              // Granite ORM validation errors (field validations)
              self.errors = data.responseJSON.errors;
            }
          }
        }
      )
    },
    destroy({ commit }, { self, id }) {
      productApi.destroy(
        self,
        id,
        function success() {
          commit("DELETE", id);
          self.$root.$emit("message", {
            warning: "Product deleted!"
          });
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not delete product!"
          });
        }
      )
    }
  }
}

export default moduleProduct;
