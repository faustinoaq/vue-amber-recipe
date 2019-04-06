<template lang="pug">
.div
  ul.errors
    li(v-for="error in errors") {{ error }}

  form
    .form-group
      .form-check
        input.form-check-input(v-model="item.enabled" id="enabled" :true-value=1 :false-value=0 type="checkbox" :checked="item.enabled == '1'" )
        label.form-check-label(for="enabled") enabled
    button.btn.btn-primary.btn-sm(@click.prevent="onSubmit()") Submit
    | 
    button.btn.btn-secondary.btn-sm(@click.prevent="$router.go(-1)") back
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ItemForm",
  props: {
    _item: Object
  },
  computed: {
    ...mapState("Item", ["csrf"]),
    item() {
      return Object.assign({}, this._item);
    }
  },
  methods: {
    ...mapActions("Item", ["submit"]),
    onSubmit() {
      this.submit({ self: this });
    }
  },
  data() {
    return {
      action: "/items/",
      method: "POST",
      errors: []
    };
  },
  mounted() {
    if (this._item.id >= 0) {
      this.action += this._item.id;
      this.method = "PATCH";
    }
  },
  created(){
  }
};
</script>
