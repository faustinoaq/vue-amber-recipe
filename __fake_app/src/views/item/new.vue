<template lang="pug">
div
  h1 New Item
  ItemForm(:_item="item")
</template>

<script>
import ItemForm from "./_form.vue";
import { mapActions } from "vuex";

export default {
  name: "ItemNew",
  components: {
    ItemForm: ItemForm
  },
  methods: {
    ...mapActions("Item", ["new"])
  },
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.new({ self: this });
  }
};
</script>
