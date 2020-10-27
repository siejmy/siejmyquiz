<template>
  <div>From firestore: {{ blogoslawienstwo }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { fetchFirestoreDemo } from './fetchFirestoreDemo'

@Component
export default class extends Vue {
  public blogoslawienstwo: string = ''

  public mounted() {
    this.doLoadDemo().catch(console.error)
  }

  private async doLoadDemo() {
    this.blogoslawienstwo = await fetchFirestoreDemo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
