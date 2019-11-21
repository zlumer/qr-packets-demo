<script lang="ts">
import Vue from 'src/vue-ts'
import EthTxList from "./EthTxList.vue"
import EosTxList from "./EosTxList.vue"
import BtcTxList from "./BtcTxList.vue"
import BchTxList from "./BchTxList.vue"
import { generate } from "./bbhoc"

export default generate({
	eth: EthTxList,
	eos: EosTxList,
	btc: BtcTxList,
	bch: BchTxList,
})
</script>
