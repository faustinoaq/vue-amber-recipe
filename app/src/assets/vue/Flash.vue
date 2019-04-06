<template lang="pug">
div
  div.alert.alert-dismissible.alert-shake(v-for="(value, key) in flash" :class="'alert-' + key" role="alert")
    p {{ value }}
    button.close(type="button" @click="close" aria-label="Close")
      span(aria-hidden="true") &times;
  </button>
</template>

<script>
export default {
  data() {
    return {
      flash: {}
    };
  },
  methods: {
    close() {
      $(".alert").fadeOut(200);
    },
    notify() {
      $(".alert")
        .hide()
        .removeClass("alert-shake")
        .show()
        .addClass("alert-shake");
    }
  },
  mounted() {
    this.flash = {};
    this.$root.$on("message", data => {
      this.flash = data;
      this.notify();
    });
  }
};
</script>

<style lang="scss">
/* Based on https://css-tricks.com/snippets/css/shake-css-keyframe-animation/ */
.alert-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translateX(-1px);
  }
  20%,
  80% {
    transform: translateX(2px);
  }
  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }
  40%,
  60% {
    transform: translateX(4px);
  }
}
</style>
