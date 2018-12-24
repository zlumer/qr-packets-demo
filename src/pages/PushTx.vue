<template>
	<div>
		Push TX
		<span>{{ tx }}</span>
		<span v-if="loading" data-cy="loading">Pushing...</span>
		<span v-if="error" data-cy="error">Error! {{ error.name }} {{ error.message }}</span>
		<span v-if="resultHash" data-cy="result-hash">Success! pushed tx with hash: {{ resultHash }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IBlockchainSymbol } from 'src/store/interop'

export default Vue.extend({
	data()
	{
		return {
			loading: true,
			error: undefined as any as Error,
			resultHash: undefined as any as string,
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
			let hash = await bc.pushTx(tx.tx)
			this.resultHash = hash
		}
		catch (e)
		{
			this.error = e
		}
	}
})
</script>
