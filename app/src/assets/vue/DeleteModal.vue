<template lang="pug">
transition(name="modal")
  .modal-mask
    .modal-wrapper
      .modal-container
        .modal-header
          slot(name="header") {{ title }}
        .modal-body
          slot(name="body") {{ message }}
        .modal-footer
          slot(name="footer")
            button.modal-default-button.btn.btn-secondary.btn-sm(@click="$emit('close')") Cancel
            button.modal-default-button.btn.btn-danger.btn-sm(@click="$emit('destroy'); $emit('close')" ref="autofocus") OK
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    title: String,
    message: String
  },
  mounted() {
    this.$refs.autofocus.focus();
  }
};
</script>


<style>
/* Based on https://vuejs.org/v2/examples/modal.html */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity .3s ease;
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
