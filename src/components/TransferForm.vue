<template>
	<div>
		<div v-if="!signing || loading">
			<span v-for="name in inputs" :key="name">
				<input-label>{{ form[name].label }}</input-label>
				<form-input
					v-model="value[name]"
					:cy="form[name].cy"
					:enabled="!signing"
					:placeholder="form[name].placeholder"
					@input="onInput(name)"
				/>
			</span>
			<slot name="additional-inputs"></slot>
		</div>
		<remote-sign
			:loading="loading"
			:tx-json="txJson"
			:method="method"
			:can-sign="canSign"
			@sign="onSign"
			@cancel="onCancel"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import RemoteSign from './RemoteSign.vue'
import FormInput from './FormInput.vue'
import InputLabel from './form/InputLabel.vue'

export interface IFormInputField<T>
{
	label: string
	placeholder?: string
	type?: 'text' | 'number'
	validate?: (value: T) => boolean
}
type IFormInputs = { [key: string]: IFormInputField<any> }

export default Vue.extend({
	data()
	{
		return {
			signing: false,
		}
	},
	props: {
		value: {
			type: Object as () => { [key: string]: unknown },
			required: true
		},
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
				.map(n => ({ ...this.form[n], value: this.value[n] }))
				.map(x => x.validate ? x.validate(x.value) : true)
				.some(x => !x)
		},
		canSign: function()
		{
			return this.inputsValid && this.validate()
		},
	},
	methods: {
		async onSign()
		{
			this.signing = true
			this.$emit('sign', this.value)
		},
		async onCancel()
		{
			this.signing = false
			this.$emit('cancel')
		},
		onInput(field: string)
		{
			this.$emit('input', this.value)
			this.$emit('change', { field, value: this.value[field] })
		},
	},
	components: {
		RemoteSign,
		FormInput,
		InputLabel,
	}
})
</script>

