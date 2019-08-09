<template>
	<header>
		<div class="copyright">
			© Ice Wallet 2018. All rights reserved. Version:
			<span class="version"><a :href="commitLink"><code>{{ version }}</code></a></span>
			<div class="api">API by
				<a href="https://etherscan.io/">Etherscan</a>,
				<a href="https://coinmarketcap.com/">CoinMarketCap</a>,
				<a href="https://etherchain.org/">Etherchain</a>,
				<a href="https://ethgasstation.info/">ETH Gas Station</a>,
				<a href="https://bloks.io/">Bloks.io</a>,
				<a href="https://greymass.com/">Greymass</a>.
				Blockchain nodes by
				<a href="https://infura.io/">Infura</a>,
				<a href="https://cryptolions.io/">CryptoLions</a>.
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import config from 'src/config'

export default Vue.extend({
	computed: {
		version: function()
		{
			return config.gitVersion
		},
		commitLink: function()
		{
			let remoteUrl = config.gitRemote
			if (!remoteUrl)
				return '#'
			
			remoteUrl = remoteUrl.replace('git@github.com:', 'https://github.com/')
			remoteUrl = remoteUrl.replace(/\.git$/, '')
			return `${remoteUrl}/tree/${this.version}`
		}
	}
})
</script>


<style lang="scss" scoped>

header {
	height: 4rem;
    grid-area: footer / footer / footer / footer;
}
.copyright {
	color: rgba(255, 255, 255, 0.2);
    font-size: 0.85rem;
    padding-left: 2rem;
}
.copyright a {
	text-decoration-color: none;
	color: inherit;
}

</style>
