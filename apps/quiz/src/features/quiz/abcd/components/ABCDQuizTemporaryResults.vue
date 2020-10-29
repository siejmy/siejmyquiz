<template>
  <div id="quiz-temporary-results">
    <ResultsPresenter :result="result" :share-enabled="false" />
  </div>
</template>

<script lang="ts">
import { Result } from '@/domain'
import { ResultsPresenter } from '@/features/results'
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ABCDQuizInterpreter } from '../machine'

@Component({
  components: {
    ResultsPresenter,
  },
})
export default class extends Vue {
  @Prop({ required: true })
  public interpreter!: ABCDQuizInterpreter

  @Prop({ required: true })
  public state!: ABCDQuizInterpreter['state']

  public get result(): Result {
    return this.state.context.result
  }
}
</script>
