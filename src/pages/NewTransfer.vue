<template>
	<div>
		<span v-for="name in inputs" :key="name">
			{{ form[name].label }}
			<form-input v-model="values[name]" :cy="form[name].cy" :enabled="!signing" />
		</span>
		<br/>
		<button type="submit" @click="onButton" :disabled="signing || !canSign">SIGN TX</button>
		<span v-if="loading">loading...</span>
		<remote-call v-if="signing && !loading" method="signTransferTx" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing && !loading">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import RemoteCall from '../components/RemoteCall.vue'
import FormInput from '../components/FormInput.vue'

export interface IFormInputField<T>
{
	label: string
	type?: 'text' | 'number'
	validate?: (value: T) => boolean
}

export default Vue.extend({
	data()
	{
		return {
			signing: false,
			values: { } as { [key: string]: any }
		}
	},
	props: {
		form: {
			type: Object as () => { [key: string]: IFormInputField<any> },
			required: true
		},
		inputs: {
			type: Array as () => string[],
			required: true
		},
		validate: {
			type: Function as any as () => () => boolean,
			required: false
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
			return this.inputsValid && (this.validate ? this.validate() : true)
		},
	},
	methods: {
		async onButton()
		{
			this.signing = true
			this.$emit('sign', this.values)
		},
		onCancel()
		{
			this.signing = false
			this.$emit('cancel')
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

