<template>
  <div id="page-quiz">
    <h1>{{ name }}</h1>

    <ABCDQuizView v-if="type === 'abcd'" :quiz="quiz" />
    <div v-else>
      Nie znaleźliśmy odpowiedniego typu quizu. Jeśli chcesz pomóc Siejmy, to
      kontaktuj się z nami i opowiedz nam o błędzie 😇
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { Quiz } from '../../domain'

import { ABCDQuizView } from './abcd'

@Component({
  components: {
    ABCDQuizView,
  },
})
export default class QuizPage extends Vue {
  @Prop({ required: true, type: String })
  public name!: string

  @Prop({ required: true, type: Object })
  public quiz!: Quiz

  get type(): string {
    return this.quiz.type
  }
}
</script>
