<template lang="pug">
div
  h1 New Product
  ProductForm(:_product="product")
</template>

<script>
import ProductForm from "./_form.vue";
import { mapActions } from "vuex";

export default {
  name: "ProductNew",
  components: {
    ProductForm: ProductForm
  },
  methods: {
    ...mapActions("Product", ["new"])
  },
  data() {
    return {
      product: {}
    };
  },
  created() {
    this.new({ self: this });
  }
};
</script>
