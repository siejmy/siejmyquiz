<template>
  <QuizCard
    class="b-card-img-top"
    title="Zaczynamy quiz?"
    @next="next()"
    :imgSrc="imageUrl"
    imgAlt="Wstęp do quizu"
  >
    <template #text>
      <span v-html="introHtml"></span>
    </template>
  </QuizCard>
</template>
<script lang="ts">
import { QuizCard } from '@/components'
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

  public get introHtml(): string {
    return this.state.context.quiz.introHtml
  }

  public get imageUrl(): string {
    return this.state.context.quiz.introImageUrl
  }

  public next() {
    this.interpreter.send({ type: 'NEXT' })
  }
}
</script>
