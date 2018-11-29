<template>
	<div>
		Push TX
		<span>{{ tx }}</span>
		<span v-if="loading">Pushing...</span>
		<span v-if="error">Error! {{ error.name }} {{ error.message }}</span>
		<span v-if="result">Success! pushed tx with hash: {{ result.transactionHash }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as eth from "../web3"
import { TransactionReceipt } from 'web3/types'

export default Vue.extend({
	data()
	{
		return {
			loading: true,
			error: undefined as any as Error,
			result: undefined as any as TransactionReceipt,
		}
	},
	props: {
		tx: {
			type: String,
			required: true,
		}
	},
	mounted: async function ()
	{
		try
		{
			let result = await eth.sendTx(this.tx)
			this.result = result
		}
		catch (e)
		{
			this.error = e
		}
	}
})
</script>
