import commentApi from "../api/comment"

const moduleComment = {
  namespaced: true,
  state: {
    comments: [],
    csrf: null
  },
  mutations: {
    SAVE(state, comments) {
      state.comments = comments;
    },
    APPEND(state, data) {
      let object = state.comments.find(element => element.id === data.id);
      if (!object) {
        state.comments.push(data);
      }
    },
    UPDATE(state, data) {
      let objectIndex = state.comments.findIndex(element => element.id === data.id);
      if (objectIndex >= 0) {
        state.comments[objectIndex] = data;
      }
    },
    DELETE(state, id) {
      state.comments = state.comments.filter(element => element.id !== id);
    },
    CSRF(state, token) {
      state.csrf = token;
    }
  },
  getters: {
    getById: (state) => (id) => {
      let object = state.comments.find(element => element.id === id);
      if (object) {
        return object;
      }
      return {};
    }
  },
  actions: {
    commentIndex({ commit }, { self }) {
      commentApi.index(
        function success(data) {
          commit("CSRF", data.csrf);
          commit("SAVE", data.comments);
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not load comments!"
          });
        }
      )
    },
    new({ commit }, { self }) {
      commentApi.new(
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
      commentApi.show(
        self.id,
        function success(data) {
          commit("CSRF", data.csrf);
          commit("APPEND", data.comment);
          self.comment = self.getById(parseInt(self.id));
        },
        function failure(data) {
          self.$root.$emit("message", data.responseJSON.flash);
        }
      )
    },
    submit({ commit }, { self }) {
      commentApi.submit(
        self,
        function success(data) {
          if (self.method == "POST") {
            commit("APPEND", self.comment);
          } else if (self.method == "PATCH") {
            commit("UPDATE", self.comment);
          }
          self.$root.$emit("message", data.flash);
        },
        function failure(data) {
          if (!data.responseJSON) {
            self.$root.$emit("message", {
              danger: "Could not save Comment!"
            });
            return;
          }
          if (data.responseJSON.error) {
            // CSRF check failed
            self.$root.$emit("message", { danger: data.responseJSON.error });
          } else if (data.responseJSON.flash) {
            // Amber Exceptions (param validation, comment not found, etc)
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
      commentApi.destroy(
        self,
        id,
        function success() {
          commit("DELETE", id);
          self.$root.$emit("message", {
            warning: "Comment deleted!"
          });
        },
        function failure() {
          self.$root.$emit("message", {
            danger: "Could not delete comment!"
          });
        }
      )
    }
  }
}

export default moduleComment;
