<template>
	<eth-tx-list v-if="blockchain == 'eth'" :wallet="wallet" />
	<eos-tx-list v-else-if="blockchain == 'eos'" :wallet="wallet" />
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import EthTxList from "./EthTxList.vue"
import EosTxList from "./EosTxList.vue"
import { IBlockchainSymbol, IWallet } from 'src/store/interop'

export default Vue.extend({
	props: {
		wallet: {
			type: Object as () => IWallet,
			required: true,
		}
	},
	computed: {
		blockchain: function()
		{
			return this.wallet.blockchain
		}
	},
	components: {
		EthTxList,
		EosTxList,
	}
})
</script>

