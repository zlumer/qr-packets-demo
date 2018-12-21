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
export default Vue.extend({
	computed: {
		wallets: function()
		{
			return this.$store.state.wallets
		}
	}
})
</script>
