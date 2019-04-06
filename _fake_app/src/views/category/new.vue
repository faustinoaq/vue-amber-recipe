<template lang="pug">
div
  h1 New Category
  CategoryForm(:category="category")
</template>

<script>
import CategoryForm from "./_form.vue";
import { mapActions } from "vuex";

export default {
  name: "CategoryNew",
  components: {
    CategoryForm: CategoryForm
  },
  data() {
    return {
      category: {}
    };
  },
  methods: {
    ...mapActions("Category", ["new"])
  },
  created() {
    this.new({ self: this });
  }
};
</script>
