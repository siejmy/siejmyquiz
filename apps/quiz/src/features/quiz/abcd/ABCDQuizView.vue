<template>
  <div id="abcd-quiz-view">
    <state-matches :state="state">
      <template #Intro> </template>
      <template #Question> </template>
      <template #ProvideDetails> </template>
      <template #SavingResults> </template>
      <template #RedirectToSuccessPage> </template>
      <template #Error.NoResults> </template>
      <template #Error.HasResults> </template>
    </state-matches>
  </div>
</template>

<script lang="ts">
import { StateMatches } from '@/components'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { QuizABCD } from '../../../domain'

import ABCDQuizView from './ABCDQuizView.vue'
import { interpretMachine } from './interpreter'
import { ABCDQuizInterpreter, initialContext } from './machine'

@Component({
  components: {
    ABCDQuizView,
    StateMatches,
  },
})
export default class QuizPage extends Vue {
  @Prop({ required: true, type: Object })
  public quiz!: QuizABCD

  private interpreter: ABCDQuizInterpreter = interpretMachine({
    quiz: this.quiz,
  })
  private state: ABCDQuizInterpreter['state'] = this.interpreter.initialState

  public created() {
    this.startMachine()
  }

  public beforeDestroy() {
    this.interpreter.stop()
  }

  private startMachine() {
    this.interpreter
      .onTransition(state => {
        this.state = state
      })
      .start()
  }
}
</script>
