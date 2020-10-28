<template>
  <div class="general-stats">
    <b-alert variant="primary" show>
      Twój wynik to <strong>{{ percentResult }}%</strong>.<br />
      <small>
        Odpowiedziałeś dobrze na {{ correctCount }} z {{ totalCount }} pytań!
      </small>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { QuizABCD, Result } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true })
  public result!: Result

  @Prop({ required: true })
  public quiz!: QuizABCD

  public get correctCount() {
    return this.result.answers.filter(
      (answerNo, index) => this.quiz.questions[index].correctNo === answerNo,
    ).length
  }

  public get totalCount() {
    return this.result.answers.length
  }

  public get percentResult() {
    const percent = (100 * this.correctCount) / this.totalCount
    return percent.toFixed(0)
  }
}
</script>

<style></style>
