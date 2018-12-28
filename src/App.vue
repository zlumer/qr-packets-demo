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
@font-face {
    font-family: 'GothamPro';
    src: url(GothamPro.woff);
}
html,
body {
    font-family: 'GothamPro', 'Lato', 'Arial', sans-serif;
	margin: 0;
}
#root {
    height: 100%;
}
input[type=range] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
}
input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: none;
    background: #736C82;
    border-radius: 1.3px;
    border: 0;
}
input[type=range]::-webkit-slider-thumb {
    box-shadow: none;
    border: 0;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #00BCF9;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
  }
input[type=range]:focus::-webkit-slider-runnable-track {
    background: #736C82;
}
input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: none;
    background: #736C82;
    border-radius: 1.3px;
    border: 0;
}
input[type=range]::-moz-range-thumb {
    box-shadow: none;
    border: 0;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #00BCF9;
    cursor: pointer;
}
</style>