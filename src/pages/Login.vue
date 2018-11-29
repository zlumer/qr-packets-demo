<template>
	<QrExchange :qrs="[]" intro="Scan QR code to log in"></QrExchange>
</template>

<script lang="ts">
import Vue from 'vue'
import QrExchange from "../components/QrExchange.vue"

export default Vue.extend({
	components: {
		QrExchange,
	}
})
</script>
