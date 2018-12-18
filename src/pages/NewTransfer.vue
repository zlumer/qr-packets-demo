<template>
	<div>
		<span v-for="name in inputs" :key="name">
			{{ form[name].label }}
			<form-input v-model="form[name].value" :cy="form[name].cy" :enabled="!signing" />
		</span>
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
import FormInput from '../components/FormInput.vue'
import * as eth from "../web3"

function validateAddress(addr: string)
{
	if (!addr)
		return false
	
	return eth.isValidEthAddress(addr.toLowerCase())
}
function validateNumber(num: number)
{
	return !isNaN(parseFloat(num.toString()))
}

export default Vue.extend({
	data()
	{
		return {
			signing: false,
			loading: false,
			nonce: NaN,
			form: {
				to: { label: "To:", cy: "form-to", value: '', validate: validateAddress },
				amount: { label: "Amount:", cy: "form-amount", type: 'number', value: '', validate: validateNumber },
				usd: { label: "USD value:", cy: "form-usd", type: 'number', value: '' },
				gas: { label: "Gas price:", cy: "form-gas", type: 'number', value: '', validate: validateNumber },
			},
			inputs: ['to', 'amount', 'usd', 'gas']
		}
	},
	computed: {
		inputsValid()
		{
			return !this.inputs
				.map(n => this.form[n as "to"])
				.map(x => x.validate ? x.validate(x.value) : true)
				.some(x => !x)
		},
		canSign: function()
		{
			return this.inputsValid
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
				to: this.form.to.value,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(this.form.gas.value, 'gwei'),
				value: eth.utils.toWei(this.form.amount.value),
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
		RemoteCall,
		FormInput,
	}
})
</script>

