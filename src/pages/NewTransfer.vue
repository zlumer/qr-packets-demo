<template>
	<div>
		To: <input type="text" ref="to" name="to" :disabled="signing">
		<br/>
		<button type="submit" @click="onButton" :disabled="signing">SIGN TX</button>
		<span v-if="signing && loading">loading...</span>
		<remote-call v-if="signing && !loading" method="signTransferTx" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing && !loading">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RemoteCall from '../components/RemoteCall.vue'
import * as eth from "../web3"

export default Vue.extend({
	data()
	{
		return {
			signing: false,
			loading: false,
			nonce: NaN,
		}
	},
	computed: {
		address: function()
		{
			return this.$route.params.address
		},
		wallet: function()
		{
			let wallets = JSON.parse(localStorage.getItem('wallets') || '[]') as {address:string}[]
			return wallets.find(x => x.address == this.address)
		},
		txJson: function()
		{
			console.log(this.tx)
			return JSON.stringify({ tx: this.tx, wallet: this.wallet })
		},
		tx: function()
		{
			return {
				from: this.address,
				to: (this.$refs.to as HTMLInputElement).value,
				nonce: this.nonce,
				gasPrice: 3 * 1e12,
				value: 0,
			}
		}
	},
	methods: {
		async onButton()
		{
			this.signing = true
			this.loading = true
			this.nonce = await eth.getNonce(this.address)
			this.loading = false
		},
		onCancel()
		{
			this.signing = false
			this.loading = false
		},
		onResult(signedTx: string)
		{
			console.log(`signed tx: ${signedTx}`)
			this.$router.push({ name: "pushtx", params: { tx: signedTx } })
		}
	},
	components: {
		RemoteCall
	}
})
</script>

