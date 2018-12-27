<template>
	<div class="container">
		<mp-header />
		<main>
			<div class="center-window">
				<div style="width: 38rem;">
					<h2 class="header">Welcome!</h2>
					<h3 class="subheader">Sign in to your wallet below</h3>
					<div class="separator"></div>
					<div class="button-container">
						<div class="login-button button-left">
							<router-link to="/login">
								<button class="button-blue">Airgapped login</button>
							</router-link>
						</div>
						<div class="login-button button-right">
							<router-link to="/webrtc">
								<button class="button-white">Online login</button>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</main>
		<mp-footer />
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import Header from 'src/components/MainPageHeader.vue'
import Footer from 'src/components/MainPageFooter.vue'

export default Vue.extend({
	components: {
		"mp-header": Header,
		"mp-footer": Footer,
	}
})
</script>

<style lang="scss" scoped>

.container {
	min-height: 100vh;
    background: linear-gradient(57deg, rgb(13, 13, 13) 0%, rgb(22, 10, 46) 100%);
}

main {
	-webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    min-height: calc((100vh - 4rem) - 4rem);
}

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

.button-container {
	display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
}

.login-button {
	display: block;
    text-decoration: none;
	flex-flow: column nowrap;
	width: 50%; display: flex; justify-content: center; padding-right: 1rem;
}
.login-button > a {
	display: block;
    text-decoration: none;
}

.button-blue {
	cursor: pointer;
    line-height: 1.45rem;
    width: 100%;
    color: rgb(255, 255, 255);
    font-size: 1.1rem;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 0.25rem 0px;
    outline: 0px;
    padding: 0.5rem 2rem;
    border-radius: 6rem;
    background: rgb(0, 188, 249);
    transition: all 0.2s ease-in-out 0s;
}
.button-white {
	cursor: pointer;
    line-height: 1.45rem;
    width: 100%;
    color: rgb(0, 188, 249);
    font-size: 1rem;
    margin: 0.25rem 0px;
    outline: 0px;
    padding: 0.5rem 2rem;
    border-radius: 6rem;
    background: transparent;
    border-width: 3px;
    border-style: solid;
    border-color: rgb(0, 188, 249);
    border-image: initial;
    transition: all 0.2s ease-in-out 0s;
}


</style>
