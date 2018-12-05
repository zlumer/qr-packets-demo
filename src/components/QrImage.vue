<template>
	<img class="qr-image" :src="dataUrl" alt="" data-cy="qr-image">
</template>

<script lang="ts">

import Vue from "vue"
import qr from "qrcode"

let App = Vue.extend({
	data: function ()
	{
		return {
			dataUrl: "",
		}
	},
	props: {
		qrcode: String
	},
	mounted: async function()
	{
		if (!this.qrcode)
			return
		
		console.log(this.qrcode)
		this.dataUrl = await qr.toDataURL(this.qrcode)
	},
	watch: {
		qrcode: async function ()
		{
			if (!this.qrcode)
				return

			console.log(this.qrcode)
			this.dataUrl = await qr.toDataURL(this.qrcode)
		}
	}
})
export default App

</script>

<style>
.qr-image {
	width: 400px;
	height: 400px;
	image-rendering: pixelated;
}
</style>