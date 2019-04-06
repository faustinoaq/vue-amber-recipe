<template lang="pug">
div
  h1 New Comment
  CommentForm(:_comment="comment")
</template>

<script>
import CommentForm from "./_form.vue";
import { mapActions } from "vuex";

export default {
  name: "CommentNew",
  components: {
    CommentForm: CommentForm
  },
  methods: {
    ...mapActions("Comment", ["new"])
  },
  data() {
    return {
      comment: {}
    };
  },
  created() {
    this.new({ self: this });
  }
};
</script>
