<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form
    .form-group
      textarea(v-model="comment.body" placeholder="Body" class="form-control" size="30x10")
    .form-group
      label(for="product")
      select(v-model="comment.product_id" id="product" class="form-control")
        template(v-if="products.length")
          option(v-for="product in products" :value="product.id") {{ product.id }}
        template(v-else)
          option(disabled) No products
    button.btn.btn-primary.btn-sm(@click.prevent="onSubmit()") Submit
    | 
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CommentForm",
  props: {
    _comment: Object
  },
  computed: {
    ...mapState("Comment", ["csrf"]),
    ...mapState("Product", ["products"]),
    comment() {
      return Object.assign({}, this._comment);
    }
  },
  methods: {
    ...mapActions("Comment", ["submit"]),
    ...mapActions("Product", ["productIndex"]),
    onSubmit() {
      this.submit({ self: this });
    }
  },
  data() {
    return {
      action: "/comments/",
      method: "POST",
      errors: []
    };
  },
  mounted() {
    if (this._comment.id >= 0) {
      this.action += this._comment.id;
      this.method = "PATCH";
    }
  },
  created(){
    this.productIndex({ self: this });
  }
};
</script>
