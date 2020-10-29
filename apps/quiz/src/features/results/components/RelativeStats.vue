<template>
  <div id="page-results">
    <Loading v-if="loading">Ładowanie wyników</Loading>
    <Error v-if="error">
      Nie można załadować statystyk
    </Error>
    <div v-if="showRelativeStats">
      <b-alert show>
        Jesteś lepszy niż {{ resultDecentile }}% odpowidających!
      </b-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { Error, Loading } from '@/components'
import { getPercentileOfResult, QuizABCD, Result, StatsSummary } from '@/domain'
import { statsSummaryServiceFirestore } from '@/services'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Loading,
    Error,
  },
})
export default class ResultsPage extends Vue {
  @Prop({ required: true })
  public quiz!: QuizABCD
  @Prop({ required: true })
  public result!: Result

  public loading = false
  public error = false
  public statsSummary: StatsSummary | '' = ''

  public beforeMount() {
    this.doLoadStatsSummary()
  }

  public get showRelativeStats(): boolean {
    if (!this.statsSummary) {
      return false
    }
    if (this.statsSummary.sampleCount < 2) {
      return false
    }
    return this.resultDecentile > 40
  }

  public get resultDecentile() {
    if (!this.statsSummary) {
      return 0
    }
    return getPercentileOfResult(
      this.statsSummary.decileHistogram,
      this.correctCount / this.totalCount,
    )
  }

  public get correctCount() {
    return this.result.answers.filter(
      (answerNo, index) => this.quiz.questions[index].correctNo === answerNo,
    ).length
  }

  public get totalCount() {
    return this.result.answers.length
  }

  private async doLoadStatsSummary() {
    this.loading = true
    this.error = false

    try {
      this.statsSummary = await statsSummaryServiceFirestore.getForQuiz(
        this.quiz.id,
      )
    } catch (err) {
      console.error(err)
      this.error = true
    }
    this.loading = false
  }
}
</script>
