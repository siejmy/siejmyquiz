<template>
  <div class="results">
    <h2 v-if="hasName">Gratulacje {{ name }}!</h2>
    <h2 v-else>Gratulacje!</h2>

    <GeneralStats :result="result" :quiz="quiz" />
  </div>
</template>

<script lang="ts">
import { Result } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import GeneralStats from './GeneralStats.vue'

@Component({
  components: {
    GeneralStats,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  public result!: Result

  public get name() {
    return this.result.name
  }

  public get hasName() {
    return !!this.result.name
  }

  public get quiz() {
    if (!this.result) {
      return
    }
    return JSON.parse(this.result.quizJSON)
  }
}
</script>

<style></style>
