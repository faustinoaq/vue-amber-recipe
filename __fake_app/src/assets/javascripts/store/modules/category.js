import categoryApi from "../api/category"

const moduleCategory = {
  namespaced: true,
  state: {
    categories: [],
    csrf: null
  },
  mutations: {
    SAVE(state, categories) {
      state.categories = categories;
    },
    APPEND(state, data) {
      let object = state.categories.find(element => element.id === data.id);
      if (!object) {
        state.categories.push(data);
      }
    },
    UPDATE(state, data) {
      let objectIndex = state.categories.findIndex(element => element.id === data.id);
      if (objectIndex >= 0) {
        state.categories[objectIndex] = data;
      }
    },
    DELETE(state, id) {
      state.categories = state.categories.filter(element => element.id !== id);
    },
    CSRF(state, token) {
      state.csrf = token;
    }
  },
  getters: {
    getById: (state) => (id) => {
      let object = state.categories.find(element => element.id === id);
      if (object) {
        return object;
      }
      return {};
    }
  },
  actions: {
    categoryIndex({ commit }, { self }) {
      categoryApi.index(
        function success(data) {
          commit("CSRF", data.csrf);
          commit("SAVE", data.categories);
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not load categories!"
          });
        }
      )
    },
    new({ commit }, { self }) {
      categoryApi.new(
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
      categoryApi.show(
        self.id,
        function success(data) {
          commit("CSRF", data.csrf);
          commit("APPEND", data.category);
          self.category = self.getById(parseInt(self.id));
        },
        function failure(data) {
          self.$root.$emit("message", data.responseJSON.flash);
        }
      )
    },
    submit({ commit }, { self }) {
      categoryApi.submit(
        self,
        function success(data) {
          if (self.method == "POST") {
            commit("APPEND", self.category);
          } else if (self.method == "PATCH") {
            commit("UPDATE", self.category);
          }
          self.$root.$emit("message", data.flash);
        },
        function failure(data) {
          if (!data.responseJSON) {
            self.$root.$emit("message", {
              danger: "Could not save Category!"
            });
            return;
          }
          if (data.responseJSON.error) {
            // CSRF check failed
            self.$root.$emit("message", { danger: data.responseJSON.error });
          } else if (data.responseJSON.flash) {
            // Amber Exceptions (param validation, category not found, etc)
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
      categoryApi.destroy(
        self,
        id,
        function success() {
          commit("DELETE", id);
          self.$root.$emit("message", {
            warning: "Category deleted!"
          });
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not delete category!"
          });
        }
      )
    }
  }
}

export default moduleCategory;
