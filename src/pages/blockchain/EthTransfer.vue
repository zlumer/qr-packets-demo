<template>
	<div>
		<transfer-form
			ref="txform"
			:form="form"
			:inputs="inputs"
			:loading="loading"
			:tx-json="txJson"
			@sign="sign"
			@cancel="cancel"
			@change="onFormChange"
		>
			<template slot="additional-inputs">
				<eth-gas-price
					v-model="gasPrice"
					:gas="21000"
					:monetary="true"
				/>
			</template>
		</transfer-form>
	</div>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import TransferForm, { IFormInputField } from 'src/components/TransferForm.vue'
import EthGasPrice from 'src/components/form/EthGasPrice.vue'
import * as eth from "src/blockchains/eth"

function validateAddress(addr: string)
{
	if (!addr)
		return false
	
	return eth.isValidEthAddress(addr.toLowerCase())
}
function validateNumber(num: number)
{
	if (typeof num !== "number")
		if (typeof num !== "string")
			return false
	
	return !isNaN(parseFloat(num.toString()))
}

type TRefs = {
	txform: InstanceType<typeof TransferForm>
}

export default (Vue as VueWithProps<{ $refs: TRefs }>).extend({
	data()
	{
		return {
			loading: false,
			nonce: NaN,
			gasPrice: 1,
			form: {
				to: { label: "To:", placeholder: "Address", cy: "form-to", validate: validateAddress },
				amount: { label: "Amount:", placeholder: "0", cy: "form-amount", type: 'number', validate: validateNumber },
				usd: { label: "USD value:", cy: "form-usd", type: 'number' },
			},
			tx: {
				from: '',
				to: '',
				nonce: NaN,
				gasPrice: '',
				value: '',
			},
			inputs: ['to', 'amount', 'usd']
		}
	},
	computed: {
		address: function()
		{
			return this.wallet.address
		},
		wallet: function()
		{
			return this.$store.state.currentWallet!
		},
		txJson: function()
		{
			console.log(this.tx)
			return JSON.stringify({ tx: this.tx, wallet: this.wallet })
		},
		web3: function()
		{
			return this.$store.getters.blockchains.eth(this.wallet.chainId).web3
		},
		ethPrice: function()
		{
			return this.$store.getters.ethPrice
		},
	},
	mounted: function()
	{
		this.$store.dispatch('updateTokenPrice', { blockchain: 'eth' }).then(() =>
		{
			let amount = parseFloat(this.$refs.txform.values['amount'] + "")
			if (!isNaN(amount))
				this.$refs.txform.setValue('usd', amount * this.$store.getters.ethPrice)
		})
	},
	methods: {
		async sign(form: { to: string, amount: string })
		{
			this.loading = true
			this.nonce = await this.web3.getNonce(this.address)
			this.tx = {
				from: this.address,
				to: form.to,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(this.gasPrice + "", 'gwei'),
				value: eth.utils.toWei(form.amount),
			}
			this.loading = false
		},
		onFormChange({ field, value }: { field: string, value: unknown })
		{
			// console.log(`form change! ${field} ${value}`, field, value)

			if (!this.ethPrice)
				return // we can't update when the price is not ready for any reason
			
			if (field == 'amount')
			{
				let val = parseFloat(value + "")
				if (!isNaN(val))
					this.$refs.txform.setValue('usd', val * this.ethPrice)
			}
			if (field == 'usd')
			{
				let val = parseFloat(value + "")
				if (!isNaN(val))
					this.$refs.txform.setValue('amount', val / this.ethPrice)
			}
		},
		cancel()
		{
			this.loading = false
		},
	},
	components: {
		TransferForm,
		EthGasPrice,
	}
})
</script>

