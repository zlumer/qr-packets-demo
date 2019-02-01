<template>
	<div>
		<input-label>Receiver:</input-label>
		<code>{{ to }}</code>
		<div v-if="hasAmount" style="margin-top: 20px;">
			<input-label>Amount:</input-label>
			<span v-if="eosIsMain">
				<code>{{ amountEos }} EOS</code> <span v-if="eosPrice">(approx. ${{ calculateUsd.toFixed(2) }})</span>
			</span>
			<span v-else>
				~${{ amountUsd }} <span v-if="eosPrice">(<code>{{ calculateEos.toFixed(4) }} EOS</code>)</span>
			</span>
		</div>
		<div v-if="memo" style="margin-top: 20px;">
			<input-label>Memo:</input-label>
			<code>{{ memo }}</code>
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
		amountEos: fromQuery('form-amount', parseFloat),
		amountUsd: fromQuery('form-usd', parseFloat),
		to: fromQuery('form-to'),
		memo: fromQuery('form-memo'),
		eosPrice: mapGetters('eosPrice'),
		calculateEos: function()
		{
			if (typeof this.amountUsd === 'undefined')
				return NaN
			
			if (!this.eosPrice)
				return NaN
			
			return this.amountUsd / this.eosPrice
		},
		calculateUsd: function()
		{
			if (typeof this.amountEos === 'undefined')
				return NaN
			
			if (!this.eosPrice)
				return NaN
			
			return this.amountEos * this.eosPrice
		},
		hasAmount: function()
		{
			return (typeof this.amountEos !== 'undefined') || (typeof this.amountUsd !== 'undefined')
		},
		eosIsMain: function()
		{
			return typeof this.amountEos !== 'undefined'
		},
	},
	methods: {
		updatePrice: boundDispatcher('updateTokenPrice', { blockchain: 'eos' })
	},
	components: {
		InputLabel,
	}
})
</script>

<style lang="scss" scoped>

</style>