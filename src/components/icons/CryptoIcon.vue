<script lang="ts">
import Vue from 'src/vue-ts'
import IconBtc from "./IconBtc.vue"
import IconEos from "./IconEos.vue"
import IconEth from "./IconEth.vue"
import IconNeo from "./IconNeo.vue"

import { generate } from "src/pages/blockchain/bbhoc"

export default generate({
	eth: IconEth,
	btc: IconBtc,
	eos: IconEos,
	neo: IconNeo,
})
</script>
