<template>
	<div>
		Push TX
		<span>{{ tx }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: {
		tx: {
			type: String,
			required: true,
		}
	}
})
</script>
