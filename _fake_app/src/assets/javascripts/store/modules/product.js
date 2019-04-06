import product from "../api/product"

const moduleProduct = {
  state: {
    products: [],
    errors: [],
    options: {}
  },
  mutations: {
    save(state, data) {
      state.products = data;
    },
    append(state, data) {
      let object = state.products.find(element => element.id === data.id);
      if (!object) {
        state.products.push(data);
      }
    },
    update(state, data) {
      let objectIndex = state.products.findIndex(element => element.id === data.id);
      if (objectIndex > 0) {
        state.products[objectIndex] = data;
      }
    },
    delete(state, id) {
      state.products = state.products.filter(element => element.id !== id);
    },
    options(state, {data, references}) {
      state.options[references] = data;
    },
    errors(state, data) {
      state.errors = data;
    }
  },
  getters: {
    get(state) {
      return (id) => {
        state.products.find(element => element.id === id);
      }
    }
  },
  actions: {
    all({commit}) {
      product.all(
        function success(data) {
          commit("save", data)
        },
        function failure() {
          this.$root.$emit("message", {
            danger: "Could not load products!"
          });
        }
      )
    },
    show({commit}, id) {
      if (state.products.find(element => element.id === data.id)) {
        return;
      }
      product.show(
        id,
        function success(data) {
          commit("append", data)
        },
        function failure() {
          this.$root.$emit("message", {
            danger: "Could not load product!"
          });
        }
      )
    },
    edit({commit}, id) {
      product.edit(
        id,
        function success(data) {
          window.csrf = data.csrf;
          commit("append", data.product);
        },
        function failure() {
          this.$root.$emit("message", {
            danger: "Could not load product!"
          });
        }
      )
    },
    submit({commit}, payload) {
      let method = payload.method;
      let action = payload.action;
      product.submit(
        method,
        action,
        function success(data) {
          if (method == "POST") {
            commit("append", payload.data);
          } else {
            commit("update", payload.data);
          }
          this.$root.$emit("message", data.flash);
        },
        function failure(data) {
          if (data.responseJSON.error) {
            // CSRF check failed
            this.$root.$emit("message", { danger: data.responseJSON.error });
          } else if (data.responseJSON.flash) {
            // Amber Exceptions (param validation, product not found, etc)
            this.$root.$emit("message", data.responseJSON.flash);
            if (data.responseJSON.errors) {
              // Granite ORM validation errors (field validations)
              commit("errors", data.responseJSON.errors);
            }
          }
        }
      )
    },
    options({commit}, references) {
      product.all(
        function success(data) {
          commit("options", {data, references})
        },
        function failure() {
          this.$root.$emit("message", {
            danger: "Could not load !"
          });
        },
        `/${references}`
      )
    },
    destroy({commit}, id){
      product.destroy(
        id,
        function success() {
          commit("delete", id)
        },
        function failure() {
          this.$root.$emit("message", {
            danger: "Could not delete product!"
          });
        }
      )
    }
  }
}

export default moduleProduct;
