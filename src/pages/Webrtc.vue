<template>
	<white-popup
		header="Online Login"
		subheader="Scan QR code with Cold Crypto mobile app to login"
	>
		<h1 v-if="connected">CONNECTED</h1>
		<div v-else data-cy="webrtc-force" ref="wrapper">
			<span v-if="status">{{ status }}</span>
			<qr-gif :qrs="[qr]" v-if="sid"></qr-gif>
		</div>
		<div v-if="loginError" data-cy="login-error">{{ loginError }}</div>
	</white-popup>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import QrGif from "../components/QrGif.vue"
import WhitePopup from 'src/components/WhitePopup.vue'
import { getSingleton, reset as webrtcReset } from "../webrtcsingleton"
import { JsonRpcWebsocket } from "../network/jrpcws"
import { JsonRpcWebRtc } from "../network/jrpcrtc"
import { JsonRpcFallback } from "../network/jrpcfb"
import { WebrtcHSInitiator } from "../network/wrtchs"
import { fromQuery } from 'src/router-tools'
import config from 'src/config'
import { IWallet } from 'src/store/interop'

type TRefs = {
	wrapper: HTMLDivElement
}

export default (Vue as VueWithProps<{$refs: TRefs}>).extend({
	data()
	{
		return {
			loginError: '',
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
		redirect: fromQuery('redirect'),
		queryBcs: fromQuery('bcs'),
		blockchains: function()
		{
			let blockchains = this.queryBcs ? this.queryBcs.split(',') : config.blockchains
			return blockchains
		},
		forceFallback(): boolean
		{
			let wrapper = this.$refs.wrapper
			if (wrapper && wrapper.hasAttribute('data-force-fallback'))
				return !!wrapper.getAttribute('data-force-fallback')
			
			return false
		},
		connected: function()
		{
			return this.$store.state.webrtc.connected
		},
		qr: function()
		{
			if (!this.sid)
				return ""
			
			return `webrtcLogin|1|${JSON.stringify({ sid: this.sid, url: this.url })}`
		}
	},
	watch: {
		connected: function()
		{
			
		}
	},
	methods: {
		async connect()
		{
			this.status = 'connecting to handshake server...'
			let wss = new WebrtcHSInitiator(this.url, (sid) =>
			{
				this.sid = sid
				this.status = ''
			}, async (rtc) =>
			{
				this.status = 'CONNECTED!'
				console.log('CONNECTED!!!!!')
				this.$store.dispatch('webrtcConnected')
				rtc.on('close', () => this.$store.dispatch('webrtcDisconnected'))
				rtc.on('error', () => this.$store.dispatch('webrtcDisconnected'))

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

				let timeout = this.forceFallback ? 1 : 5000
				setTimeout(fallback, timeout)
			}

			let ready = () =>
			{
				this.$store.dispatch('webrtcConnected')
				this.getWalletsOld()
			}

			function fallback()
			{
				console.log('falling back?')

				if (jrpc.connected)
					return
				
				console.log('FALLING BACK!')

				wss.rtc.removeAllListeners()
				wss.rtc.end()
				let jrpcFallback = new JsonRpcFallback(wss.ws.wsrpc, (json, cb) =>
				{
					console.log('Webrtc.vue: incoming fallback: ', json)
				})
				getSingleton().jrpc = jrpcFallback

				ready()
			}
		},
		async getWalletsOld()
		{
			const getWalletList = () => getSingleton().jrpc.callRaw(`getWalletList`, {blockchains: this.blockchains}, !getSingleton().full)
			const hasGoodWallets = (w: IWallet[]) => w.some(x => this.blockchains.indexOf(x.blockchain) >= 0)
			let t = this
			async function check(): Promise<IWallet[]>
			{
				let wallets: IWallet[] = await getWalletList()
				if (!hasGoodWallets(wallets))
				{
					t.loginError = `incorrect blockchain wallets! try again with wallet of: ${t.blockchains}`
					return new Promise((res) =>
					{
						setTimeout(() =>
						{
							res(check())
						}, 1000)
					})
				}
				
				return wallets
			}
			let wallets = await check()

			this.loginError = ''
			
			this.$store.commit('setWalletList', { wallets })
			let path = this.redirect || "/wallets"
			this.$router.push({ path })
		}
	},
	components: {
		QrGif,
		WhitePopup,
	}
})
</script>
