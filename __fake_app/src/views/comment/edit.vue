<template lang="pug">
div
  h1 Edit Comment
  CommentForm(:_comment="comment")
</template>

<script>
import CommentForm from "./_form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommentEdit",
  props: {
    id: String
  },
  components: {
    CommentForm: CommentForm
  },
  computed: {
    ...mapGetters("Comment", ["getById"])
  },
  methods: {
    ...mapActions("Comment", ["show"])
  },
  data() {
    return {
      comment: {}
    };
  },
  created() {
    let object = this.getById(parseInt(this.id));
    if (object.id) {
      this.comment = object;
      return; // Don't need Ajax because object is already in store
    }
    this.show({ self: this });
  }
};
</script>
