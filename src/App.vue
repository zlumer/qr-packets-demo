<template>
<div>
	<button @click="onclick">click</button>
	<br/>
	<Qr :qrcode="qrtext"></Qr>
</div>
</template>

<script lang="ts">

import Vue from "vue"
import Qr from "./QrImage.vue"
import { setInterval, clearInterval } from "timers"

let App = Vue.extend({
	data()
	{
		return {
			qrindex: 0,
			qrs: [] as string[],
			timer: 0 as any as NodeJS.Timer,
		}
	},
	computed: {
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
				clearInterval(this.timer)
			
			this.timer = setInterval(() => this.showNext(), 100)
		}
	},
	components: {
		Qr
	}
})
export default App

</script>

<style>
</style>