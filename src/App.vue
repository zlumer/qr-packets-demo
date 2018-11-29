<template>
<div>
	<router-view></router-view>

	<button @click="onclick">click</button>
	<!-- <button @click="getCamera">camera</button> -->
	<!-- <button @click="readQr">read QR</button> -->
	<button @click="startConnect">connect WebRTC</button>
</div>
</template>

<script lang="ts">

import Vue, { VueConstructor } from "vue"
import VueRouter from "vue-router"
import jsqr from "jsqr"
import { RTCHelper } from "./webrtc"
import { QRCode } from "jsqr"
import Index from "./pages/Index.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"

async function __test__()
{
	let p1 = new RTCHelper("host")
	let p2 = new RTCHelper("mobile")
	let offer = await p1.createOffer()
	let answer = await p2.pushOffer(offer)
	await p1.pushAnswer(answer)
	console.log(`connected (maybe)`)
	await p1.candidates.reduce((promise, candidate) => promise.then(() => p2.pushIceCandidate(candidate)), Promise.resolve())//c => () => p2.pushIceCandidate(c))
	console.log(`connected (definitely, maybe)`)
	await p1.waitConnection()
	await p2.waitConnection()
	p1.dataChannel!.send("hello")
}
const routes = [
	{ path: '/', component: Index },
	{ path: '/login', component: Login },
	{ path: '/wallets', component: Wallets },
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
			qrs: ["hello", "world", "data", "string"] as string[],
			timer: 0,
			outOffer: "",
			rpc: new RTCHelper(),
			connected: false,
		}
	},
	methods: {
		onclick()
		{
			this.qrs = ["hello", "world", "data", "string"]
		},
		onQr(qr: QRCode)
		{
			console.log(`QR!!! ${qr.data}`, qr)

			// if (!this.connected)
			// 	this.handleConnection(qr.data)
		},
		async handleConnection(offer: string)
		{
			if (this.connected)
				return
			
			this.connected = true
			
			if (!this.outOffer) // we are receiving connection
			{
				let answer = await this.rpc.pushOffer({ type: "offer", sdp: offer })
				this.outOffer = answer.sdp!
			}
			else
			{
				await this.rpc.pushAnswer({ type: "answer", sdp: offer })
			}
		},
		async startConnect()
		{
			let offer = await this.rpc.createOffer()
			console.log(offer)
			console.log(offer.sdp)
			this.outOffer = offer.sdp!
		},
	},
	router
})
export default App

</script>

<style>
</style>