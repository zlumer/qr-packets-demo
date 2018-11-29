<template>
<div>
	<video ref="video" :width="width" :height="height" style="display: none;">Camera not available</video>
	<canvas ref="canvas" style="display: none;"></canvas>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import jsqr from "jsqr"

export default Vue.extend({
	data() {
		return {
			_video: undefined as any as HTMLVideoElement,
			readTimer: 0,
			pollTimeout: 200,
		}
	},
	props: {
		width: Number,
		height: Number,
	},
	computed: {
		video: function()
		{
			if (!this._video)
				this._video = this.$refs.video as HTMLVideoElement
			
			return this._video
		}
	},
	methods: {
		async startCamera()
		{
			const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
			this.video.srcObject = stream
			this.video.play()
			this.video.addEventListener('canplay', () => this.pollQr())
			this.video.style.display = "block"
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
			let { width: w, height: h} = this.video
			let canvas = this.$refs.canvas as HTMLCanvasElement
			canvas.width = this.video.width = this.video.videoWidth
			canvas.height = this.video.height = this.video.videoHeight
			this.video.width = w
			this.video.height = h
			let ctx = canvas.getContext("2d")
			if (!ctx)
				return console.error(`canvas context not available!`)
			
			ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height)
			let data = ctx.getImageData(0, 0, canvas.width, canvas.height)
			let qr = jsqr(data.data, data.width, data.height)
			// console.log(qr)
			if (!qr)
				return
			
			this.$emit("qr", qr)
		}
	}
})
</script>

