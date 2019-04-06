<template lang="pug">
div
  h1 Edit Product
  ProductForm(:_product="product")
</template>

<script>
import ProductForm from "./_form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductEdit",
  props: {
    id: String
  },
  components: {
    ProductForm: ProductForm
  },
  computed: {
    ...mapGetters("Product", ["getById"])
  },
  methods: {
    ...mapActions("Product", ["show"])
  },
  data() {
    return {
      product: {}
    };
  },
  created() {
    let object = this.getById(parseInt(this.id));
    if (object.id) {
      this.product = object;
      return; // Don't need Ajax because object is already in store
    }
    this.show({ self: this });
  }
};
</script>
