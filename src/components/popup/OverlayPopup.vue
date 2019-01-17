<template>
	<grey-overlay class="above-all container">
		<white-rect>
			<div class="header">
				<h1>{{headerState}}</h1>
				<close-button
					:href="closeHref"
					@click="$emit('close')"
				/>
			</div>
			<slot></slot>
		</white-rect>
	</grey-overlay>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import CloseButton from "./CloseButton.vue"
import GreyOverlay from "./GreyOverlay.vue"
import WhiteRect from "./WhiteRect.vue"

export default Vue.extend({
	props: {
		header: {
			type: String,
			default: ''
		},
		closeHref: {
			type: String,
			default: '.'
		}
	},
	computed: {
		headerState: function ()
		{
			return this.header
		}
	},
	components: {
		GreyOverlay,
		CloseButton,
		WhiteRect,
	}
})
</script>

<style lang="scss" scoped>

.above-all {
	z-index: 999;
}

.container {
	display: flex;
    justify-content: center;
	position: fixed;
}

.header {
	display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
	margin-bottom: 2rem;
}
.header > h1 {
	color: rgb(22, 10, 46);
    font-size: 1.6rem;
    text-transform: uppercase;
    margin: 0px;
}

</style>