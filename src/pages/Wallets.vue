<template>
	<div>
		<div v-if="!wallets.length">No wallets found!</div>
		<ul>
			<li :key="w.address" v-for="w in wallets">
				<router-link
					:to="{ name: 'wallet', params: {
						address: w.address,
						blockchain: w.blockchain,
					}, query: { chainId: w.chainId } }"
				>{{ w.address }}</router-link>
				</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IBlockchainSymbol } from 'src/store/interop'

function unique<T extends string>(arr: T[]): T[]
{
	let unique = {} as any
	arr.forEach(x => unique[x] = 1)
	return Object.keys(unique) as T[]
}

export default Vue.extend({
	beforeMount()
	{
		let blockchains = unique(this.wallets.map(w => w.blockchain))
		blockchains.forEach(key => this.$store.dispatch('updateTokenPrice', { blockchain: key }))
	},
	mounted()
	{
		if (this.wallets.length >= 1)
		{
			let w = this.wallets[0]
			this.$router.replace({ name: 'wallet', params: {
				address: w.address,
				blockchain: w.blockchain,
			}, query: { chainId: w.chainId + "" } })
		}
	},
	computed: {
		wallets: function()
		{
			return this.$store.state.wallets
		}
	}
})
</script>
