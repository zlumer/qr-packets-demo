<template>
	<div class="overlay-bg">
		<slot></slot>
	</div>	
</template>

<style lang="scss" scoped>

.overlay-bg {
	position: fixed;
	width: 100vw;
	height: 100vh;
	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
	background: rgba(#000, 0.3);
}

</style>
