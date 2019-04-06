<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form
    .form-group
      input(v-model="category.title" placeholder="Title" class="form-control")
    button.btn.btn-primary.btn-sm(@click.prevent="onSubmit()") Submit
    | 
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CategoryForm",
  props: {
    _category: Object
  },
  computed: {
    ...mapState("Category", ["csrf"]),
    category() {
      return Object.assign({}, this._category);
    }
  },
  methods: {
    ...mapActions("Category", ["submit"]),
    onSubmit() {
      this.submit({ self: this });
    }
  },
  data() {
    return {
      action: "/categories/",
      method: "POST",
      errors: []
    };
  },
  mounted() {
    if (this._category.id >= 0) {
      this.action += this._category.id;
      this.method = "PATCH";
    }
  },
  created(){
  }
};
</script>
