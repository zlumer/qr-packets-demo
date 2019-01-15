<template>
	<a
		href="#"
		@click.stop.prevent="$emit('click')"
		class="link"
	><big-x></big-x></a>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import BigX from "./BigX.vue"

export default Vue.extend({
	components: {
		BigX,
	}
})
</script>

<style lang="scss" scoped>

.link {
	align-self: center;
    // margin-left: 1rem;
    color: black;
    // font-size: 2rem;
    text-decoration: none;
}

</style>
