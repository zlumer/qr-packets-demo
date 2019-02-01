<template>
	<div>
		<input-label>Receiver:</input-label>
		<code>{{ to }}</code>
		<div v-if="hasAmount" style="margin-top: 20px;">
			<input-label>Amount:</input-label>
			<span v-if="ethIsMain">
				<code>{{ amountEth }} ETH</code> <span v-if="ethPrice">(~${{ calculateUsd.toFixed(2) }})</span>
			</span>
			<span v-else>
				${{ amountUsd }} <span v-if="ethPrice">(~{{ calculateEth }} ETH)</span>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import InputLabel from "src/components/form/InputLabel.vue"
import { fromQuery } from "src/router-tools"
import { mapGetters, dispatcher, boundDispatcher } from "src/store-tools"

export default Vue.extend({
	async mounted()
	{
		await this.updatePrice()
	},
	computed: {
		amountEth: fromQuery('form-amount', parseFloat),
		amountUsd: fromQuery('form-usd', parseFloat),
		to: fromQuery('form-to'),
		ethPrice: mapGetters('ethPrice'),
		calculateEth: function()
		{
			if (typeof this.amountUsd === 'undefined')
				return NaN
			
			if (!this.ethPrice)
				return NaN
			
			return this.amountUsd / this.ethPrice
		},
		calculateUsd: function()
		{
			if (typeof this.amountEth === 'undefined')
				return NaN
			
			if (!this.ethPrice)
				return NaN
			
			return this.amountEth * this.ethPrice
		},
		hasAmount: function()
		{
			return (typeof this.amountEth !== 'undefined') || (typeof this.amountUsd !== 'undefined')
		},
		ethIsMain: function()
		{
			return typeof this.amountEth !== 'undefined'
		},
	},
	methods: {
		updatePrice: boundDispatcher('updateTokenPrice', { blockchain: 'eth' })
	},
	components: {
		InputLabel,
	}
})
</script>

<style lang="scss" scoped>

</style>