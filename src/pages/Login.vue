<template>
	<QrExchange :qrs="[]" intro="Scan QR code to log in" v-on:qr="onQr"></QrExchange>
</template>

<script lang="ts">
import Vue from 'vue'
import QrExchange from "../components/QrExchange.vue"
import { parseHostMessage } from "../hostproto"
import { isResult } from "../hostprotocmd"

export default Vue.extend({
	data()
	{
		return {
			id: "2" //Math.floor(Math.random() * 100000).toString()
		}
	},
	methods: {
		onQr(qr: string)
		{
			let m = parseHostMessage(qr)
			if (!m || !isResult(m))
				return
			
			if (("" + m.id) == this.id)
			{
				let wallets = m.result as {address: string}[]
				localStorage.setItem('wallets', JSON.stringify(wallets))
				this.$router.push({ path: "/wallets" })
			}
		}
	},
	components: {
		QrExchange,
	}
})
</script>
