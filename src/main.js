import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MyMenu from './my-menu.vue'

import _ from 'lodash'
import moment from 'moment'
import VueResource from 'vue-resource'

import RouterPacientes from './modules/pacientes/router'
import RouterLesoes from './modules/lesoes/router'

import FilterIdades from './util/idade'
import FilterTelefone from './util/telefone'

Vue.filter('idade', FilterIdades)
Vue.filter('telefone', FilterTelefone)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(moment)

const routes = [{ name: 'Dashboard', path: '/', component: App }, ...RouterPacientes, ...RouterLesoes]


const router = new VueRouter({
  //mode: 'history',
  routes // short for routes: routes
})

const app = new Vue({
  router,
  components: { MyMenu }
}).$mount('#app')


router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
