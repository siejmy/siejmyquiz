<template>
  <div id="quiz-intro">
    <h2>Zaczynamy quiz?</h2>

    <p v-html="introHtml"></p>

    <b-button variant="primary" @click="next()">
      Dalej
    </b-button>
  </div>
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

  public next() {
    this.interpreter.send({ type: 'NEXT' })
  }
}
</script>
