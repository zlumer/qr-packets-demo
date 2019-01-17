<template>
<div class="container">
	<!-- <span>{{intro}}</span> -->
	<div
		class="qr"
		:style="{ width: qrWidth }"
	>
		<Qr :qrs="qrs" />
	</div>
	<div
		class="qr-reader"
		:style="{ width: readerWidth }"
	>
		<QrReader ref="reader" v-on:qr="onQr"></QrReader>
	</div>
</div>
</template>

<script lang="ts">

import Vue, { VueWithProps } from "src/vue-ts"
import Qr from "./QrGif.vue"
import QrReader from "./QrReader.vue"
import { QRCode } from "jsqr"

type TRefs = {
	reader: InstanceType<typeof QrReader>
}

export default (Vue as VueWithProps<{$refs: TRefs}>).extend({
	data()
	{
		return {
			qrindex: 0,
			timer: 0,
		}
	},
	props: {
		qrWidth: {
			type: String,
			default: '50%',
		},
		qrs: {
			type: Array as () => string[],
			default: [],
		}
	},
	computed: {
		readerWidth: function()
		{
			return `calc(100% - ${this.qrWidth})`
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

<style lang="scss" scoped>

.container {
	justify-content: space-around;
	display: flex;
    -webkit-box-pack: justify;
	width: 100%;
	align-items: center;
}

.qr {
	// width: calc(100% - 300px);
	// max-height: min();
	display: flex;
    flex-flow: column nowrap;
}
.qr-reader {
	// width: 300px;
	display: flex;
    flex-flow: column nowrap;
}

</style>

