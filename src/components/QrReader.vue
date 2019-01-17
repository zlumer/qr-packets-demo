<template>
<section class="top-conatiner">
	<section class="container">
		<div class="overlay" />
		<video
			ref="video"
			data-cy="video-video"
			style="display: none;"
		>Camera not available</video>
		<canvas
			ref="canvas"
			style="display: none;"
		></canvas>
		<div
			v-if="videoReady"
			data-cy="video-ready"
			style="display: none;"
		/>
	</section>
</section>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import jsqr from "jsqr"

type TRefs = {
	video: HTMLVideoElement
	canvas: HTMLCanvasElement
}

export default (Vue as VueWithProps<{$refs: TRefs}>).extend({
	data()
	{
		return {
			readTimer: 0,
			pollTimeout: 200,
			videoReady: false,
		}
	},
	props: {
		autoplay: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	computed: {
		fakeQrCode(): string | null
		{
			let video = this.$refs.video
			if (video && video.hasAttribute('data-fake-qr'))
				return video.getAttribute('data-fake-qr') || null
			
			return null
		}
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
	mounted()
	{
		if (this.autoplay)
			this.startCamera()
	},
	methods: {
		async startCamera()
		{
			const stream = await navigator.mediaDevices.getUserMedia({ video: true })
			let video = this.$refs.video
			video.srcObject = stream
			video.play()
			video.addEventListener('canplay', () =>
			{
				console.log('canplay')
				this.pollQr()
				let { width: w, height: h} = video
				this.$refs.canvas.width = video.width = video.videoWidth
				this.$refs.canvas.height = video.height = video.videoHeight
				video.width = w
				video.height = h
				this.videoReady = true
			})
			video.style.display = "block"
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
			let fakeQr = this.fakeQrCode
			if (fakeQr)
				return this.$emit("qr", { data: fakeQr })
			
			let { video, canvas } = this.$refs
			let ctx = canvas.getContext("2d")
			if (!ctx)
				return console.error(`canvas context not available!`)
			
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
			let data = ctx.getImageData(0, 0, canvas.width, canvas.height)
			let qr = jsqr(data.data, data.width, data.height)
			// console.log(`QrReader.readQr(): ${qr}`)
			if (!qr)
				return
			
			this.$emit("qr", qr)
		}
	}
})
</script>

<style lang="scss" scoped>

.top-container {
	width: 100%;
}
.container {
	overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%;
}

.overlay {
	top: 0px;
    left: 0px;
    z-index: 1;
    box-sizing: border-box;
	border: 50px solid rgba(0, 0, 0, 0.3);
	border-width: 25%;
    box-shadow: rgba(255, 0, 0, 0.5) 0px 0px 0px 5px inset;
    position: absolute;
    width: 100%;
    height: 100%;
}

video {
	top: 0px;
    left: 0px;
    display: block;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
