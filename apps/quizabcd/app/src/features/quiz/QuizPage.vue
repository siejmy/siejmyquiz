<template>
  <div id="page-quiz">
    <b-row>
      <h1>{{ title }}</h1>
    </b-row>

    <div v-if="!error">
      Błąd: nie można załadować quizu...
    </div>
    <div v-else-if="!quiz">
      Ładowanie quizu...
    </div>
    <ABCDQuizView v-else-if="quiz.type === 'abcd'" :quiz="quiz" />
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
  error: boolean = false
  quiz: Quiz | '' = ''

  get config(): Configuration {
    return this.$root.$data.config
  }

  get title(): string {
    return this.config.title
  }

  mounted() {
    this.loadQuiz().catch(err => {
      console.error(err)
      this.error = true
    })
  }

  async loadQuiz() {
    const url = '/' + this.config.quizUrl
    const response = await fetch(url)
    this.quiz = await response.json()
  }
}
</script>
