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

export default Vue.extend({
	data()
	{
		return {
		}
	},
	computed: {
		msgId()
		{
			return this.$store.state.webrtc.outgoingId
		},
		bcs: function()
		{
			return JSON.stringify({ blockchains: config.blockchains })
		}
	},
	methods: {
		onResult(wallets: IWallet[])
		{
			this.$store.commit('setWalletList', { wallets })
			this.$router.push({ path: "/wallets" })
		}
	},
	components: {
		RemoteCall,
        WhitePopup,
	}
})
</script>
