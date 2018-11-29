<template>
	<QrExchange v-if="!webrtcAvailable" :qrs="[`${method}|${id}|${params}`]" :intro="intro" v-on:qr="onQr"></QrExchange>
	<div v-else>Press button on your phone</div>
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
			id: Math.floor(Math.random() * 100000).toString()
		}
	},
	props: {
		intro: String,
		method: {
			type: String,
			required: true,
		},
		params: {
			type: String,
			required: true,
		},
	},
	computed: {
		webrtcAvailable: function()
		{
			return false
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
				this.$emit('result', m.result)
			}
		}
	},
	components: {
		QrExchange,
	}
})
</script>
