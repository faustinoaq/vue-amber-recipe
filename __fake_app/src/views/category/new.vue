<template lang="pug">
div
  h1 New Category
  CategoryForm(:_category="category")
</template>

<script>
import CategoryForm from "./_form.vue";
import { mapActions } from "vuex";

export default {
  name: "CategoryNew",
  components: {
    CategoryForm: CategoryForm
  },
  methods: {
    ...mapActions("Category", ["new"])
  },
  data() {
    return {
      category: {}
    };
  },
  created() {
    this.new({ self: this });
  }
};
</script>
