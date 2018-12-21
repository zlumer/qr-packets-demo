<template>
	<input
		v-bind:value="value"
		@input="$emit('input', $event.target.value)"
		:type="type"
		:data-cy="cy"
		:disabled="!enabled"
	>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'

export default Vue.extend({
	data()
	{
		return {
		}
	},
	props: {
		enabled: Boolean,
		value: [String, Number],
		cy: String,
		type: {
			type: String,
			required: false,
			default: "text",
		}
	},
})
</script>
