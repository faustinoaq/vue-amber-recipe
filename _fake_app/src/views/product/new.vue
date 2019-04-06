<template lang="pug">
div
  h1 New Product
  ProductForm(:product="product")
</template>

<script>
import ProductForm from "./_form.vue";

export default {
  name: "ProductNew",
  components: {
    ProductForm: ProductForm
  },
  data() {
    return {
      product: {}
    };
  }
};
</script>
