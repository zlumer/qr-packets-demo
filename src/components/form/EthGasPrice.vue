<template>
	<div>
		<div
			v-if="gweiValues.length"
			class="slider-container"
			data-cy="gas-slider"
		>
			<input-label class="slider-label">Gas price:</input-label>
			<vue-slider
				style="width:50vw;display:inline-block;"
				:value="value"
				:data="gweiValues"
				:piecewise="true"
				@input="onSlide"
			/>
		</div>
		<div
			v-else
			class="loading"
		>
			Loading optimal gas prices...
		</div>
		<div
			v-if="gas"
			class="total-gas"
		>Total TX cost: <span data-cy="total-gas">{{ totalGasEth }} ETH</span>
			<span
				v-if="monetary"
				class="usd-price"
			>(approx. ${{ totalCost.toFixed(2) }})</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import VueSlider from 'vue-slider-component'
import InputLabel from './InputLabel.vue'
import * as eth from "src/blockchains/eth"

export default Vue.extend({
	data()
	{
		return {
		}
	},
	props: {
		gas: {
			type: Number,
			default: NaN,
		},
		monetary: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Number,
		}
	},
	mounted()
	{
		this.$store.dispatch('ethGas_updatePrices')
	},
	computed: {
		ethUsdPrice: function()
		{
			return this.$store.getters.ethPrice
		},
		gweiUsdPrice: function()
		{
			return this.ethUsdPrice * parseFloat(eth.utils.fromWei("1", 'gwei'))
		},
		totalGas: function()
		{
			return this.value * this.gas
		},
		totalGasEth: function()
		{
			if (isNaN(this.totalGas))
				return NaN
			
			return eth.utils.fromWei(eth.utils.toWei(this.totalGas.toFixed(9), 'gwei'))
		},
		totalCost: function()
		{
			return this.totalGas * this.gweiUsdPrice
		},
		gweiValues: function()
		{
			return this.$store.getters.ethGas_gweiPrices
		}
	},
	methods: {
		onSlide(val: number)
		{
			this.$emit('input', val)
		}
	},
	components: {
		VueSlider,
		InputLabel,
	}
})
</script>

<style lang="scss" scoped>

.slider-container {
	display: flex;
	margin-top: 15px;
}
.slider-label {
	width: auto;
	margin-right: 20px;
}

.loading {
	color: rgba(22, 10, 46, 0.6);
}

.total-gas {
	color: rgba(22, 10, 46, 0.6);
	margin-bottom: 20px;
}

.usd-price {

}
</style>