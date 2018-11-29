<template>
<div>
	<button @click="onclick">click</button>
	<button @click="getCamera">camera</button>
	<!-- <button @click="readQr">read QR</button> -->
	<button @click="startConnect">connect WebRTC</button>
	<br/>
	<Qr :qrs="qrs"></Qr>
	<QrReader ref="reader" :width="100" :height="100" v-on:qr="onQr"></QrReader>
	<Qr :qrs="[outOffer]" />
</div>
</template>

<script lang="ts">

import Vue, { VueConstructor } from "vue"
import Qr from "./QrGif.vue"
import QrReader from "./QrReader.vue"
import jsqr from "jsqr"
import { RTCHelper } from "./webrtc"
import { QRCode } from "jsqr"

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

type TRefs = {
	reader: InstanceType<typeof QrReader>
}

let App = (Vue as VueConstructor<Vue & {$refs: TRefs}>).extend({
	data()
	{
		return {
			qrindex: 0,
			qrs: ["hello", "world", "data", "string"] as string[],
			timer: 0,
			outOffer: "",
			rpc: new RTCHelper(),
			connected: false,
		}
	},
	computed: {
	},
	methods: {
		onclick()
		{
			this.qrs = ["hello", "world", "data", "string"]
		},
		getCamera()
		{
			this.$refs.reader.startCamera()
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
	components: {
		Qr,
		QrReader,
	}
})
export default App

</script>

<style>
</style>