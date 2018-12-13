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
import { JsonRpcWebRtc } from "../network/jrpcrtc"
import { JsonRpcFallback } from "../network/jrpcfb"
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
			}, async (rtc) =>
			{
				this.status = 'CONNECTED!'
				console.log('CONNECTED!!!!!')
				getSingleton().connected = true
				rtc.on('close', () => getSingleton().connected = false)
				rtc.on('error', () => getSingleton().connected = false)

				this.getWalletsOld()
				
				// this.getWallets()
			})
			let jrpc = getSingleton().jrpc = new JsonRpcWebRtc(wss.rtc,
				(json,cb) => console.log('Webrtc.vue: incoming: ', json),
				() => console.log(`Webrtc.vue: connected 2`))
			
			let onAnswer = wss.onAnswer
			wss.onAnswer = (answer: string) =>
			{
				onAnswer.call(wss, answer)

				setTimeout(fallback, 5000)
			}

			function fallback()
			{
				console.log('FALLING BACK')

				if (jrpc.connected)
					return
				
				wss.rtc.removeAllListeners()
				wss.rtc.end()
				let jrpcFallback = new JsonRpcFallback(wss.ws.wsrpc, (json, cb) =>
				{
					console.log('Webrtc.vue: incoming fallback: ', json)
				})
				getSingleton().jrpc = jrpcFallback
				getSingleton().connected = true
			}
		},
		async getWalletsOld()
		{
			let wallets = await getSingleton().jrpc.callRaw(`getWalletList`, {blockchains:["eth"]})
			
			localStorage.setItem('wallets', JSON.stringify(wallets))
			this.$router.push({ path: "/wallets" })
		},
		async getWallets()
		{
			// let wallets = await getSingleton().jrpc.send(`getWalletList|1|{blockchains:["eth","eos"]}`)
			let wallets = await getSingleton().jrpc.callRaw(`getWalletList`, {blockchains:["eth","eos"]}, true, 1)
			console.log(wallets[0])
			let address = wallets[0].address
			let tx = {
				to: '0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0',
				nonce: await eth.getNonce(address),
				from: address,
				gasPrice: eth.utils.toWei("3", 'gwei'),
				value: eth.utils.toWei("0.12354"),
			}
			let stx = await getSingleton().jrpc.callRaw(`getWalletList`, {blockchains:["eth","eos"]}, true, 1)
			// let tx = await getSingleton().jrpc.callRaw(`signTransferTx`, {wallet: wallets[0], tx:{}}, true, 2)
			return
			/* let wallets = await getSingleton().jrpc.call('getWalletList', ["eth"])
			localStorage.setItem('wallets', JSON.stringify(wallets))
			this.$router.push({ path: "/wallets" }) */
		}
	},
	components: {
		QrGif,
	}
})
</script>
