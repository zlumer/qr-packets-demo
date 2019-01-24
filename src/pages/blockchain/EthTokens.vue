<template>
	<div>
		<input-label>Token contract address:</input-label>
		<input
			type="text"
			v-model="token.address"
			@input="onTokenAddressChange"
			data-cy="form-token"
		/>
		<div v-if="!token.address"></div>
		<div v-else-if="!isValidAddress">Incorrect token address</div>
		<div v-else-if="!tokenInfoLoaded">Loading token info...</div>
		<div v-else-if="!validToken">ERC20 token not found on contract <code>{{token.address}}</code></div>
		<div v-else>{{tokenName}} ({{tokenSymbol}})
			<div v-if="!balanceLoaded">loading your balance...</div>
			<div v-else>Your balance: {{tokenBalance}} {{tokenSymbol}}</div>
		</div>
		<br/>
		<transfer-form v-if="validToken"
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
import InputLabel from "src/components/form/InputLabel.vue"
import * as eth from "src/blockchains/eth"
import { IChainId } from 'src/blockchains/eth-chains'

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
				gasLimit: '300000',
				value: '',
				data: '',
			},
			abi: {
				method: 'transfer(address,uint256)',
				args: null as [string, string] | null,
			},
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
				abi: this.abi,
				tx: this.tx,
				wallet: this.wallet
			})
		},
		web3: function()
		{
			return this.$store.getters.blockchains.eth(this.wallet.chainId).web3
		},
		isValidAddress: function()
		{
			return this.token.address && eth.isValidEthAddress(this.token.address)
		},
		tokenInfo: function()
		{
			if (!this.isValidAddress)
				return undefined
			
			return this.$store.getters.ethTokens_getTokenInfo(this.wallet.chainId as IChainId, this.token.address)
		},
		tokenInfoLoaded: function()
		{
			if (!this.isValidAddress)
				return false
			
			return !!this.tokenInfo
		},
		validToken: function()
		{
			return this.tokenInfoLoaded && !this.tokenInfo!.notatoken
		},
		tokenSymbol: function()
		{
			if (!this.validToken || !this.tokenInfo || this.tokenInfo.notatoken)
				return ''
			
			return this.tokenInfo.symbol
		},
		tokenName: function()
		{
			if (!this.validToken || !this.tokenInfo || this.tokenInfo.notatoken)
				return ''
			
			return this.tokenInfo.name
		},
		balanceLoaded: function()
		{
			return this.$store.getters.ethTokens_hasLoadedBalance(this.wallet, this.token.address)
		},
		tokenBalance: function()
		{
			return this.$store.getters.ethTokens_getTokenBalance(this.wallet, this.token.address)
		},
	},
	methods: {
		async onTokenAddressChange()
		{
			let addr = this.token.address
			if (!addr || !eth.isValidEthAddress(addr))
				return
			
			this.$store.dispatch('ethTokens_updateTokenBalance', { wallet: this.wallet, tokenAddr: addr })
		},
		async sign(form: { to: string, gas: string, amount: string })
		{
			this.loading = true
			this.nonce = await this.web3.getNonce(this.address)
			let addrTo = `000000000000000000000000` + form.to.toLowerCase().replace('0x', '')
			let amount = eth.utils.numberToHex(eth.utils.toBN(eth.utils.toWei(form.amount))).replace('0x','')
			amount = '0'.repeat(64 - amount.length) + amount
			this.abi.args = [`0x${addrTo}`, `0x${amount}`]
			this.tx = {
				from: this.address,
				to: this.token.address,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(form.gas, 'gwei'),
				gasLimit: '300000',
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
		TransferForm,
		InputLabel,
	}
})
</script>

<style lang="scss" scoped>

input {
	box-sizing: border-box;
    color: rgba(22, 10, 46, 0.6);
    font-size: 0.9rem;
    width: 100%;
    background: rgb(243, 242, 244);
    border-width: 2px;
    border-style: solid;
    border-color: rgb(115, 108, 130);
    border-image: initial;
    border-radius: 6rem;
    margin: 0.25rem 0px;
    outline: none;
    padding: 0.75rem 1rem;
	margin-bottom: 1rem;
}

</style>
