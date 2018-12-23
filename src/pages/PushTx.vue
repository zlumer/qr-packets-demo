<template>
	<div>
		Push TX
		<span>{{ tx }}</span>
		<span v-if="loading">Pushing...</span>
		<span v-if="error">Error! {{ error.name }} {{ error.message }}</span>
		<span v-if="result">Success! pushed tx with hash: {{ result.transactionHash }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import * as eth from "src/blockchains/eth"
import { TransactionReceipt } from 'web3/types'
import { IBlockchainSymbol } from 'src/store/interop'

export default Vue.extend({
	data()
	{
		return {
			loading: true,
			error: undefined as any as Error,
			result: undefined as any as TransactionReceipt,
		}
	},
	props: {
		blockchain: {
			type: String as () => IBlockchainSymbol,
			required: true,
		},
		txhash: {
			type: String,
			required: true,
		}
	},
	computed: {
		tx: function()
		{
			return this.$store.state.txToPush
		},
	},
	mounted: async function ()
	{
		let tx = this.tx
		if (!tx)
		{
			this.error = new Error("no transaction to push")
			return
		}
		
		try
		{
			let bc = this.$store.getters.blockchains[this.blockchain](tx.wallet.chainId)
			let result = await bc.pushTx(tx.tx)
			this.result = result
		}
		catch (e)
		{
			this.error = e
		}
	}
})
</script>
