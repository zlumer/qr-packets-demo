<template>
<div>
	<button @click="onclick">click</button>
	<br/>
	<Qr :qrcode="data"></Qr>
</div>
</template>

<script lang="ts">

import Vue from "vue"
import Qr from "./QrImage.vue"


let App = Vue.extend({
	data: function ()
	{
		return {
			data: ""
		}
	},
	methods: {
		onclick: function (data: string)
		{
			this.data += String.fromCharCode(Math.floor(Math.random() * 25) + "a".charCodeAt(0))
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