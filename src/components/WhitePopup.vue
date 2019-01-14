<template>
	<div class="center-window">
		<div>
			<h2 class="header">{{header}}</h2>
			<h3 class="subheader">{{subheader}}</h3>
			<div class="separator"></div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: {
		header: {
			type: String,
			required: true,
		},
		subheader: {
			type: String,
			required: true,
		},
	}
})
</script>

<style lang="scss" scoped>

.center-window {
	max-width: 50rem;
    min-width: 30rem;
    background: rgb(255, 255, 255);
    border-radius: 0.8rem;
    padding: 2rem;
}

.header {
	color: rgb(22, 10, 46);
    font-size: 1.4rem;
    font-weight: normal;
    margin: 0px 0px 0.25rem;
}
.subheader {
    color: rgba(22, 10, 46, 0.5);
    font-size: 1.05rem;
    font-weight: normal;
    margin: 0px;
}
.separator {
	background-color: transparent;
    height: 1px;
    width: 100%;
    margin: 1rem 0px;
}

</style>

