<template lang="pug">
div
  h1 Show Comment
  p {{comment.body}}
  p {{comment.product_id}}
  p
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
    | 
    router-link.btn.btn-success.btn-sm(:to="'/comments/' + comment.id + '/edit'") Edit
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CommentShow",
  props: {
    id: String
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
