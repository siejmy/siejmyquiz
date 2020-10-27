import Vue from "vue"

import App from '"./App.vue"
import { Configuration } from '"./Configuration"

Vue.config.productionTip = false

export function mountQuiz(tag: string, _: Configuration) {
  new Vue({
    render: (h) => h(App),
  }).$mount(tag)
}
