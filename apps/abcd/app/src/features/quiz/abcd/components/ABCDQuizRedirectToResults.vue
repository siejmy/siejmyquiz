<template>
  <div id="quiz-redirect-to-results"></div>
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

  get resultsId(): string {
    return this.state.context.resultData.id
  }

  public mounted() {
    window.location.href = '/quizabcd-result/' + this.resultsId
  }
}
</script>
