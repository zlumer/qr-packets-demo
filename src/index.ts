import Vue from 'vue'
import App from './App.vue'
import { createRouter } from "./router"
import { createStore } from "./store"
import { registerLayouts } from './layouts'

let store = createStore()
let router = createRouter(store)

declare global
{
	interface Window
	{
		vm: Vue
	}
}

registerLayouts()

window.vm = new Vue({
	router,
	store,
	el: '#app',
	render: h => h(App)
})