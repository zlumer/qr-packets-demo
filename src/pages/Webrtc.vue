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
import { parseHostMessage, allToObj, IHCSimple, IHostCommand } from "../hostproto"
import { isResult } from "../hostprotocmd"
import { JsonRpc } from '../jsonrpc'
import { getSingleton, reset as webrtcReset, SignalData } from "../webrtcsingleton"

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
			const isIce = function(msg: IHostCommand<any, any>): msg is IHCSimple<{ice: {}}>
			{
				return msg.method == 'ice'
			}
			const isAnswer = function(msg: IHostCommand<any, any>): msg is IHCSimple<{answer: string}>
			{
				return msg.method == 'answer'
			}

			this.status = 'connecting to handshake server...'
			let ws = new WebSocket(this.url)
			let snt = getSingleton()
			let hsjrpc = new JsonRpc(msg => (console.log("HANDSHAKE > ", msg), ws.send(msg)), async (json, cb) =>
			{
				console.log('incoming: ', json)
				if (isIce(json))
				{
					let cand = allToObj(json, ["ice"]).ice
					// let cand = json.params.ice || json.params[0]
					console.log(`ICE (external):`, cand)
					if (cand)
						await this.rtc.signal({ candidate: cand })
					
					cb(undefined, null)
				}
				if (isAnswer(json))
				{
					let { answer } = allToObj(json, ['answer'])
					console.log(`got answer: ${answer}`)
					this.status = 'exchanging data, please wait'
					this.rtc.signal({ type: "answer", sdp: answer } as any)

					this.rtc.on("signal", signal => sendIce)
					await Promise.all(snt.data.ice.map(x => sendIce))
					cb(undefined, null)
				}
			})
			function sendIce(signal: SignalData)
			{
				if (signal.candidate)
					hsjrpc.callRaw('ice', { ice: signal.candidate })
			}
			const sendOffer = async (signal: SignalData) =>
			{
				if (signal.type == 'offer')
				{
					let sidResponse = await hsjrpc.callRaw('offer', { offer: signal.sdp })
					this.sid = sidResponse.sid
					this.status = 'PLEASE SCAN QR CODE'
				}
			}
			ws.addEventListener('message', msg => hsjrpc.onMessage(msg.data.toString()))
			ws.addEventListener('open', async () =>
			{
				snt.rtc.on('connect', () =>
				{
					this.status = 'CONNECTED!'
					this.getWallets()
				})
				if (snt.data.offer)
					sendOffer(snt.data.offer)
				else
					snt.rtc.on('signal', sendOffer)
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
