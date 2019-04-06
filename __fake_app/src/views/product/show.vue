<template lang="pug">
div
  h1 Show Product
  p {{product.title}}
  p {{product.description}}
  p {{product.category_id}}
  p
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
    | 
    router-link.btn.btn-success.btn-sm(:to="'/products/' + product.id + '/edit'") Edit
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductShow",
  props: {
    id: String
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
