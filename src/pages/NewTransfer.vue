<template>
	<div>
		To: <input type="text" v-model="form.to" data-cy="form-to" :disabled="signing">
		Amount: <input type="number" v-model="form.amount" data-cy="form-amount" :disabled="signing">
		USD value: <input type="number" v-model="form.usd" data-cy="form-usd" :disabled="signing">
		Gas price: <input type="number" v-model="form.gas" data-cy="form-gas" :disabled="signing">
		<br/>
		<button type="submit" @click="onButton" :disabled="signing || !canSign">SIGN TX</button>
		<span v-if="signing && loading">loading...</span>
		<remote-call v-if="signing && !loading" method="signTransferTx" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing && !loading">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import RemoteCall from '../components/RemoteCall.vue'
import * as eth from "../web3"

export default Vue.extend({
	data()
	{
		return {
			signing: false,
			loading: false,
			nonce: NaN,
			form: {
				to: '',
				amount: '',
				usd: '',
				gas: '',
			},
		}
	},
	computed: {
		canSign: function()
		{
			return this.validAddress && this.validAmount && this.validGas
		},
		validAddress: function()
		{
			return eth.isValidEthAddress(this.form.to.toLowerCase())
		},
		validAmount: function()
		{
			return !isNaN(parseFloat(this.form.amount))
		},
		validGas: function()
		{
			return !isNaN(parseFloat(this.form.gas))
		},
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
				to: this.form.to,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(this.form.gas, 'gwei'),
				value: eth.utils.toWei(this.form.amount),
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

