<template>
	<div>
		<router-view></router-view>
		<h1>{{address}}</h1>
		<router-link :to="{name:'newtx', query:{ chainId: wallet.chainId }}">new tx</router-link>
		<tx-list-hoc :wallet="wallet" />
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import TxListHoc from './blockchain/TxListHoc.vue'

export default Vue.extend({
	data()
	{
		return {
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
	},
	components: {
		TxListHoc
	},
})
</script>
