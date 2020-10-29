<template>
  <div class="results">
    <h2 v-if="hasName">Gratulacje {{ name }}!</h2>
    <h2 v-else>Gratulacje!</h2>

    <GeneralStats :result="result" :quiz="quiz" />
    <RelativeStats :result="result" :quiz="quiz" />
    <ResultsFacebookShare v-if="shareEnabled" :result="result" :quiz="quiz" />
    <QuestionsReview :result="result" :quiz="quiz" />
  </div>
</template>

<script lang="ts">
import { Result } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import GeneralStats from './GeneralStats.vue'
import QuestionsReview from './QuestionsReview.vue'
import RelativeStats from './RelativeStats.vue'
import ResultsFacebookShare from './ResultsFacebookShare.vue'

@Component({
  components: {
    GeneralStats,
    QuestionsReview,
    RelativeStats,
    ResultsFacebookShare,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  public result!: Result

  @Prop({ required: true })
  public shareEnabled!: boolean

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
