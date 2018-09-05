<template>
	<img :src="dataUrl" alt="">
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
	watch: {
		qrcode: async function ()
		{
			this.dataUrl = await qr.toDataURL(this.qrcode)
		}
	}
})
export default App

</script>

<style>
</style>