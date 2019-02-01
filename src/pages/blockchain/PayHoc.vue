<script lang="ts">
import Vue from 'src/vue-ts'
import EthPay from "./EthPay.vue"
import EosPay from "./EosPay.vue"
import { generate } from "./bbhoc"

export default generate({
	eth: EthPay,
	eos: EosPay,
})
</script>
