<template>
  <div id="page-results">
    <h1>Results page #{{ resultId }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ResultsPage extends Vue {
  get resultId(): string {
    return this.$route.params.id
  }
}
</script>
