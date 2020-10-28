<template>
  <div class="quiz-question">
    <img v-if="imageUrl" :src="imageUrl" :alt="title" />
    <h2>#{{ questionNumber + 1 }} {{ title }}</h2>

    <b-form-group label="Wybierz prawidłową odpowiedź">
      <b-form-radio
        v-for="(distractor, index) in distractors"
        :key="distractor"
        v-model="selectedAnswerNo"
        name="select-distractors"
        :value="index"
        :disabled="isAnswered"
      >
        {{ distractor }}
      </b-form-radio>
    </b-form-group>

    <b-alert v-if="isAnsweredCorrectly" variant="success" show>
      Prawidłowa odpowiedź!
    </b-alert>
    <b-alert v-if="isAnsweredIncorrectly" variant="warning" show>
      Prawidłowa odpowiedź to: {{ correctDistractorText }}
    </b-alert>

    <b-button
      v-if="!isAnswered"
      @click="submitAnswer()"
      :disabled="isAnswerButtonDisabled"
      variant="primary"
    >
      Odpowiedz
    </b-button>

    <b-button v-if="isAnswered" @click="next()" variant="primary">
      Dalej
    </b-button>
  </div>
</template>

<script lang="ts">
import { QuizABCDQuestion } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ABCDQuizInterpreter } from '../machine'

@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ required: true })
  public interpreter!: ABCDQuizInterpreter

  @Prop({ required: true })
  public state!: ABCDQuizInterpreter['state']

  public selectedAnswerNo: number = -1

  public get isAnsweredCorrectly() {
    return this.state.matches('Question.AnswerCorrect')
  }

  public get isAnsweredIncorrectly() {
    return this.state.matches('Question.AnswerIncorrect')
  }

  public get isAnswered() {
    return this.isAnsweredCorrectly || this.isAnsweredIncorrectly
  }

  public get questionNumber() {
    return this.state.context.currentQuestionNo
  }

  public get question(): QuizABCDQuestion {
    return this.state.context.quiz.questions[this.questionNumber]
  }

  public get imageUrl(): string | undefined {
    return this.question.imageUrl
  }

  public get title(): string {
    return this.question.title
  }

  public get distractors(): string[] {
    return this.question.distractors
  }

  public get correctDistractorText(): string {
    return this.question.distractors[this.question.correctNo]
  }

  public get isAnswerButtonDisabled() {
    return this.selectedAnswerNo < 0
  }

  public submitAnswer() {
    this.interpreter.send({ type: 'ANSWER', no: this.selectedAnswerNo || 0 })
  }

  public next() {
    this.interpreter.send({ type: 'NEXT' })
    this.selectedAnswerNo = -1
  }
}
</script>
<style scoped>
.quiz-question img {
  margin: 0 auto;
  max-width: 80%;
}
</style>
