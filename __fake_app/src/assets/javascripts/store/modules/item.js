import itemApi from "../api/item"

const moduleItem = {
  namespaced: true,
  state: {
    items: [],
    csrf: null
  },
  mutations: {
    SAVE(state, items) {
      state.items = items;
    },
    APPEND(state, data) {
      let object = state.items.find(element => element.id === data.id);
      if (!object) {
        state.items.push(data);
      }
    },
    UPDATE(state, data) {
      let objectIndex = state.items.findIndex(element => element.id === data.id);
      if (objectIndex >= 0) {
        state.items[objectIndex] = data;
      }
    },
    DELETE(state, id) {
      state.items = state.items.filter(element => element.id !== id);
    },
    CSRF(state, token) {
      state.csrf = token;
    }
  },
  getters: {
    getById: (state) => (id) => {
      let object = state.items.find(element => element.id === id);
      if (object) {
        return object;
      }
      return {};
    }
  },
  actions: {
    itemIndex({ commit }, { self }) {
      itemApi.index(
        function success(data) {
          commit("CSRF", data.csrf);
          commit("SAVE", data.items);
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not load items!"
          });
        }
      )
    },
    new({ commit }, { self }) {
      itemApi.new(
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
      itemApi.show(
        self.id,
        function success(data) {
          commit("CSRF", data.csrf);
          commit("APPEND", data.item);
          self.item = self.getById(parseInt(self.id));
        },
        function failure(data) {
          self.$root.$emit("message", data.responseJSON.flash);
        }
      )
    },
    submit({ commit }, { self }) {
      itemApi.submit(
        self,
        function success(data) {
          if (self.method == "POST") {
            commit("APPEND", self.item);
          } else if (self.method == "PATCH") {
            commit("UPDATE", self.item);
          }
          self.$root.$emit("message", data.flash);
        },
        function failure(data) {
          if (!data.responseJSON) {
            self.$root.$emit("message", {
              danger: "Could not save Item!"
            });
            return;
          }
          if (data.responseJSON.error) {
            // CSRF check failed
            self.$root.$emit("message", { danger: data.responseJSON.error });
          } else if (data.responseJSON.flash) {
            // Amber Exceptions (param validation, item not found, etc)
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
      itemApi.destroy(
        self,
        id,
        function success() {
          commit("DELETE", id);
          self.$root.$emit("message", {
            warning: "Item deleted!"
          });
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not delete item!"
          });
        }
      )
    }
  }
}

export default moduleItem;
