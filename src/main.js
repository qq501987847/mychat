import Vue from 'vue'
import App from './App.vue'
import websocket from './utils/websocket.js'
Vue.prototype.socket = websocket;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
