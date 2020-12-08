<template>
  <div id="app">
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
$theme-colors: (
  'primary': #3ace00,
);
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';

html,
body {
  height: auto;
  background: #999;
}

#app {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 20rem;
}
</style>
