<template>
  <b-card
    no-body
    :img-src="imageUrl"
    :img-alt="title"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 mr-2"
    :border-variant="isCorrect ? 'success' : 'warning'"
  >
    <b-card-body>
      <b-card-title>{{ title }}</b-card-title>
    </b-card-body>

    <b-list-group flush>
      <b-list-group-item
        v-for="(distractor, index) of distractors"
        :key="distractor"
        :variant="getDistractorColorVariant(index)"
      >
        {{ distractor }}
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script lang="ts">
import { QuizABCDQuestion } from '@/domain'
import { Component, Prop, Vue } from 'vue-property-decorator'

import QuestionsReviewQuestionCard from './QuestionsReviewQuestionCard.vue'

@Component({
  components: {
    QuestionsReviewQuestionCard,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  public question!: QuizABCDQuestion

  @Prop({ required: true })
  public selectedAnswer!: number

  public get isCorrect() {
    return this.question.correctNo === this.selectedAnswer
  }

  public get title(): string {
    return this.question.title
  }

  public get imageUrl(): string {
    return this.question.imageUrl || '/assets/siejmy-placeholder-600x275.png'
  }

  public get distractors(): string[] {
    return this.question.distractors
  }

  public getDistractorColorVariant(index: number) {
    if (index === this.question.correctNo) {
      return 'success'
    } else if (index === this.selectedAnswer) {
      return 'danger'
    }
    return 'light'
  }
}
</script>

<style></style>
