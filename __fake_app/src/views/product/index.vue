<template lang="pug">
div
  .d-flex
    h2 Products
    .ml-auto
      router-link.btn.btn-success.btn-sm(to="/products/new") New
  .table-responsive(v-if="products.length")
    table.table.table-striped
      thead
        tr
          th Titles
          th Descriptions
          th Categories
          th Actions
      tbody
        tr(v-for="product in products")
          td {{product.title}}
          td {{product.description}}
          td {{product.category_id}}
          td
            .actions
              router-link.btn.btn-primary.btn-sm(:to="'/products/' + product.id") Read
              | 
              router-link.btn.btn-success.btn-sm(:to="'/products/' + product.id + '/edit'") Edit
              | 
              button.btn.btn-danger.btn-sm(@click="showModal = true; currentProductId = product.id") Delete
  p(v-else) No products
  DeleteModal(v-if="showModal" @close="showModal = false" @destroy="destroyProduct"
    title="Delete Product"
    message="Are you sure?"
  )
</template>

<script>
import DeleteModal from "../../assets/vue/DeleteModal.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "products",
  components: {
    DeleteModal: DeleteModal
  },
  computed: {
    ...mapState("Product", ["products", "csrf"])
  },
  methods: {
    ...mapActions("Product", ["productIndex", "destroy"]),
    destroyProduct() {
      this.destroy({ self: this, id: this.currentProductId });
    }
  },
  data() {
    return {
      showModal: false,
      currentProductId: null
    };
  },
  created() {
    this.productIndex({ self : this });
  }
};
</script>

<style>
.actions {
  min-width: 161px;
}
</style>
