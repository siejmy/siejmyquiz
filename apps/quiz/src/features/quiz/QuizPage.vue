<template>
  <div id="page-quiz">
    <h1>{{ title }}</h1>

    <ABCDQuizView v-if="type === 'abcd'" :quiz="quiz" />
    <div v-else>
      Nie znaleźliśmy odpowiedniego typu quizu. Jeśli chcesz pomóc Siejmy, to
      kontaktuj się z nami i opowiedz nam o błędzie 😇
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { Configuration } from '../../Configuration'
import { Quiz } from '../../domain'

import { ABCDQuizView } from './abcd'

@Component({
  components: {
    ABCDQuizView,
  },
})
export default class QuizPage extends Vue {
  get config(): Configuration {
    return this.$root.$data.config
  }

  get title(): string {
    return this.config.title
  }

  get quiz(): Quiz {
    return this.config.quiz
  }

  get type(): string {
    return this.quiz.type
  }
}
</script>
