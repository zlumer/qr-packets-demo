<template>
<div class="container">
	<div
		class="qr"
		:class="{ 'qr-twostep': twoStep }"
		:style="{ width: qrWidth }"
	>
		<div
			v-if="twoStep"
			style="text-align: right; z-index: 3; margin-right:10%; top:0;"
		><a
				v-if="!scanning"
				href="#"
				@click.stop.prevent="scanning = true"
			>Scan QR -&gt;</a></div>

		<Qr
			:class="{ 'qrimg-twostep': twoStep, visible: !scanning, hidden: scanning }"
			:qrs="qrs"
		/>
	</div>
	<div
		class="qr-reader"
		:style="{ width: readerWidth }"
	>
		<div
			v-if="twoStep"
			style="margin-bottom: 5%;"
		><a
				v-if="scanning"
				href="#"
				@click.stop.prevent="scanning = false"
			>&lt;- Show QR</a></div>
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
			scanning: false,
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
		},
		twoStep: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		readerWidth: function()
		{
			return this.twoStep ? this.qrWidth : `calc(100% - ${this.qrWidth})`
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

a {
	color: inherit;
}

.qr {
	// width: calc(100% - 300px);
	// max-height: min();
	display: flex;
    flex-flow: column nowrap;
}
.qr-twostep {
	position: absolute;
    z-index: 2;

    // opacity: 0.7;
}
.qrimg-twostep {
	width: 120%;
	height: 120%;
	margin: -10%;
	
	transition: visibility 0s linear 0.2s, opacity 0.2s ease-in-out;
}
.qrimg-twostep.visible {
	transition-delay: 0s;
	visibility: visible;
	opacity: 1;
}
.qrimg-twostep.hidden {
	opacity: 0;
	visibility: hidden;
}
.qr-reader {
	// width: 300px;
	display: flex;
    flex-flow: column nowrap;
}

</style>

