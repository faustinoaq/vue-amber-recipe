<template lang="pug">
div
  .d-flex
    h2 Items
    .ml-auto
      router-link.btn.btn-success.btn-sm(to="/items/new") New
  .table-responsive(v-if="items.length")
    table.table.table-striped
      thead
        tr
          th Enableds
          th Actions
      tbody
        tr(v-for="item in items")
          td {{item.enabled}}
          td
            .actions
              router-link.btn.btn-primary.btn-sm(:to="'/items/' + item.id") Read
              | 
              router-link.btn.btn-success.btn-sm(:to="'/items/' + item.id + '/edit'") Edit
              | 
              button.btn.btn-danger.btn-sm(@click="showModal = true; currentItemId = item.id") Delete
  p(v-else) No items
  DeleteModal(v-if="showModal" @close="showModal = false" @destroy="destroyItem"
    title="Delete Item"
    message="Are you sure?"
  )
</template>

<script>
import DeleteModal from "../../assets/vue/DeleteModal.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "items",
  components: {
    DeleteModal: DeleteModal
  },
  computed: {
    ...mapState("Item", ["items", "csrf"])
  },
  methods: {
    ...mapActions("Item", ["itemIndex", "destroy"]),
    destroyItem() {
      this.destroy({ self: this, id: this.currentItemId });
    }
  },
  data() {
    return {
      showModal: false,
      currentItemId: null
    };
  },
  created() {
    this.itemIndex({ self : this });
  }
};
</script>

<style>
.actions {
  min-width: 161px;
}
</style>
