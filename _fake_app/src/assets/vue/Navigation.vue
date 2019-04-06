<template lang="pug">
nav.nav
  router-link.nav-item(
    v-for="route in routes.filter((r) => { return r.text })"
    :key="route.path"
    :to="route.path")
    | {{route.text}}
</template>

<script>
import routes from "../javascripts/routes";

export default {
  data() {
    return {
      routes: routes
    };
  }
};
</script>

<style lang="scss">
.masthead {
  background-color: #f4994b;
  box-shadow: inset 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.nav {
  flex-wrap: nowrap;
  overflow-x: auto;
}
.nav-item {
  position: relative;
  display: inline-block;
  padding: 10px;
  font-weight: 500;
  color: #ffe4cd;
}
.nav-item:focus,
.nav-item:hover {
  color: #fff;
  text-decoration: none;
}
.nav .router-link-exact-active {
  color: #fff;
}
.nav .router-link-exact-active:after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -5px;
  vertical-align: middle;
  content: " ";
  border-right: 5px solid transparent;
  border-bottom: 5px solid;
  border-left: 5px solid transparent;
}
</style>
