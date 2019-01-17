<template>
	<div>
		<div class="tx-hash-header">TX hash: <code>{{txhash}}</code></div>
		<!-- <span>{{ tx }}</span> -->
		<div v-if="tx" data-cy="loading">Pushing <strong>{{blockchain.toUpperCase()}}</strong> tx to <strong>{{networkName}}</strong> network...</div>
		<div v-if="error" data-cy="error" class="error-container">
			<div class="error-header">Error pushing tx!</div>
			<div class="error-description"><span class="error-name">[{{ error.name }}]</span> <span class="error-message">{{ error.message }}</span></div>
			<div class="error-link">Try checking if tx is in the blockchain: <br/><a href="" class="error-link-a"><code>{{shorthash}}</code></a></div>
		</div>
		<span v-if="resultHash" data-cy="result-hash">Success! pushed tx with hash: {{ resultHash }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { IBlockchainSymbol } from 'src/store/interop'

export default Vue.extend({
	data()
	{
		return {
			loading: true,
			networkName: '',
			error: undefined as any as Error,
			resultHash: undefined as any as string,
		}
	},
	props: {
		blockchain: {
			type: String as () => IBlockchainSymbol,
			required: true,
		},
		txhash: {
			type: String,
			required: true,
		},
	},
	computed: {
		tx: function()
		{
			return this.$store.state.txToPush
		},
		shorthash: function()
		{
			if (this.txhash.length < 30)
				return this.txhash
			return this.txhash.slice(0, 15) + `...` + this.txhash.slice(this.txhash.length - 15, this.txhash.length)
		}
	},
	mounted: async function ()
	{
		let tx = this.tx
		if (!tx)
		{
			this.error = new Error("no transaction to push")
			return
		}
		
		try
		{
			let bc = this.$store.getters.blockchains[this.blockchain](tx.wallet.chainId)
			this.networkName = bc.networkName
			let hash = await bc.pushTx(tx.tx)
			this.resultHash = hash
		}
		catch (e)
		{
			this.error = e
		}
	}
})
</script>

<style lang="scss" scoped>

.tx-hash-header {
	margin-bottom: 20px;
}

.error-header {
	color: red;
}
.error-description {
	font-family: monospace;
}
.error-link {
	margin-top: 20px;
}
.error-link-a {
	// font-family: monospace;
}

</style>

