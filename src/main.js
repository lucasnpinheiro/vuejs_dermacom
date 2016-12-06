import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MyMenu from './my-menu.vue'

import _ from 'lodash'
import moment from 'moment'
import VueResource from 'vue-resource'

import RouterPacientes from './pacientes/router'
import RouterLesoes from './lesoes/router'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{ name: 'Dashboard', path: '/', component: App }, ...RouterPacientes, ...RouterLesoes]


const router = new VueRouter({
  mode: 'history',
  routes // short for routes: routes
})

const app = new Vue({
  router,
  methods: {
    onBtNovo () {
      alert('aaaaa')
      MyBotoes.$emit('btNovo')
    }
  },
  components: { MyMenu }
}).$mount('#app')


router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
