<template>
	<div>
		<input-label>Token contract address:</input-label>
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
				<eth-gas-price
					v-model="gasPrice"
					:gas="300000"
					:monetary="true"
				/>
			</template>
		</transfer-form>
	</div>
</template>

<script lang="ts">
import Vue, { VueWithProps } from 'src/vue-ts'
import TransferForm, { IFormInputField } from 'src/components/TransferForm.vue'
import InputLabel from "src/components/form/InputLabel.vue"
import EthGasPrice from 'src/components/form/EthGasPrice.vue'
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
			gasPrice: 1,
			nonce: NaN,
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
			return !!(this.tokenAddress && eth.isValidEthAddress(this.tokenAddress))
		},
		tokenAddress: function()
		{
			return this.token ? this.token.address : ''
		},
		tokenInfo: function()
		{
			if (!this.isValidAddress)
				return undefined
			
			return this.$store.getters.ethTokens_getTokenInfo(this.wallet.chainId as IChainId, this.tokenAddress)
		},
		tokenInfos: function()
		{
			return this.$store.getters.ethTokens_getTokensInfo(this.wallet.chainId as IChainId, this.tokensList)
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
			return this.$store.getters.ethTokens_hasLoadedTokenList(this.wallet)
		},
		tokensList: function()
		{
			if (!this.tokensListLoaded)
				return []
			
			return this.$store.getters.ethTokens_getTokenList(this.wallet)
		},
	},
	mounted()
	{
		this.$store.dispatch('ethTokens_updateTokenList', { wallet: this.wallet })
	},
	methods: {
		hasLoadedBalance(tokenAddr: string)
		{
			return this.$store.getters.ethTokens_hasLoadedBalance(this.wallet, tokenAddr)
		},
		getTokenBalance(tokenAddr: string)
		{
			let balance = this.$store.getters.ethTokens_getTokenBalance(this.wallet, tokenAddr)
			
			let tokenInfo = this.$store.getters.ethTokens_getTokenInfo(this.wallet.chainId as IChainId, tokenAddr)
			if (!tokenInfo || tokenInfo.notatoken)
				return NaN
			
			let decimals = tokenInfo.decimals
			if (decimals == 18)
				return eth.utils.fromWei(balance)
			
			return parseFloat(balance) / (10 ** decimals)
		},
		onNewTokenCall(address: string)
		{
			this.token = { address }
			this.$store.dispatch('ethTokens_updateTokenBalance', { wallet: this.wallet, tokenAddr: address })
		},
		async onTokenAddressChange()
		{
			let addr = this.tokenAddress
			if (!addr || !eth.isValidEthAddress(addr))
				return
			
			this.$store.dispatch('ethTokens_updateTokenBalance', { wallet: this.wallet, tokenAddr: addr })
		},
		async sign(form: { to: string, amount: string })
		{
			this.loading = true
			this.nonce = await this.web3.getNonce(this.address)
			let addrTo = `000000000000000000000000` + form.to.toLowerCase().replace('0x', '')
			let weiAmount = (this.tokenDecimals === 18) ? eth.utils.toWei(form.amount) : Math.round(parseFloat(form.amount) * (10 ** this.tokenDecimals)).toFixed(0)
			let amount = eth.utils.numberToHex(eth.utils.toBN(weiAmount)).replace('0x','')
			amount = '0'.repeat(64 - amount.length) + amount
			this.abi.args = [`0x${addrTo}`, `0x${amount}`]
			this.tx = {
				from: this.address,
				to: this.tokenAddress,
				nonce: this.nonce,
				gasPrice: eth.utils.toWei(this.gasPrice + "", 'gwei'),
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
		EthGasPrice,
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
