<template>
  <div class="questions-review">
    <h3>Odpowiedzi</h3>
    <b-container :fluid="true">
      <b-row>
        <QuestionsReviewQuestionCard
          v-for="(question, index) in questions"
          :key="index"
          :question="question"
          :selected-answer="result.answers[index]"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { QuizABCD, Result } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import QuestionsReviewQuestionCard from './QuestionsReviewQuestionCard.vue'

@Component({
  components: {
    QuestionsReviewQuestionCard,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  public result!: Result

  @Prop({ required: true })
  public quiz!: QuizABCD

  public get questions() {
    return this.quiz.questions
  }
}
</script>

<style></style>
