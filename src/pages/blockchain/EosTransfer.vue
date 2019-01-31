<template>
	<div>
		<transfer-form
			ref="txform"
			v-model="values"
			:form="form"
			:inputs="inputs"
			:loading="loading"
			:tx-json="txJson"
			@sign="sign"
			@cancel="cancel"
			@change="onFormChange"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import TransferForm, { IFormInputField } from 'src/components/TransferForm.vue'
import { IEosTxHeaders } from 'src/blockchains/eos'

function validateAddress(addr: string)
{
	if (!addr)
		return false
	
	// TODO: unit test
	return (addr.length <= 12) && (addr.toLowerCase() == addr) && !addr.match(/[6|7|8|9|0]/)
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
			txHeaders: null as IEosTxHeaders | null,
			form: {
				to: { label: "To:", cy: "form-to", validate: validateAddress },
				amount: { label: "Amount:", cy: "form-amount", type: 'number', validate: validateNumber },
				usd: { label: "USD value:", cy: "form-usd", type: 'number' },
				memo: { label: "Memo:", cy: "form-memo", type: '' },
			},
			values: {
				to: '',
				memo: '',
				usd: '',
				amount: '',
			},
			tx: {
				to: '',
				memo: '',
				value: '',
			},
			inputs: ['to', 'amount', 'usd', 'memo']
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
		txMemoNotUndef: function()
		{
			return (typeof this.tx.memo === 'undefined') ? '' : this.tx.memo
		},
		preparedTx: function()
		{
			return {
				...this.txHeaders,
				actions: [
					{
						name: "transfer",
						account: "eosio.token",
						authorization: [{
							actor: this.address,
							permission: "active"
						}],
						data: {
							to: this.tx.to,
							from: this.address,
							quantity: this.tx.value,
							memo: this.txMemoNotUndef,
						}
					}
				]
			}
		},
		eosMethod: function()
		{
			return "transfer(from:name,to:name,quantity:asset,memo:string)"
		},
		txJson: function()
		{
			console.log(this.preparedTx)
			return JSON.stringify({ transaction: this.preparedTx, method: this.eosMethod, wallet: this.wallet })
		},
		eos: function()
		{
			return this.$store.getters.blockchains.eos(this.wallet.chainId)
		},
		eosPrice: function()
		{
			return this.$store.getters.eosPrice
		},
	},
	mounted: function()
	{
		this.$store.dispatch('updateTokenPrice', { blockchain: 'eos' }).then(() =>
		{
			let amount = parseFloat(this.values.amount + "")
			let usd = parseFloat(this.values.usd + "")
			console.log(`EOS updating amount: ${amount} (${this.eosPrice})[${this.$store.getters.eosPrice}]`, this.$store.state.tokenPrices)
			if (!isNaN(amount))
				this.values.usd = amount * this.eosPrice + ""
			else if (!isNaN(usd))
				this.values.amount = usd / this.eosPrice + ""
		})
		
		Object.keys(this.values).map(x => `form-${x}`).forEach(key =>
		{
			let param = this.$route.query[key]
			if (typeof param !== 'undefined')
			{
				let v = this.values
				let field = key.split('-')[1] as keyof typeof v
				this.values[field] = param + ""
			}
		})
	},
	methods: {
		async sign(form: { to: string, memo: string, amount: string })
		{
			this.loading = true
			this.txHeaders = await this.eos.getTxHeaders()
			let amount = parseFloat(form.amount + "").toFixed(4)
			let memo = (typeof form.memo === 'undefined') ? '' : form.memo
			this.tx = {
				to: form.to,
				value: `${amount} EOS`,
				memo: form.memo
			}
			this.loading = false
		},
		onFormChange({ field, value }: { field: string, value: unknown })
		{
			console.log(`form change! ${field}=${value} (${this.eosPrice})`, field, value)

			if (!this.eosPrice)
				return // we can't update when the price is not ready for any reason
			
			if (field == 'amount')
			{
				let val = parseFloat(value + "")
				if (!isNaN(val))
					this.values.usd = val * this.eosPrice + ""
			}
			if (field == 'usd')
			{
				let val = parseFloat(value + "")
				if (!isNaN(val))
					this.values.amount = val / this.eosPrice + ""
			}
		},
		cancel()
		{
			this.loading = false
		},
	},
	components: {
		TransferForm,
	}
})
</script>

