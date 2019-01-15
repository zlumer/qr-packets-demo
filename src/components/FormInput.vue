<template>
	<input
		v-bind:value="value"
		:type="type"
		:data-cy="cy"
		:disabled="!enabled"
		:placeholder="placeholder"
		@input="$emit('input', $event.target.value)"
	/>
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
		placeholder: String,
		type: {
			type: String,
			required: false,
			default: "text",
		}
	}
})
</script>

<style lang="scss" scoped>

input {
	box-sizing: border-box;
    color: rgba(22, 10, 46, 0.6);
    font-size: 0.9rem;
    width: 100%;
    background: rgb(243, 242, 244);
    border-width: 2px;
    border-style: solid;
    border-color: rgb(115, 108, 130);
    border-image: initial;
    border-radius: 6rem;
    margin: 0.25rem 0px;
    outline: none;
    padding: 0.75rem 1rem;
	margin-bottom: 1rem;
}
</style>
