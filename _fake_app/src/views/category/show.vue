<template lang="pug">
div
  h1 Show Category
  p {{category.title}}
  p
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
    | 
    router-link.btn.btn-success.btn-sm(:to="'/categories/' + category.id + '/edit'") Edit
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CategoryShow",
  props: {
    id: String
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
