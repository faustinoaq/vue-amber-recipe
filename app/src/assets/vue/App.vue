<template lang="pug">
#app
  .masthead
    .container
      Navigation
  .container
    .row
      .col-sm
        Flash
    .row
      .col-sm-12.main
        router-view
</template>

<script>
import Navigation from "./Navigation.vue";
import Flash from "./Flash.vue";

export default {
  components: {
    Navigation: Navigation,
    Flash: Flash
  }
};
</script>

<style lang="scss">
body {
  color: #555;
}
.main {
  padding-top: 20px;
}

@media (min-width: 1200px) {
  .container {
    width: 970px;
  }
}

.table td,
.table th {
  vertical-align: middle;
}

.alert {
  margin-top: 1em;

  p {
    margin-top: 0;
    margin-bottom: 0;
  }
}

// For Navigation pulling right
.nav-item-auth {
  &.nav-item-auth-signout,
  &.nav-item-auth-signup {
    order: 9999;
  }

  &.nav-item-auth-profile,
  &.nav-item-auth-signin {
    order: 9990;
    margin-left: auto;
  }
}
</style>
