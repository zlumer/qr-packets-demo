<template>
	<white-popup
		header="Airgapped Login"
		subheader="Scan QR code with Cold Crypto mobile app to login"
	>
		<remote-call
			intro=""
			method="getWalletList"
			:params="bcs"
			:id="2"
			v-on:result="onResult"
		></remote-call>
	</white-popup>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import RemoteCall from "src/components/RemoteCall.vue"
import WhitePopup from 'src/components/WhitePopup.vue'
import config from "src/config"
import { IWallet } from 'src/store/interop'
import { fromQuery } from 'src/router-tools'

export default Vue.extend({
	data()
	{
		return {
		}
	},
	computed: {
		redirect: fromQuery('redirect'),
		queryBcs: fromQuery('bcs'),
		msgId()
		{
			return this.$store.state.webrtc.outgoingId
		},
		bcs: function()
		{
			let blockchains = this.queryBcs ? this.queryBcs.split(',') : config.blockchains
			return JSON.stringify({ blockchains })
		}
	},
	methods: {
		onResult(wallets: IWallet[])
		{
			this.$store.commit('setWalletList', { wallets })
			let path = this.redirect || "/wallets"
			this.$router.push({ path })
		}
	},
	components: {
		RemoteCall,
        WhitePopup,
	}
})
</script>
