<template>
	<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
	<span v-else-if="loading" data-cy="loading">Loading tx list...</span>
	<ul v-else data-cy="tx-list">
		<li :key="tx.hash" v-for="tx in txs">hash: {{ tx.hash.substr(0, 10) + "..." }}, from: {{ tx.from.substr(0, 10) + "..." }}, to: {{ tx.to.substr(0, 10) + "..." }}, amount: {{ (tx.value / 1e18).toFixed(4) }}</li>
	</ul>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IWallet } from 'src/store/interop'

interface ITransaction
{
	hash: string
	from: string
	to: string
	value: string
}

export default Vue.extend({
	data()
	{
		return {
			txs: [] as ITransaction[],
			error: '',
			loading: true,
		}
	},
	props: {
		wallet: {
			type: Object as () => IWallet,
			required: true,
		}
	},
	computed: {
		eth: function()
		{
			return this.$store.getters.blockchains.eth(this.wallet.chainId)
		},
	},
	mounted: async function ()
	{
		try
		{
			let txList = await this.eth.loadTxList(this.wallet)
			let unique = { } as { [hash:string]: boolean } // TODO: handle duplicate txs
			this.txs = txList.filter(x => unique[x.hash] ? false: (unique[x.hash] = true))
			this.loading = false
		}
		catch (e)
		{
			this.error = (e instanceof Error) ? e.message : e
		}
	},
})

</script>
