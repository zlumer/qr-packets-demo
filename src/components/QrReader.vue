<template>
<div>
	<video ref="video" :width="width" :height="height" style="display: none;">Camera not available</video>
	<canvas ref="canvas" style="display: none;"></canvas>
</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import jsqr from "jsqr"

type TRefs = {
	video: HTMLVideoElement
	canvas: HTMLCanvasElement
}

export default (Vue as VueConstructor<Vue & {$refs: TRefs}>).extend({
	data()
	{
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
	beforeDestroy()
	{
		this.pollQrStop()
		let video = this.$refs.video
		if (video && video.srcObject)
		{
			let stream = video.srcObject as MediaStream
			let tracks = stream.getTracks()
			tracks.forEach(x => x && x.stop())
		}
	},
	methods: {
		async startCamera()
		{
			const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
			this.$refs.video.srcObject = stream
			this.$refs.video.play()
			this.$refs.video.addEventListener('canplay', () => this.pollQr())
			this.$refs.video.style.display = "block"
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
			let { video, canvas } = this.$refs
			let { width: w, height: h} = video
			canvas.width = video.width = video.videoWidth
			canvas.height = video.height = video.videoHeight
			video.width = w
			video.height = h
			let ctx = canvas.getContext("2d")
			if (!ctx)
				return console.error(`canvas context not available!`)
			
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
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

