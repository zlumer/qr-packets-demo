<template>
<div>
	<router-view></router-view>

	<!-- <button @click="onclick">click</button> -->
	<!-- <button @click="getCamera">camera</button> -->
	<!-- <button @click="readQr">read QR</button> -->
	<!-- <button @click="startConnect">connect WebRTC</button> -->
</div>
</template>

<script lang="ts">

import Vue, { VueWithProps } from "./vue-ts"
import Vuex from "vuex"
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router"
import jsqr from "jsqr"
import { QRCode } from "jsqr"
import Index from "./pages/Index.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"
import Wallet from "./pages/Wallet.vue"
import EthTransfer from "./pages/EthTransfer.vue"
import PushTxVue from "./pages/PushTx.vue"
import WebrtcVue from "./pages/Webrtc.vue"
import { createStore, Store } from "./store"

const updateWallet: NavigationGuard = (to, from, next) =>
{
	console.log('updating wallet!', to, from, next)
	let blockchain = to.params.blockchain as 'eth'
	let address: string = to.params.address
	let chainId: string = to.query.chainId.toString()
	store.commit('setCurrentWallet', { wallet: { blockchain, address, chainId } })
	next()
}

const routes = [
	{ path: '/', component: Index },
	{ path: '/login', component: Login },
	{ path: '/webrtc', component: WebrtcVue },
	{ path: '/wallets', component: Wallets },
	{
		path: '/wallet/:blockchain/:address',
		name: 'wallet',
		component: Wallet,
		children: [
			{
				path: 'create',
				name: 'newtx',
				component: EthTransfer,
			},
		],
		beforeEnter: updateWallet
	},
	{
		path: '/pushtx/:tx',
		name: 'pushtx',
		component: PushTxVue,
		props: true
	}
] as RouteConfig[]

const router = new VueRouter({
	routes,
	mode: 'history'
})

Vue.use(VueRouter)
Vue.use(Vuex)

type TRefs = {
}

let store = createStore()

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

<style>
</style>