<template lang="pug">
div
  h1 Edit Category
  CategoryForm(:category="category")
</template>

<script>
import CategoryForm from "./_form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoryEdit",
  props: {
    id: String
  },
  components: {
    CategoryForm: CategoryForm
  },
  data() {
    return {
      category: {}
    };
  },
  computed: {
    ...mapGetters("Category", ["getById"])
  },
  methods: {
    ...mapActions("Category", ["show"])
  },
  created() {
    let object = this.getById(parseInt(this.id));
    if (object.id) {
      this.category = object;
      return; // Don't need Ajax because object is already in store
    }
    this.show({ self: this });
  }
};
</script>
