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
import { RTCHelper } from '../webrtc'
import { JsonRpc } from '../jsonrpc'
import { singleton } from "../webrtcsingleton"

export default Vue.extend({
	data()
	{
		return {
			status: 'not started',
			ws: null as any as WebSocket,
			url: "ws://139.59.184.152:3077",
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
			return singleton.connected
		},
		rtc: function()
		{
			return singleton.rtc
		},
		qr: function()
		{
			if (!this.sid)
				return ""
			
			return `webrtcLogin|777|${JSON.stringify({ sid: this.sid, url: this.url })}`
		}
	},
	methods: {
		async connect()
		{
			this.status = 'connecting to handshake server...'
			let ws = this.ws = new WebSocket(this.url)
			let ice = [] as any[]
			let hsjrpc = new JsonRpc(msg => (console.log(msg),ws.send(msg)), async (json, cb) =>
			{
				console.log('incoming: ', json)
				//@ts-ignore // temp ignore `unknown` type until vetur supports ts 3.2
				const isIce = function(msg: IHostCommand<unknown[], unknown>): msg is IHCSimple<{ice: {}}>
				{
					return json.method == 'ice'
				}
				//@ts-ignore // temp ignore `unknown` type until vetur supports ts 3.2
				const isAnswer = function(msg: IHostCommand<unknown[], unknown>): msg is IHCSimple<{answer: string}>
				{
					return json.method == 'answer'
				}
				if (isIce(json))
				{
					let cand = allToObj(json, ["ice"]).ice
					// let cand = json.params.ice || json.params[0]
					console.log(`ICE (external):`, cand)
					if (cand)
						await this.rtc.pushIceCandidate(cand)
					cb(undefined, null)
				}
				if (isAnswer(json))
				{
					let { answer } = allToObj(json, ['answer'])
					console.log(`got answer: ${answer}`)
					this.status = 'exchanging data, please wait'
					this.sid = ''
					await this.rtc.pushAnswer({ type: "answer", sdp: answer })
					this.rtc.candidates.map(x => x && hsjrpc.call('ice', x))
					this.rtc.addListener('ice', x => x && hsjrpc.call('ice', x))
					cb(undefined, null)
				}
			})
			this.ws.addEventListener('message', msg => hsjrpc.onMessage(msg.data.toString()))
			let offerPromise = this.rtc.createOffer()
			this.ws.addEventListener('open', async () =>
			{
				this.status = 'waiting for webrtc offer'
				let offer = await offerPromise
				this.status = 'pushing webrtc offer'
				let { sid } = await hsjrpc.call('offer', offer.sdp)
				this.sid = sid
				this.status = 'PLEASE SCAN QR CODE'
			})
			await this.rtc.waitConnection()
			this.status = 'CONNECTED!'
			singleton.connected = true
			await this.getWallets()
		},
		async getWallets()
		{
			let wallets = await singleton.jrpc.call('getWalletList', ["eth"])
			localStorage.setItem('wallets', JSON.stringify(wallets))
			this.$router.push({ path: "/wallets" })
		}
	},
	components: {
		QrGif,
	}
})
</script>
