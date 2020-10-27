<template>
  <div>From firestore: {{ blogoslawienstwo }}</div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  public blogoslawienstwo: string = ''

  public mounted() {
    this.doLoadDemo().catch(console.error)
  }

  private async doLoadDemo() {
    const doc = await window.firebase
      .firestore()
      .doc('firestore_demo/demo')
      .get()
    const data = doc.data()
    this.blogoslawienstwo = data.blogoslawienstwo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
