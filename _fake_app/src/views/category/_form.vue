<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form(@submit.prevent="onSubmit")
    .form-group
      input(v-model="localCategory.title" placeholder="Title" class="form-control")
    button.btn.btn-primary.btn-sm Save
    | 
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CategoryForm",
  props: {
    category: Object
  },
  data() {
    return {
      action: "/categories/",
      method: "POST",
      errors: []
    };
  },
  computed: {
    ...mapState("Category", ["options", "csrf"]),
    localCategory() {
      return Object.assign({}, this.category);
    }
  },
  mounted() {
    if (this.category.id >= 0) {
      this.action += this.category.id;
      this.method = "PATCH";
    }
  },
  methods: {
    ...mapActions("Category", ["submit", "option"]),
    onSubmit() {
      this.submit({ self: this });
    },
    getOptions(reference) {
      this.option(reference);
    }
  }
};
</script>
