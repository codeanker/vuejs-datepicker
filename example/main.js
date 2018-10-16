import Vue from 'vue'
import Demo from './Demo.vue'
import CodeankerDemo from './CodeankerDemo.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(CodeankerDemo)
})
