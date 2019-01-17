<template>
	<qr-exchange
		v-if="!webrtcConnected && !loadingWebrtc"
		:qrs="[`${method}|${id}|${params}`]"
		:intro="intro"
		:qr-width="qrWidth"
		@qr="onQr"
	/>
	<div
		v-else-if="loadingWebrtc"
	>Trying to connect to WebRTC...</div>
	<div
		v-else
	>Press button on your phone</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import QrExchange from "../components/QrExchange.vue"
import { parseHostMessage } from "../network/hostproto"
import { isResult } from "../network/hostprotocmd"
import { checkConnection, getSingleton } from '../webrtcsingleton'

export default Vue.extend({
	data()
	{
		return {
			webrtcConnected: false,
			loadingWebrtc: true,
		}
	},
	props: {
		intro: String,
		qrWidth: {
			type: String,
			default: '60%',
		},
		id: {
			type: [String, Number],
			default: Math.floor(Math.random() * 100000).toString(),
			required: false,
		},
		method: {
			type: String,
			required: true,
		},
		params: {
			type: String,
			required: true,
		},
	},
	async mounted()
	{
		this.webrtcConnected = await checkConnection()
		this.loadingWebrtc = false
		this.callWebrtc()
	},
	computed: {
	},
	methods: {
		async callWebrtc()
		{
			if (!this.webrtcConnected)
				return
			let result = await getSingleton().jrpc.callRaw(this.method, JSON.parse(this.params), !getSingleton().full)
			this.$emit('result', result)
		},
		onQr(qr: string)
		{
			console.log(`RemoteCall.onQr(): ${qr}`)
			let m = parseHostMessage(qr)
			if (!m || !isResult(m))
				return
			
			if (("" + m.id) == (this.id + ""))
			{
				this.$emit('result', m.result)
			}
		}
	},
	components: {
		QrExchange,
	}
})
</script>
