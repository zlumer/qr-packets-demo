<template>
	<div>
		To: <input type="text" ref="to" name="to" :disabled="signing">
		<br/>
		<button type="submit" @click="onButton" :disabled="signing">SIGN TX</button>
		<remote-call v-if="signing" method="signTransferTx" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RemoteCall from '../components/RemoteCall.vue'

export default Vue.extend({
	data()
	{
		return {
			signing: false
		}
	},
	computed: {
		wallet: function()
		{
			let wallets = JSON.parse(localStorage.getItem('wallets') || '[]') as {address:string}[]
			return wallets.find(x => x.address == this.$route.params.address)
		},
		txJson: function()
		{
			console.log(this.tx)
			return JSON.stringify({ tx: this.tx, wallet: this.wallet })
		},
		tx: function()
		{
			return {
				from: this.$route.params.address,
				to: (this.$refs.to as HTMLInputElement).value,
				nonce: 0,
				gasPrice: 3 * 1e12,
				value: 0,
			}
		}
	},
	methods: {
		onButton()
		{
			this.signing = true
		},
		onCancel()
		{
			this.signing = false
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

