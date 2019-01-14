import Vue from 'vue'
import Vuex from "vuex"
import VueRouter from "vue-router"
import App from './App.vue'
import { createRouter } from "./router"
import { createStore } from "./store"
import { registerLayouts } from './layouts'

Vue.use(VueRouter)
Vue.use(Vuex)

registerLayouts()

let store = createStore()
let router = createRouter(store)

declare global
{
	interface Window
	{
		vm: Vue
	}
}

window.vm = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App)
})