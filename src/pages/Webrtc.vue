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
import { getSingleton, reset as webrtcReset } from "../webrtcsingleton"

export default Vue.extend({
	data()
	{
		return {
			status: 'not started',
			ws: null as any as WebSocket,
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
			let ws = this.ws = new WebSocket(this.url)
			let ice = [] as any[]
			let hsjrpc = new JsonRpc(msg => (console.log(msg), ws.send(msg)), async (json, cb) =>
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
						await this.rtc.signal({ candidate: cand })
					
					cb(undefined, null)
				}
				if (isAnswer(json))
				{
					let { answer } = allToObj(json, ['answer'])
					console.log(`got answer: ${answer}`)
					this.status = 'exchanging data, please wait'
					this.rtc.signal({ type: "answer", sdp: answer } as any)
					await Promise.all(ice.map(x => hsjrpc.callRaw('ice', x)))
					cb(undefined, null)

					this.rtc.addListener('ice', x => x && hsjrpc.call('ice', x))
				}
			})
			this.ws.addEventListener('message', msg => hsjrpc.onMessage(msg.data.toString()))
			this.ws.addEventListener('open', async () =>
			{
				webrtcReset(true)
				getSingleton().rtc.on('signal', async signal =>
				{
					console.log(`SIGNAL$`, signal)
					if (signal.type == 'offer')
					{
						this.sid = (await hsjrpc.callRaw('offer', { offer: signal.sdp })).sid
						this.status = 'PLEASE SCAN QR CODE'
					}
					if (signal.candidate)
						hsjrpc.callRaw("ice", { ice: signal.candidate })
				})
				getSingleton().rtc.on('connect', () =>
				{
					this.status = 'CONNECTED!'
					getSingleton().connected = true
					this.getWallets()
				})
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
