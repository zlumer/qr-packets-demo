<template>
<div>
	<button @click="onclick">click</button>
	<button @click="getCamera">camera</button>
	<button @click="readQr">read QR</button>
	<button @click="startConnect">connect WebRTC</button>
	<br/>
	<Qr :qrcode="qrtext"></Qr>
	<video id="cameraVideo" style="display: none;">Camera not available</video>
	<canvas id="cameraPicture" style="display: none;"></canvas>
	<Qr :qrcode="outOffer" />
</div>
</template>

<script lang="ts">

import Vue from "vue"
import Qr from "./QrImage.vue"
import jsqr from "jsqr"
import { RTCHelper } from "./webrtc"

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

let App = Vue.extend({
	data()
	{
		return {
			qrindex: 0,
			qrs: ["hello", "world", "data", "string"] as string[],
			timer: 0,
			_video: undefined as any as HTMLVideoElement,
			readTimer: 0,
			pollTimeout: 200,
			showTimeout: 275,
			outOffer: "",
			rpc: new RTCHelper(),
			connected: false,
		}
	},
	computed: {
		video: function()
		{
			if (!this._video)
				this._video = document.getElementById("cameraVideo") as HTMLVideoElement
			
			return this._video
		},
		qrtext: function ()
		{
			return this.qrs[this.qrindex]
		}
	},
	methods: {
		onclick()
		{
			this.showSeq(["hello", "world", "data", "string"])
		},
		showNext()
		{
			if (!this.qrs.length)
				return
			
			this.qrindex = (this.qrindex + 1) % this.qrs.length
		},
		showSeq(qrs: string[])
		{
			this.qrs = qrs
			this.qrindex = 0
			if (this.timer)
				window.clearInterval(this.timer), this.timer = 0
			
			this.timer = window.setInterval(() => this.showNext(), this.showTimeout)
		},
		async getCamera()
		{
			const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
			this.video.srcObject = stream
			this.video.play()
			this.video.addEventListener('canplay', () => this.pollQr())
		},
		pollQr()
		{
			this.pollQrStop()

			this.readTimer = window.setTimeout(() => (this.readQr(), this.pollQr()), this.pollTimeout)
		},
		pollQrStop()
		{
			if (this.readTimer)
				clearTimeout(this.readTimer), this.readTimer = 0
		},
		readQr()
		{
			let canvas = document.getElementById("cameraPicture") as HTMLCanvasElement
			canvas.width = this.video.width = this.video.videoWidth
			canvas.height = this.video.height = this.video.videoHeight
			let ctx = canvas.getContext("2d")
			if (!ctx)
				return console.error(`canvas context not available!`)
			
			ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height)
			let data = ctx.getImageData(0, 0, canvas.width, canvas.height)
			let qr = jsqr(data.data, data.width, data.height)
			console.log(qr)
			if (!qr)
				return
			
			if (!this.connected)
				this.handleConnection(qr!.data)
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
		Qr
	}
})
export default App

</script>

<style>
</style>