<template>
	<div>
		<h1>{{address}}</h1>
		<router-link :to="{name:'newtx', params:{ address: address }}">new tx</router-link>
		<ul>
			<li :key="tx.hash" v-for="tx in txs">hash: {{ tx.hash.substr(0, 10) + "..." }}, from: {{ tx.from.substr(0, 10) + "..." }}, to: {{ tx.to.substr(0, 10) + "..." }}, amount: {{ (tx.value / 1e18).toFixed(4) }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

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
			txs: [] as ITransaction[]
		}
	},
	computed: {
		address: function()
		{
			return this.$router.currentRoute.params.address
		}
	},
	mounted: async function ()
	{
		let url = `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${this.address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`
		let data = await fetch(url)
		let json = await data.json()
		console.log(json)
		let unique = {} as {[hash:string]: boolean}
		let items = [].concat(json.result) as ITransaction[]
		this.txs = items.filter(x => unique[x.hash] ? false : (unique[x.hash] = true))
	},
})
</script>
