<template>
	<div>
		<input-label>Select token:</input-label>
		<vue-select
			v-model="token"
			data-cy="form-token"
			class="select-combobox"
			placeholder="Select token"
			maxHeight="40vh"
			label="address"
			taggable
			:loading="!tokensListLoaded || (isValidAddress && !tokenInfoLoaded)"
			:options="tokenInfos"
			@input="onTokenAddressChange"
			@option:created="onNewTokenCall"
		>
			<template
				slot="option"
				slot-scope="opt"
			>
				<span
					v-if="hasLoadedBalance(opt.address)"
				>
					<span v-if="isNaN(getTokenBalance(opt.address))">{{opt.symbol}}</span>
					<strong v-else>{{getTokenBalance(opt.address)}} {{opt.symbol}}</strong>
					{{opt.address}}
				</span>
				<span
					v-else
				>{{opt.address}}</span>
			</template>
			<template
				slot="no-options"
			>
				No ERC20 tokens found on this wallet.
			</template>
		</vue-select>
		<div v-if="!tokenAddress"></div>
		<div v-else-if="!isValidAddress">Incorrect token address</div>
		<div v-else-if="!tokenInfoLoaded">Loading token info...</div>
		<div v-else-if="!validToken">ERC20 token not found on contract <code>{{tokenAddress}}</code></div>
		<div v-else>{{tokenName}} ({{tokenSymbol}})
			<div v-if="!balanceLoaded">loading your balance...</div>
			<div v-else>Your balance: {{tokenBalance}} {{tokenSymbol}}</div>
		</div>
		<br/>
		<transfer-form v-if="validToken"
			ref="txform"
			v-model="formValues"
			:form="form"
			:inputs="inputs"
			:loading="loading"
			:tx-json="txJson"
			method="signContractCall"
			@sign="sign"
			@cancel="cancel"
			@change="onFormChange"
		>
			<template slot="additional-inputs">
				<!-- <eth-gas-price
					v-model="gasPrice"
					:gas="300000"
					:monetary="true"
				/> -->
			</template>
		</transfer-form>
	</div>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import TransferForm, { IFormInputField } from 'src/components/TransferForm.vue'
import InputLabel from "src/components/form/InputLabel.vue"
import { IChainId, IEosTxHeaders } from 'src/blockchains/eos'

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

export default Vue.extend({
	data()
	{
		return {
			loading: false,
			txHeaders: null as IEosTxHeaders | null,
			token: null as { address: string } | null,
			form: {
				to: { label: "To:", cy: "form-to", validate: validateAddress },
				amount: { label: "Amount:", cy: "form-amount", type: 'number', validate: validateNumber },
			},
			formValues: {
				to: '',
				amount: '',
			},
			tx: {
				to: '',
				amount: '',
				memo: '',
			},
			abi: {
				method: 'transfer(from:name,to:name,quantity:asset,memo:string)',
				args: null as [string, string] | null,
			},
			inputs: ['to', 'amount']
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
		preparedTx: function()
		{
			return {
				...this.txHeaders,
				actions: [
					{
						name: "transfer",
						account: this.tokenAddress,
						authorization: [{
							actor: this.address,
							permission: "active"
						}],
						data: {
							to: this.tx.to,
							from: this.address,
							quantity: this.tx.amount,
							memo: this.tx.memo,
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
		isValidAddress: function()
		{
			return validateAddress(this.tokenAddress)
		},
		tokenAddress: function()
		{
			return this.token ? this.token.address : ''
		},
		tokenInfo: function()
		{
			if (!this.isValidAddress)
				return undefined
			
			return this.$store.getters.eosTokens_getTokenInfo(this.wallet.chainId as IChainId, this.tokenAddress)
		},
		tokenInfos: function()
		{
			return this.$store.getters.eosTokens_getTokensInfo(this.wallet.chainId as IChainId, this.tokensList)
				.map((x, i) => ({
					...x,
					address: this.tokensList[i],
				}))
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
		tokenDecimals: function()
		{
			if (!this.validToken || !this.tokenInfo || this.tokenInfo.notatoken)
				return NaN
			
			return this.tokenInfo.decimals
		},
		balanceLoaded: function()
		{
			return this.hasLoadedBalance(this.tokenAddress)
		},
		tokenBalance: function()
		{
			return this.getTokenBalance(this.tokenAddress)
		},
		tokensListLoaded: function()
		{
			return this.$store.getters.eosTokens_hasLoadedTokenList(this.wallet)
		},
		tokensList: function()
		{
			if (!this.tokensListLoaded)
				return []
			
			return this.$store.getters.eosTokens_getTokenList(this.wallet)
		},
	},
	mounted()
	{
		this.$store.dispatch('eosTokens_updateTokenList', { wallet: this.wallet })
	},
	methods: {
		hasLoadedBalance(tokenAddr: string)
		{
			return this.$store.getters.eosTokens_hasLoadedBalance(this.wallet, tokenAddr)
		},
		getTokenBalance(tokenAddr: string)
		{
			let balance = this.$store.getters.eosTokens_getTokenBalance(this.wallet, tokenAddr)
			
			let tokenInfo = this.$store.getters.eosTokens_getTokenInfo(this.wallet.chainId as IChainId, tokenAddr)
			if (!tokenInfo || tokenInfo.notatoken)
				return NaN
			
			return parseFloat(balance)
		},
		onNewTokenCall(address: string)
		{
			this.token = { address }
			this.$store.dispatch('eosTokens_updateTokenBalance', { wallet: this.wallet, tokenAddr: address })
		},
		async onTokenAddressChange()
		{
			let addr = this.tokenAddress
			if (!validateAddress(addr))
				return
			
			this.$store.dispatch('eosTokens_updateTokenBalance', { wallet: this.wallet, tokenAddr: addr })
		},
		async sign(form: { to: string, amount: string })
		{
			this.loading = true
			let symbol = this.tokenInfo && !this.tokenInfo.notatoken && this.tokenInfo.symbol
			let amount = `${parseFloat(form.amount + "").toFixed(this.tokenDecimals)} ${symbol}`
			this.txHeaders = await this.eos.getTxHeaders()
			this.tx = {
				to: form.to,
				amount,
				memo: 'Cold Crypto token transfer',
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

.select-combobox {
	/deep/ .dropdown-toggle {
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
	/deep/ button.clear {
		display: none;
		pointer-events: none;
	}
}

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
