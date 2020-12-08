import { BootstrapVue } from 'bootstrap-vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import { Configuration, validateConfiguration } from './Configuration'
import { QuizPage } from './features/quiz'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

export function mountQuiz(tag: string, config: Configuration) {
  validateConfiguration(config)
  const routes = [
    { path: '/', component: QuizPage },
    { path: '*', component: QuizPage },
  ]
  new Vue({
    render: h => h(App),
    router: new VueRouter({
      mode: 'hash',
      routes,
    }),
    data: {
      config,
    },
  }).$mount(tag)
}
