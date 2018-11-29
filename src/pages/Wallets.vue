<template>
	<div>
		<div v-if="!wallets.length">No wallets found!</div>
		<ul>
			<li :key="w.address" v-for="w in wallets">{{ w.address }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		wallets: function()
		{
			let wallets = JSON.parse(localStorage.getItem('wallets') || "[]") as { address: string }[]
			return wallets
		}
	}
})
</script>
