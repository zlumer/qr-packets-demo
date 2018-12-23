<template>
	<div>
		<router-view></router-view>
		<h1>{{address}}</h1>
		<router-link :to="{name:'newtx', params:{ address: address }}">new tx</router-link>
		<span v-if="error" data-cy="error">ERROR LOADING TRANSACTIONS: {{ error }}</span>
		<span v-else-if="loading" data-cy="loading">Loading tx list...</span>
		<ul v-else data-cy="tx-list">
			<li :key="tx.hash" v-for="tx in txs">hash: {{ tx.hash.substr(0, 10) + "..." }}, from: {{ tx.from.substr(0, 10) + "..." }}, to: {{ tx.to.substr(0, 10) + "..." }}, amount: {{ (tx.value / 1e18).toFixed(4) }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IBlockchain } from 'src/blockchains/IBlockchain'

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
	computed: {
		address: function()
		{
			return this.wallet.address
		},
		wallet: function()
		{
			return this.$store.state.currentWallet!
		},
		blockchain: function()
		{
			return this.$store.getters.currentBlockchain as IBlockchain<ITransaction, unknown, unknown>
		},
	},
	mounted: async function ()
	{
		try
		{
			let txList = await this.blockchain.loadTxList(this.wallet)
			let unique = {} as {[hash:string]: boolean}
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
