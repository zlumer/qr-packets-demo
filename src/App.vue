<template>
<div>
	<router-view></router-view>
</div>
</template>

<script lang="ts">

import Vue, { VueWithProps } from "./vue-ts"
import Vuex from "vuex"
import VueRouter from "vue-router"
import { createStore, Store } from "./store"
import { createRouter } from "./router"

Vue.use(VueRouter)
Vue.use(Vuex)

type TRefs = {
}

let store = createStore()
let router = createRouter(store)

let App = (Vue as VueWithProps<{$refs: TRefs}>).extend({
	data()
	{
		return {
		}
	},
	created()
	{
	},
	methods: {
	},
	router,
	store,
})
export default App

</script>

<style lang="scss">
html {
	font-family: GothamPro, Lato, Arial, sans-serif;
	display: block;
	line-height: 1.15;
}
body {
	margin: 0;
}
</style>