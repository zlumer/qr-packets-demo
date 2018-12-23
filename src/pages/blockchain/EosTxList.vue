<template>
	<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
	<span v-else-if="loading" data-cy="loading">Loading tx list...</span>
	<ul v-else data-cy="tx-list">
		<li :key="tx.hash" v-for="tx in txs">
			hash: {{ tx.hash.substr(0, 10) + "..." }},
			from: {{ tx.from }},
			to: {{ tx.to }},
			amount: {{ tx.amount }},
			memo: {{ tx.memo }}
		</li>
	</ul>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IWallet } from 'src/store/interop'

interface ITx
{
	hash: string
	from: string
	to: string
	amount: string
	memo: string
}

export default Vue.extend({
	data()
	{
		return {
			txs: [] as ITx[],
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
		eos: function()
		{
			return this.$store.getters.blockchains.eos(this.wallet.chainId)
		},
	},
	mounted: async function ()
	{
		try
		{
			let txList = await this.eos.loadTxList(this.wallet)
			let unique = { } as { [hash:string]: boolean } // TODO: handle duplicate txs
			this.txs = txList.filter(x => unique[x.trx_id] ? false: (unique[x.trx_id] = true)).map(x => ({
				hash: x.trx_id,
				from: x.act.data.from,
				to: x.act.data.to,
				amount: x.act.data.quantity,
				memo: x.act.data.memo,
			}))
			this.loading = false
		}
		catch (e)
		{
			this.error = (e instanceof Error) ? e.message : e
		}
	},
})

</script>
