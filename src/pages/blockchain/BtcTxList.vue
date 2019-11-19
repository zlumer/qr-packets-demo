<template>
	<div class="tx-list-container">
		<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
		<span v-else-if="loading" data-cy="loading">Loading tx list...</span>

		<span v-else-if="!hasTxs" data-cy="tx-list-empty">No transactions on this wallet yet.</span>
		<table v-else data-cy="tx-list">
			<thead>
				<tr>
				<th>Date</th>
				<th>TxHash</th>
				<!-- <th>Incoming</th> -->
				<th></th>
				<!-- <th>To</th> -->
				<th>Value</th>
				</tr>
			</thead>
			<tbody>
					<tr :key="tx.hash" v-for="tx in txs">
						<td>{{tx.date}}</td>
						<td class="short">{{ tx.hash }}</td>
						<td class="short">
							<span v-if="tx.incoming">Received</span>
							<span v-else>Sent</span>
						</td>
						<!-- <td class="short">
							<span v-if="!isSelf(tx.from)">{{ tx.from }}</span>
							<span v-else class="self-tag">this wallet</span>
						</td>
						<td class="arrow">{{ "\u2192" }}</td>
						<td class="short">
							<span v-if="!isSelf(tx.to)">{{ tx.to || tx.contractAddress }}</span>
							<span v-else class="self-tag">this wallet</span>
						</td> -->
						<td>{{ (tx.value / 1e8).toFixed(4) }}</td>
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
    color: #5ca0d3;
	background: #f0e9e9;
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
		padding: 0;
		white-space: nowrap;
		overflow: hidden;

		text-align: center;
	}
	td.arrow {
		max-width: 4rem;
		text-align: center;
	}
	th {
		color: #5ca0d3;
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
		}
	},
	props: {
		wallet: {
			type: Object as () => IWallet,
			required: true,
		}
	},
	computed: {
		txs: function()
		{
			let txs = this.$store.getters.btctx_getTxs(this.wallet)
			return txs
		},
		hasTxs: function()
		{
			return !!(this.txs && this.txs.length)
		},
		error()
		{
			let e = this.$store.getters.btctx_hasError(this.wallet)
			return (e instanceof Error) ? e.message : e
		},
		loading()
		{
			return this.$store.getters.btctx_isLoading(this.wallet) || !this.$store.getters.btctx_getTxs(this.wallet)
		}
	},
	watch: {
		wallet: function()
		{
			this.updateTxs()
		}
	},
	methods: {
		isSelf: function(addr: string)
		{
			return addr.toLowerCase() == this.wallet.address.toLowerCase()
		},
		updateTxs: async function()
		{
			this.$store.dispatch('btctx_hardUpdateTxs', { wallet: this.wallet })
		},
	},
	mounted: function()
	{
		this.updateTxs()
	},
})

</script>
