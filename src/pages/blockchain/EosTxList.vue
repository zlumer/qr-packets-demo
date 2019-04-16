<template>
	<div class="tx-list-container">
		<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
		<span v-else-if="loading" data-cy="loading">Loading tx list...</span>

		<table v-else data-cy="tx-list">
			<thead>
				<tr>
					<th>TxHash</th>
					<th>From</th>
					<th>To</th>
					<th>Amount</th>
					<th>Memo</th>
				</tr>
			</thead>
			<tbody>
				<tr :key="tx.hash" v-for="tx in txs">
					<td>{{ tx.hash.substr(0, 10) + "..." }}</td>
					<td><code>{{ tx.from }}</code></td>
					<td><code>{{ tx.to }}</code></td>
					<td><code>{{ tx.amount }}</code></td>
					<td class="td-memo" :title="tx.memo"><code>{{ tx.memo }}</code></td>
				</tr>
			</tbody>
		</table>
	</div>
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
	}
})

</script>

<style lang="scss" scoped>
.tx-list-container {
	background: #fff;
	padding: 2rem;
	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04);
	border-radius: .8rem;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	td {
		color: #2e3d3f;
		padding: 1rem .5rem;
	}
	th {
		color: #c19191;
		padding: .5rem;
	}
	tr {
		border-bottom: 1px solid #b2bcb9;
	}
}
td.td-memo {
	max-width: 20vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
