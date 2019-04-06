<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form
    .form-group
      input(v-model="product.title" placeholder="Title" class="form-control")
    .form-group
      textarea(v-model="product.description" placeholder="Description" class="form-control" size="30x10")
    .form-group
      label(for="category")
      select(v-model="product.category_id" id="category" class="form-control")
        template(v-if="options.length")
          option(v-for="option in options['categories']" :value="option.id") {{ option.id }}
        template(v-else)
          option(disabled) No categories
    button.btn.btn-primary.btn-sm(@click="onSubmit($event)") Submit
    | 
    router-link.btn.btn-secondary.btn-sm(to="/products") back
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProductForm",
  props: {
    product: Object
  },
  data() {
    return {
      action: "/products/",
      method: "POST"
    };
  },
  computed: {
    ...mapState("products", {
      errors: state => state.errors,
      options: state => state.options
    })
  },
  mounted() {
    if (!isNaN(parseInt(this.product.id))) {
      this.action += this.product.id;
      this.method = "PATCH";
    }
    this.getOptions('categories');
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("products/submit", {
        action: this.action,
        method: this.method,
        data: this.product
      });
    },
    getOptions(reference) {
      this.$store.dispatch("products/option", reference);
    }
  }
};
</script>
