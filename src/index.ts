import Vue from 'vue'
import App from './App.vue'

declare global
{
	interface Window
	{
		vm: Vue
	}
}

window.vm = new Vue({
	el: '#app',
	render: h => h(App)
})