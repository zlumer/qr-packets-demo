<template>
	<div>
		<h1 v-if="connected">CONNECTED</h1>
		<div v-else>
			<span v-if="status">{{ status }}</span>
			<qr-gif :qrs="[qr]" v-if="sid"></qr-gif>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import QrGif from "../components/QrGif.vue"
import { getSingleton, reset as webrtcReset } from "../webrtcsingleton"
import { JsonRpcWebsocket } from "../network/jrpcws"
import { WebrtcHSInitiator } from "../network/wrtchs"
import * as eth from "../web3"

export default Vue.extend({
	data()
	{
		return {
			status: 'not started',
			url: "wss://duxi.io/shake",
			sid: '',
		}
	},
	props: {
	},
	async mounted()
	{
		if (!this.connected)
			await this.connect()
	},
	computed: {
		connected: function()
		{
			return getSingleton().connected
		},
		rtc: function()
		{
			return getSingleton().rtc
		},
		qr: function()
		{
			if (!this.sid)
				return ""
			
			return `webrtcLogin|3|${JSON.stringify({ sid: this.sid, url: this.url })}`
		}
	},
	methods: {
		async connect()
		{
			this.status = 'connecting to handshake server...'
			let wss = new WebrtcHSInitiator(this.url, (sid) =>
			{
				this.sid = sid
					this.status = 'PLEASE SCAN QR CODE'
			}, () =>
				{
					this.status = 'CONNECTED!'
				console.log('CONNECTED!!!!!')
				// this.getWallets()
			})
		},
		async getWallets()
		{
			let wallets = await getSingleton().jrpc.call('getWalletList', ["eth"])
			localStorage.setItem('wallets', JSON.stringify(wallets))
			this.$router.push({ path: "/wallets" })
		}
	},
	components: {
		QrGif,
	}
})
</script>
