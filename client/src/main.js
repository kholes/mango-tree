// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './vuex/store'

var config = {
  apiKey: 'AIzaSyD9E-06ZS6f2nzWMmaZ6vDORSstZQ4KBDs',
  authDomain: 'mangotree-8993e.firebaseapp.com',
  databaseURL: 'https://mangotree-8993e.firebaseio.com',
  projectId: 'mangotree-8993e',
  storageBucket: '',
  messagingSenderId: '460449869513'
}

Vue.config.productionTip = false
Vue.prototype.$db = firebase.initializeApp(config).database().ref('manggo')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
