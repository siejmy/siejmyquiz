import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import { Configuration } from './Configuration'
import { QuizPage } from './features/quiz'
import { ResultsPage } from './features/results'

Vue.config.productionTip = false
Vue.use(VueRouter)

export function mountQuiz(tag: string, _: Configuration) {
  const routes = [
    { path: '/', component: QuizPage },
    { path: '/results/:id', component: ResultsPage },
    { path: '*', component: QuizPage },
  ]
  new Vue({
    render: h => h(App),
    router: new VueRouter({
      mode: 'hash',
      routes,
    }),
  }).$mount(tag)
}
