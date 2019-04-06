<template lang="pug">
.row
  .logo.d-none.d-md-block
  .col-sm-12.col-md-6
    h2 Welcome!
    p
      | Thank you for trying out Vue.js and Amber Framework.
      | This application is using a front-end written in Vue.js
      | and a back-end built with Amber Framework.
    .list-group
      a.list-group-item.list-group-item-action(target="_blank" href="https://docs.amberframework.org")
        | Getting Started with Amber Framework
      a.list-group-item.list-group-item-action(target="_blank" href="https://vuejs.org/v2/guide/")
        | Getting Started with Vue.js
      a.list-group-item.list-group-item-action(target="_blank" href="https://github.com/faustinoaq/amber-vue-recipe")
        | Take a look at Source Code on Github
</template>

<script>
export default {
  name: "Home",
  created() {
    this.$root.$emit("message", {
      info: "This page has been rendered by Vue.js!"
    });
  }
};
</script>

<style lang="scss">
$color: beige;

.logo {
  background-color: $color;
  background-image: url("../../assets/images/logo.png");
  background-size: contain;
  width: 200px;
  height: 278px;
}
</style>
