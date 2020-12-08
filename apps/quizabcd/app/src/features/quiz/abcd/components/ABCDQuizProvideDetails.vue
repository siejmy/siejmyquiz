<template>
  <div>
    <b-card
      v-if="isStateName || isStateRobot || isStateSeeDetails"
      tag="article"
      class="provide-card mb-4"
      title="Zanim zobaczysz wyniki"
    >
      <p class="mb-4">
        Zanim zobaczysz wyniki, powiedz nam jak masz na imię oraz udowodnij, że
        nie jesteś robotem. Twoje imię jest nam potrzebne do stworzenia
        spersonalizowanej strony wyników. Możesz go nie podawać.
      </p>

      <h4>1/2 Podaj nam swoje imię</h4>
      <b-form-input
        v-model="name"
        placeholder="Podaj swoje imię"
        class="mb-2"
      ></b-form-input>
      <b-button
        variant="primary"
        :disabled="!isStateName || name.length === 0"
        @click="submitName()"
        class="mr-2"
      >
        Zapisz
      </b-button>
      <b-button
        variant="secondary"
        size="sm"
        :disabled="!isStateName"
        @click="submitEmptyName()"
        >Wolę nie podawać imienia</b-button
      >
    </b-card>
    <b-card
      v-if="isStateRobot || isStateSeeDetails"
      tag="article"
      class="provide-card mb-4"
      title="2/2 Udowodnij, że nie jesteś robotem"
    >
      <vue-recaptcha
        :sitekey="reCaptchaKey"
        :loadRecaptchaScript="true"
        @verify="sendNotARobot()"
        @error="reCaptchaError($event)"
      ></vue-recaptcha>

      <div v-if="isStateSeeDetails">
        <b-button
          class="mt-3 shadow-lg"
          variant="primary"
          size="lg"
          @click="next()"
        >
          Zobacz wyniki
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Configuration } from '@/Configuration'
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueRecaptcha from 'vue-recaptcha'

import { ABCDQuizInterpreter } from '../machine'

@Component({
  components: { VueRecaptcha },
})
export default class extends Vue {
  @Prop({ required: true })
  public interpreter!: ABCDQuizInterpreter

  @Prop({ required: true })
  public state!: ABCDQuizInterpreter['state']

  public name: string = ''

  public get isStateName() {
    return this.state.matches('ProvideDetails.Name')
  }

  public get isStateRobot() {
    return this.state.matches('ProvideDetails.NotARobot')
  }

  public get isStateSeeDetails() {
    return this.state.matches('ProvideDetails.SeeDetails')
  }

  private get config(): Configuration {
    return this.$root.$data.config
  }

  public get reCaptchaKey(): string {
    return this.config.reCaptchaKey
  }

  public submitName() {
    return this.interpreter.send({ type: 'SET_NAME', name: this.name })
  }

  public submitEmptyName() {
    return this.interpreter.send({ type: 'SET_NAME', name: '' })
  }

  public sendNotARobot() {
    this.interpreter.send({ type: 'NOT_A_ROBOT' })
  }

  public next() {
    this.interpreter.send({ type: 'NEXT' })
  }

  public reCaptchaError(err: any) {
    console.error('reCaptcha error: ', err)
  }
}
</script>
<style scoped>
.provide-card {
  width: 100%;
}
</style>
