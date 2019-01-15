<template>
	<div class="overlay-bg">
		<slot></slot>
	</div>	
</template>

<style lang="scss" scoped>

.overlay-bg {
	position: absolute;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	background: rgba(#000, 0.3);
}

</style>
