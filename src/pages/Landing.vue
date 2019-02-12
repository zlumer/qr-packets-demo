<template>
	<body>
		<header>
			<div class="wrapper">
			<div class="logo">
				<img src="img/header_logo.svg"/>
			</div>
			<nav>
				<a
					v-for="link in links"
					:href="link.href"
					:key="link.text"
				>{{ link.text }}</a>
			</nav>
			</div>
		</header>
		<main>
			<div class="slide-1">
			<div class="slide-wrapper">
				<div class="content">
				<h1>Cold Crypto is first mobile cold storage wallet</h1>
				<h5>Why are we better?</h5>
				<ul>
					<li>Support of BTC, USDT, also ETH, ERC20 tokens, EOS and EOS tokens</li>
					<li>Offline and online access</li>
					<li>Offline and online payments</li>
					<li>It's free</li>
				</ul>
				<a href="https://itunes.apple.com/ru/app/coldcrypto/id1447853999?l=en&mt=8"><div class="btn-appstore"></div></a>
				</div>
				<div class="preview"></div>
			</div>
			<div class="actions-group slide-wrapper">
				<h4>Sign in to your wallet below</h4>
				<div class="actions">
					<router-link to="/login">
						<button class="btn btn-primary" data-cy="login-qr">Airplane</button>
					</router-link>
					<router-link to="/webrtc">
						<button class="btn btn-secondary" data-cy="login-webrtc">Online</button>
					</router-link>
				</div>
			</div>
			</div>
			<div class="slide-2">
			<div class="slide-wrapper">
				<div class="slide-header">
				<h2>Online Mode</h2>
				<div class="content-label">
					<div class="label-label-img secure"></div>
					<span>Secure P2P connection</span>
				</div>
				</div>
				<div class="slide-pic"></div>
			</div>
			</div>
			<div class="slide-3">
			<div class="slide-wrapper">
				<div class="slide-header">
				<h2>Offline Mode</h2>
				</div>
				<div class="slide-pic"></div>
			</div>
			</div>
			<div class="info-block">
			<div class="info-block-wrapper">
				<div class="info-pic"></div>
				<div class="info-content">
				<div class="info-header">
					Currently Cold Crypto is only avaliable on iOS
				</div>
				<div class="info-data">
					<span>
					To start using Cold Crypto please download
					<a href="#">Here</a>
					</span>
					<span>
					And then download the Cold Crypto app
					<a href="#">Here</a>
					</span>
				</div>
				</div>
			</div>
			</div>
		</main>
		<footer>
			<div class="wrapper">
			<div class="copy">The project by DUCATUR</div>
			<nav>
				<a
					v-for="link in links"
					:href="link.href"
					:key="link.text"
				>{{ link.text }}</a>
			</nav>
			</div>
		</footer>
	</body>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { reset } from 'src/webrtcsingleton'

export default Vue.extend({
	data()
	{
		return {
			links: [
				{ text: 'GitHub', href: 'https://github.com/DucaturFw/cold-crypto-web/issues' },
				{ text: 'Privacy policy', href: 'https://duxi.io/cold/COLDCRYPTO_PRIVACY_POLICY.pdf' },
				{ text: 'Terms of Use', href: 'https://duxi.io/cold/COLDCRYPTO_TERMS_OF_USE.pdf' },
			]
		}
	},
	beforeMount()
	{
		reset(true)
	}
})
</script>

<style lang="scss" scoped>

header {
  background: #FFFFFF;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,0.10);
  z-index: 2;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

header .wrapper {
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;
  align-items: center;
  max-width: 55rem;
  min-width: 12rem;
  width: 100vw;
}

header .logo {
  flex-basis: 50%;
  height: 4rem;
  position: relative;
  display: flex;
  align-items: center;
}

header .logo > img {
  max-height: 5rem;
  min-height: 3rem;
}

nav {
  display: flex;
  justify-content: flex-end;
  flex-basis: 50%;
}

nav > a {
  color: #3F83FE;
  text-decoration: none;
  padding: 0 1vw;
  text-align: center;
}

h1 {
  font-weight: normal;
  font-size: 2.64rem;
  color: #3F83FE;
  line-height: 3.34rem;
  text-transform: uppercase;
  letter-spacing: -.14rem;
  margin: 2rem 0 1rem 0;
}

h2 {
  color: #3F83FE;
  font-size: 3rem;
  text-transform: uppercase;
  font-weight: normal;
}

h4 {
  font-size: 1.8rem;
  text-transform: uppercase;
  color: #2C99ED;
}

h5 {
  font-size: 1.6rem;
  color: #1FAAFE;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
}

.slide-wrapper {
  width: 100vw;
  max-width: 55rem;
  min-width: 12rem;
  display: flex;
  justify-content: center;
}

.slide-1 {
  background: url('../../static/img/main_bg.svg') no-repeat top center;
  background-size: cover;
  width: 100vw;
  height: 95vh;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-1 .slide-wrapper {
  justify-content: center;
}

.slide-1 .content {
  padding-left: 1rem;
}

.slide-1 .btn-appstore {
	background: url("../../static/img/btn_appstore.svg") no-repeat center right;
	background-size: contain;
	width: 10rem;
	height: 4rem;
}

.slide-1 .preview {
  background: url("../../static/img/main_phone.svg") no-repeat center right;
  background-size: contain;
  width: 50vw;
  height: 60vh;
}

.slide-1 .actions-group {
  margin-top: .5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-1 .actions-group .actions {
  display: flex;
}

ul {
  font-size: .85rem;
  margin: 0;
  padding-left: 1rem;
}

ul > li {
  margin: .5rem 0;
  list-style: none;
}

ul > li:before {
  content: "";
  position: absolute;
  background: url("../../static/img/list_circle.svg") no-repeat;
  width: 1rem;
  height: 1rem;
  margin-left: -1rem;
  margin-top: .2rem;
}

.btn {
  font-size: 1rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 0;
  margin: 0 .5rem;
}

.btn-primary {
  background: #2C99ED;
  color: #FFFFFF;
}

.btn-secondary {
  background: #FFFFFF;
  border: 2px solid #2C99ED;
  color: #2C99ED;
}

.slide-2 {
  width: 100vw;
  height: 95vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-2 .slide-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-2 .slide-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 96vw;
  max-width: 55rem;
  min-width: 12rem;
}

.slide-2 .slide-pic {
  background: url('../../static/img/slide_2.svg') no-repeat center center;
  background-size: contain;
  width: 80vw;
  height: 90vh;
}

.slide-2 .content-label {
  font-size: 1.6rem;
  color: #2C99ED;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-2 .content-label .label-label-img {
  background: url("../../static/img/shield.svg") no-repeat;
  background-size: contain;
  width: 2.8rem;
  height: 3.2rem;
  margin-right: 1rem;
}

.slide-3 {
  background: url('../../static/img/slide_3_bg.svg') no-repeat top center;
  background-size: cover;
  width: 100vw;
  height: 95vh;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 1rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-3 .slide-wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.slide-3 .slide-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 96vw;
  max-width: 55rem;
  min-width: 12rem;
}

.slide-3 .slide-pic {
  background: url('../../static/img/slide_3_pic.svg') no-repeat center center;
  background-size: contain;
  width: 80vw;
  height: 90vh;
}

.info-block {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.info-block-wrapper {
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;
  align-items: center;
  max-width: 55rem;
  min-width: 12rem;
}

.info-block .info-pic {
  background: url('../../static/img/info_pic.svg') no-repeat;
  background-size: contain;
  width: 6rem;
  height: 6rem;
  margin-right: 1rem;
}

.info-block .info-header {
  font-size: 1.2rem;
  line-height: 2rem;
  color: #4A4A4A;
  text-transform: uppercase;
}

.info-block .info-data {
  display: flex;
  flex-flow: column nowrap;
  line-height: 1.34rem;
  color: #9B9B9B;
}

.info-block .info-data a {
  color: #2C99ED;
  line-height: 1.6rem;
  text-decoration: none;
}

.info-block .info-data a:after {
  content: "";
  position: absolute;
  background: url("../../static/img/link_ico.svg") no-repeat;
  width: 1rem;
  height: 1rem;
  margin-top: .35rem;
  margin-left: .25rem;
}

footer {
  background: #FFFFFF;
  box-shadow: 0 0 30px 0 rgba(0,0,0,.1);
  z-index: 2;
  margin-top: 2rem;
  padding: 1rem 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

footer .copy {
  flex-basis: 50%;
}

footer .wrapper {
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;
  align-items: center;
  max-width: 55rem;
  min-width: 12rem;
  width: 100vw;
}

</style>