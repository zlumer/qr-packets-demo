<template>
	<div>
		<span v-for="name in inputs" :key="name">
			{{ form[name].label }}
			<form-input v-model="values[name]" @input="onInput(name)" :cy="form[name].cy" :enabled="!signing" />
		</span>
		<br/>
		<button type="submit" @click="onButton" :disabled="signing || !canSign">SIGN TX</button>
		<span v-if="loading">loading...</span>
		<remote-call v-if="signing && !loading" method="signTransferTx" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing && !loading">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import RemoteCall from './RemoteCall.vue'
import FormInput from './FormInput.vue'

export interface IFormInputField<T>
{
	label: string
	type?: 'text' | 'number'
	validate?: (value: T) => boolean
}
type IFormInputs = { [key: string]: IFormInputField<any> }

export default Vue.extend({
	data()
	{
		return {
			signing: false,
			values: { } as { [key: string]: unknown }
		}
	},
	props: {
		form: {
			type: Object as () => IFormInputs,
			required: true
		},
		inputs: {
			type: Array as () => string[],
			required: true
		},
		validate: {
			type: Function as any as () => () => boolean,
			required: false,
			default: () => true
		},
		loading: {
			type: Boolean,
			required: false,
			default: false
		},
		txJson: {
			type: String,
			required: false
		}
	},
	computed: {
		inputsValid()
		{
			return !this.inputs
				.map(n => ({ ...this.form[n], value: this.values[n] }))
				.map(x => x.validate ? x.validate(x.value) : true)
				.some(x => !x)
		},
		canSign: function()
		{
			return this.inputsValid && this.validate()
		},
		wallet: function()
		{
			return this.$store.state.currentWallet!
		},
		blockchainId: function()
		{
			return this.wallet.blockchain
		},
		blockchain: function()
		{
			return this.$store.getters.currentBlockchain
		}
	},
	methods: {
		async onButton()
		{
			this.signing = true
			this.$emit('sign', this.values)
		},
		onInput(field: string)
		{
			this.$emit('change', { field, value: this.values[field] })
		},
		setValue(field: string, value: unknown)
		{
			this.values[field] = value
		},
		onCancel()
		{
			this.signing = false
			this.$emit('cancel')
		},
		onResult(signedTx: string)
		{
			console.log(`signed tx: ${signedTx}`)
			this.$store.commit('setTxToPush', { tx: signedTx, wallet: this.wallet })
			this.$router.push({ name: "pushtx", params: {
				blockchain: this.blockchainId,
				txhash: this.blockchain.getTxHash(signedTx)
			} })
		}
	},
	components: {
		RemoteCall,
		FormInput,
	}
})
</script>

