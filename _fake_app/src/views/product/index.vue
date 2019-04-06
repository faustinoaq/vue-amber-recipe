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
              button.btn.btn-danger.btn-sm(@click="destroyProduct($event, product.id)") Delete
  p(v-else) No products
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Products",
  computed: {
    ...mapState("products", {
      products: state => state.products
    })
  },
  methods: {
    fetchProduct() {
      this.$store.dispatch("products/all");
    },
    destroyProduct(event, id) {
      event.preventDefault();
      if (confirm("Are you sure?")) {
        this.$store.dispatch("products/destroy", id);
      }
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>

<style>
.actions {
  min-width: 161px;
}
</style>
