<template>
	<div>
		<span v-for="name in inputs" :key="name">
			{{ form[name].label }}
			<form-input v-model="values[name]" @input="onInput(name)" :cy="form[name].cy" :enabled="!signing" />
		</span>
		<br/>
		<remote-sign
			:loading="loading"
			:tx-json="txJson"
			:method="method"
			:can-sign="canSign"
			@sign="onButton"
			@cancel="onCancel"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import RemoteSign from './RemoteSign.vue'
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
		method: {
			type: String,
			required: false,
			default: 'signTransferTx'
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
	},
	methods: {
		async onButton()
		{
			this.signing = true
			this.$emit('sign', this.values)
		},
		async onCancel()
		{
			this.signing = false
			this.$emit('cancel')
		},
		onInput(field: string)
		{
			this.$emit('change', { field, value: this.values[field] })
		},
		setValue(field: string, value: unknown)
		{
			this.values[field] = value
		},
	},
	components: {
		RemoteSign,
		FormInput,
	}
})
</script>

