<template lang="pug">
div
  h1 Show Item
  p {{item.enabled}}
  p
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
    | 
    router-link.btn.btn-success.btn-sm(:to="'/items/' + item.id + '/edit'") Edit
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ItemShow",
  props: {
    id: String
  },
  computed: {
    ...mapGetters("Item", ["getById"])
  },
  methods: {
    ...mapActions("Item", ["show"])
  },
  data() {
    return {
      item: {}
    };
  },
  created() {
    let object = this.getById(parseInt(this.id));
    if (object.id) {
      this.item = object;
      return; // Don't need Ajax because object is already in store
    }
    this.show({ self: this });
  }
};
</script>
