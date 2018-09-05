<template>
<div>
	<button @click="onclick">click</button>
	<button @click="getCamera">camera</button>
	<button @click="readQr">read QR</button>
	<br/>
	<Qr :qrcode="qrtext"></Qr>
	<video id="cameraVideo" style="display: none;">Camera not available</video>
	<canvas id="cameraPicture" style="display: none;"></canvas>
</div>
</template>

<script lang="ts">

import Vue from "vue"
import Qr from "./QrImage.vue"
import jsqr from "jsqr"

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
		async pollQr()
		{
			if (this.readTimer)
				clearTimeout(this.readTimer), this.readTimer = 0
			
			this.readTimer = window.setTimeout(() => this.readQr().then(() => this.pollQr()), this.pollTimeout)
		},
		async readQr()
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