<template>
  <QuizCard
    ref="card"
    class="quiz-question-card"
    :title="titleFull"
    @next="next()"
    :imgSrc="imageUrl"
    imgAlt="Ilustracja do pytania quizu"
    :nextButtonEnabled="isAnswered"
  >
    <b-form-group class="form-body">
      <b-list-group flush>
        <b-list-group-item
          :class="{ 'distractor-list-item': true, enabled: !isAnswered }"
          v-for="(distractor, index) of distractors"
          :key="distractor"
          :variant="getDistractorColorVariant(index)"
          @click="selectDistractor(index)"
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

    <template #footer>
      <b-progress height="2.375rem" :min="0" :max="totalQuestions">
        <b-progress-bar :value="questionNumber">
          <span>{{ proggressBarText }}</span>
        </b-progress-bar>
      </b-progress>
    </template>
  </QuizCard>
</template>

<script lang="ts">
import { QuizCard } from '@/components'
import { QuizABCDQuestion } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ABCDQuizInterpreter } from '../machine'

@Component({
  components: {
    QuizCard,
  },
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

  public get titleFull(): string {
    return '#' + this.proggressBarText + ' ' + this.title
  }

  public get proggressBarText(): string {
    return this.questionNumber + 1 + '/' + this.totalQuestions
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
      return 'danger'
    }
    return 'light'
  }

  public selectDistractor(index: number) {
    if (this.isAnswered) {
      return
    }
    this.selectedAnswerNo = index
    this.submitAnswer()
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
.form-body {
  padding-top: 0;
  margin-top: -1rem;
  margin-bottom: 0;
}

.distractor-list-item {
  cursor: pointer;
  color: #333;
}

.distractor-list-item.enabled,
.distractor-list-item.enabled * {
  cursor: pointer;
}

.distractor-list-item.enabled:hover {
  background: #ddd;
  color: black;
}

.quiz-question-card {
  width: 100%;
}
</style>
