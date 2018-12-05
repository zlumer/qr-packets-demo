<template>
<div>
	<span>{{intro}}</span>
	<Qr :qrs="qrs"></Qr>
	<QrReader ref="reader" :width="100" :height="100" v-on:qr="onQr"></QrReader>
</div>
</template>

<script lang="ts">

import Vue, { VueConstructor } from "vue"
import Qr from "./QrGif.vue"
import QrReader from "./QrReader.vue"
import { QRCode } from "jsqr"

type TRefs = {
	reader: InstanceType<typeof QrReader>
}

export default (Vue as VueConstructor<Vue & {$refs: TRefs}>).extend({
	data()
	{
		return {
			qrindex: 0,
			timer: 0,
		}
	},
	props: {
		intro: String,
		qrs: {
			type: Array as () => string[],
			default: [],
		}
	},
	methods: {
		onQr(qr: QRCode)
		{
			console.log(`QR!!! ${qr.data}`, qr)
			
			this.$emit("qr", qr.data)
		},
	},
	components: {
		Qr,
		QrReader,
	}
})
</script>