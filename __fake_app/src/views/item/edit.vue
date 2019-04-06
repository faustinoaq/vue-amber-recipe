<template lang="pug">
div
  h1 Edit Item
  ItemForm(:_item="item")
</template>

<script>
import ItemForm from "./_form.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ItemEdit",
  props: {
    id: String
  },
  components: {
    ItemForm: ItemForm
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
