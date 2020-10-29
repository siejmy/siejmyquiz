<template>
  <b-card
    no-body
    :img-src="imageUrl"
    :img-alt="title"
    img-top
    tag="article"
    class="quiz-question-card mb-2 mr-2"
    :border-variant="borderVariant"
  >
    <b-card-body>
      <b-card-title>
        #{{ questionNumber + 1 }}/{{ totalQuestions }}
        {{ title }}
      </b-card-title>
    </b-card-body>

    <b-card-body>
      <b-card-text>
        Wybierz prawidłową odpowiedź:
      </b-card-text>
    </b-card-body>

    <b-form-group>
      <b-list-group flush>
        <b-list-group-item
          class="distractor-list-item"
          v-for="(distractor, index) of distractors"
          :key="distractor"
          :variant="getDistractorColorVariant(index)"
          @click="selectiDistractor(index)"
        >
          <b-form-radio
            v-model="selectedAnswerNo"
            name="select-distractors"
            :value="index"
            :disabled="isAnswered"
          >
            {{ distractor }}
          </b-form-radio>
        </b-list-group-item>
      </b-list-group>
    </b-form-group>

    <b-card-body>
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
    </b-card-body>
    <b-card-body>
      <b-alert v-if="isAnsweredCorrectly" variant="success" show>
        Prawidłowa odpowiedź!
      </b-alert>
      <b-alert v-if="isAnsweredIncorrectly" variant="warning" show>
        Prawidłowa odpowiedź to: {{ correctDistractorText }}
      </b-alert>
    </b-card-body>
  </b-card>
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

  public get totalQuestions() {
    return this.state.context.quiz.questions.length
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

  public get borderVariant() {
    if (this.isAnsweredCorrectly) {
      return 'success'
    } else if (this.isAnsweredIncorrectly) {
      return 'warning'
    }
    return 'secondary'
  }

  public getDistractorColorVariant(index: number) {
    if (!this.isAnswered) {
      return 'light'
    } else if (index === this.question.correctNo) {
      return 'success'
    } else if (index === this.selectedAnswerNo) {
      return 'warning'
    }
    return 'light'
  }

  public selectiDistractor(index: number) {
    this.selectedAnswerNo = index
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
.distractor-list-item {
  cursor: pointer;
}

.quiz-question-card {
  width: 100%;
}
</style>
