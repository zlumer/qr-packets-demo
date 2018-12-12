<template>
	<remote-call intro="Scan QR code to log in" method="getWalletList" :params="bcs" :id="2" v-on:result="onResult"></remote-call>
</template>

<script lang="ts">
import Vue from 'vue'
import RemoteCall from "../components/RemoteCall.vue"

export default Vue.extend({
	data()
	{
		return {
			blockchains: ["eth"]
		}
	},
	computed: {
		bcs: function()
		{
			return JSON.stringify({ blockchains: this.blockchains })
		}
	},
	methods: {
		onResult(wallets: {address: string}[])
		{
			localStorage.setItem('wallets', JSON.stringify(wallets))
			this.$router.push({ path: "/wallets" })
		}
	},
	components: {
		RemoteCall,
	}
})
</script>
