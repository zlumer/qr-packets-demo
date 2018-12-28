import Vue from 'vue'
import App from './App.vue'
import AppLayout from './layouts/App.vue'
import DefaultLayout from './layouts/Default.vue'
import { createRouter } from "./router"
import { createStore } from "./store"

let store = createStore()
let router = createRouter(store)

declare global
{
	interface Window
	{
		vm: Vue
	}
}

Vue.component('app-layout', AppLayout)
Vue.component('default-layout', DefaultLayout)

window.vm = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App)
})