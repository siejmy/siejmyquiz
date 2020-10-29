<template>
  <div id="page-results">
    <Loading v-if="loading">Ładowanie wyników</Loading>
    <Error v-if="error">
      Naprawdę bardzo nam przykro! Nie mona załadować wyniku :( Nie tak to sobie
      wyobrażaliśmy. Jeśli mimo wszystko chciałbyś nam pomóc, skontaktuj się z
      nami i opowiedz o tej sytuacji! Będziemy naprawdę bardzo wdzięczni!
    </Error>
    <ResultsPresenter v-if="result" :result="result" :share-enabled="true" />
  </div>
</template>

<script lang="ts">
import { Error, Loading } from '@/components'
import { Result } from '@/domain'
import { resultsRepositoryFirestore } from '@/services'
import { Component, Vue } from 'vue-property-decorator'

import { ResultsPresenter } from './components'

@Component({
  components: {
    Loading,
    ResultsPresenter,
    Error,
  },
})
export default class ResultsPage extends Vue {
  public loading = false
  public error = false
  public result: Result | '' = ''

  get resultId(): string {
    return this.$route.params.id
  }

  public beforeMount() {
    this.doLoadResult()
  }

  private async doLoadResult() {
    this.loading = true
    this.error = false

    try {
      this.result = await resultsRepositoryFirestore.getResultById(
        this.resultId,
      )
    } catch (err) {
      console.error(err)
      this.error = true
    }
    this.loading = false
  }
}
</script>
