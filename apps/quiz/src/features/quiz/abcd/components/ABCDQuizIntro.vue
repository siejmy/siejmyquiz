<template>
  <b-card
    class="quiz-intro"
    :img-src="imageUrl"
    img-alt="Quiz"
    img-top
    tag="article"
    title="Zaczynamy quiz?"
  >
    <b-card-text>
      <span v-html="introHtml"></span>
    </b-card-text>

    <b-button variant="primary" @click="next()">
      Dalej
    </b-button>
  </b-card>
</template>

<script lang="ts">
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
