<template lang="pug">
div
  .d-flex
    h2 Comments
    .ml-auto
      router-link.btn.btn-success.btn-sm(to="/comments/new") New
  .table-responsive(v-if="comments.length")
    table.table.table-striped
      thead
        tr
          th Bodies
          th Products
          th Actions
      tbody
        tr(v-for="comment in comments")
          td {{comment.body}}
          td {{comment.product_id}}
          td
            .actions
              router-link.btn.btn-primary.btn-sm(:to="'/comments/' + comment.id") Read
              | 
              router-link.btn.btn-success.btn-sm(:to="'/comments/' + comment.id + '/edit'") Edit
              | 
              button.btn.btn-danger.btn-sm(@click="showModal = true; currentCommentId = comment.id") Delete
  p(v-else) No comments
  DeleteModal(v-if="showModal" @close="showModal = false" @destroy="destroyComment"
    title="Delete Comment"
    message="Are you sure?"
  )
</template>

<script>
import DeleteModal from "../../assets/vue/DeleteModal.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "comments",
  components: {
    DeleteModal: DeleteModal
  },
  computed: {
    ...mapState("Comment", ["comments", "csrf"])
  },
  methods: {
    ...mapActions("Comment", ["commentIndex", "destroy"]),
    destroyComment() {
      this.destroy({ self: this, id: this.currentCommentId });
    }
  },
  data() {
    return {
      showModal: false,
      currentCommentId: null
    };
  },
  created() {
    this.commentIndex({ self : this });
  }
};
</script>

<style>
.actions {
  min-width: 161px;
}
</style>
