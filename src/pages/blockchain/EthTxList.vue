<template>
	<div class="tx-list-container">
		<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
		<span v-else-if="loading" data-cy="loading">Loading tx list...</span>

		<table v-else data-cy="tx-list">
			<thead>
				<tr>
				<th>Date</th>
				<th>TxHash</th>
				<th>From</th>
				<th>To</th>
				<th>Value</th>
				</tr>
			</thead>
			<tbody>
					<tr :key="tx.hash" v-for="tx in txs">
						<td>{{new Date(tx.timeStamp * 1000).toLocaleString()}}</td>
						<td class="short">{{ tx.hash }}</td>
						<td class="short">
							<span v-if="!isSelf(tx.from)">{{ tx.from }}</span>
							<span v-else class="self-tag">this wallet</span>
						</td>
						<td class="short">
							<span v-if="!isSelf(tx.to)">{{ tx.to || tx.contractAddress }}</span>
							<span v-else class="self-tag">this wallet</span>
						</td>
						<td>{{ (tx.value / 1e18).toFixed(4) }}</td>
					</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss" scoped>
.tx-list-container {
	background: #fff;
	padding: 2rem;
	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04);
	border-radius: .8rem;
}
.self-tag {
	padding: 4px;
	border-radius: 4px;
    color: #00BCF9;
	background: rgba(179, 236, 254, 0.6);
}
table {
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	td {
		color: #2e3d3f;
		padding: 1rem .5rem;
	}
	td.short {
		max-width: 15vw;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	th {
		color: #457b9d;
		padding: .5rem;
	}
	tr {
		border-bottom: 1px solid #b2bcb9;
	}
}
</style>

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
	methods: {
		isSelf: function(addr: string)
		{
			return addr == this.wallet.address
		}
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
