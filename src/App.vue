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

import Vue, { VueConstructor } from "vue"
import VueRouter from "vue-router"
import jsqr from "jsqr"
import { QRCode } from "jsqr"
import Index from "./pages/Index.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"
import Wallet from "./pages/Wallet.vue"
import NewTransfer from "./pages/NewTransfer.vue"
import PushTxVue from "./pages/PushTx.vue"
import WebrtcVue from "./pages/Webrtc.vue"
import { JsonRpc } from "./jsonrpc"

const routes = [
	{ path: '/', component: Index },
	{ path: '/login', component: Login },
	{ path: '/webrtc', component: WebrtcVue },
	{ path: '/wallets', component: Wallets },
	{
		path: '/wallet/:address',
		name: 'wallet',
		component: Wallet,
		children: [
		]
	},
	{ path: '/wallet/:address/create', name: 'newtx', component: NewTransfer },
	{
		path: '/pushtx/:tx',
		name: 'pushtx',
		component: PushTxVue,
		props: true
	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})
Vue.use(VueRouter)

type TRefs = {
}

let App = (Vue as VueConstructor<Vue & {$refs: TRefs}>).extend({
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
	router
})
export default App

</script>

<style>
</style>