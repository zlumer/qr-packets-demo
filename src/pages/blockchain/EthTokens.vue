<template>
	<div>
		<span>Token contract address:</span>
		<input
			type="text"
			v-model="token.address"
			@input="onTokenAddressChange"
			data-cy="form-token"
		>
		<div v-if="!token.loaded && token.status">{{token.status}}</div>
		<div v-if="token.loaded">{{token.name}} ({{token.symbol}})</div>
		<br/>
		<transfer-form v-if="token.loaded"
			ref="txform"
			:form="form"
			:inputs="inputs"
			:loading="loading"
			:tx-json="txJson"
			method="signContractCall"
			@sign="sign"
			@cancel="cancel"
			@change="onFormChange"
		/>
	</div>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import TransferForm, { IFormInputField } from 'src/components/TransferForm.vue'
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

export default Vue.extend({
	data()
	{
		return {
			loading: false,
			nonce: NaN,
			token: {
				address: '',
				name: '',
				symbol: '',
				decimals: 0,
				loaded: false,
				status: '',
			},
			form: {
				to: { label: "To:", cy: "form-to", validate: validateAddress },
				amount: { label: "Amount:", cy: "form-amount", type: 'number', validate: validateNumber },
				gas: { label: "Gas price:", cy: "form-gas", type: 'number', validate: validateNumber },
			},
			tx: {
				from: '',
				to: '',
				nonce: NaN,
				gasPrice: '',
				value: '',
				data: '',
			},
			method: 'transfer(address,uint256)',
			args: null as [string, string] | null,
			inputs: ['to', 'amount', 'gas']
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
			return JSON.stringify({
				args: this.args,
				method: this.method,
				tx: this.tx,
				wallet: this.wallet
			})
		},
		web3: function()
		{
			return this.$store.getters.blockchains.eth(this.wallet.chainId).web3
		},
	},
	methods: {
		async onTokenAddressChange()
		{
			this.token.loaded = false
			let addr = this.token.address
			if (!addr || !eth.isValidEthAddress(addr))
			{
				this.token.status = 'incorrect token address'
				return
			}
			this.token.status = 'loading token data...'
			let { name, symbol, notatoken } = await this.web3.getTokenInfo(addr)
			if (notatoken)
			{
				this.token.status = `ERC20 token is not found on ${addr}`
				return
			}
			this.token.name = name
			this.token.symbol = symbol
			this.token.loaded = true
		},
		async sign(form: { to: string, gas: string, amount: string })
		{
			this.loading = true
			this.nonce = await this.web3.getNonce(this.address)
			let addrTo = `000000000000000000000000` + form.to.toLowerCase().replace('0x', '')
			let amount = eth.utils.toWei(form.amount).replace('0x', '')
			amount = '0'.repeat(64 - amount.length) + amount
			this.args = [`0x${addrTo}`, `0x${amount}`]
			this.tx = {
				from: this.address,
				to: this.token.address,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(form.gas, 'gwei'),
				value: eth.utils.toWei('0'),
				data: `0xa9059cbb${addrTo}${amount}`,
			}
			this.loading = false
		},
		onFormChange({ field, value }: { field: string, value: unknown })
		{

		},
		cancel()
		{
			this.loading = false
		},
	},
	components: {
		TransferForm
	}
})
</script>

<style lang="scss" scoped>

</style>
