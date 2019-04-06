<template lang="pug">
div
  .d-flex
    h2 Categories
    .ml-auto
      router-link.btn.btn-success.btn-sm(to="/categories/new") New
  .table-responsive(v-if="categories.length")
    table.table.table-striped
      thead
        tr
          th Titles
          th Actions
      tbody
        tr(v-for="category in categories")
          td {{category.title}}
          td
            .actions
              router-link.btn.btn-primary.btn-sm(:to="'/categories/' + category.id") Read
              | 
              router-link.btn.btn-success.btn-sm(:to="'/categories/' + category.id + '/edit'") Edit
              | 
              button.btn.btn-danger.btn-sm(@click="showModal = true; currentCategoryId = category.id") Delete
  p(v-else) No categories
  DeleteModal(v-if="showModal" @close="showModal = false" @destroy="destroyCategory"
    title="Delete Category"
    message="Are you sure?"
  )
</template>

<script>
import DeleteModal from "../../assets/vue/DeleteModal.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "categories",
  components: {
    DeleteModal: DeleteModal
  },
  computed: {
    ...mapState("Category", ["categories", "csrf"])
  },
  methods: {
    ...mapActions("Category", ["categoryIndex", "destroy"]),
    destroyCategory() {
      this.destroy({ self: this, id: this.currentCategoryId });
    }
  },
  data() {
    return {
      showModal: false,
      currentCategoryId: null
    };
  },
  created() {
    this.categoryIndex({ self : this });
  }
};
</script>

<style>
.actions {
  min-width: 161px;
}
</style>
