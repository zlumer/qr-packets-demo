<template>
	<div>
		<div v-if="zrxLoaded">
			0x Instant Works!
		</div>
		<div v-else>
			Loading 0x Instant UI...
		</div>
		<button @click="renderZrx()">render</button>

		<div id="zrx" />
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { Provider } from 'web3/providers'

interface ZRXInstantRenderProps
{
	orderSource: string
	/**
	 * An instance of an Ethereum provider. If none is provided, 0x instant will try to grab the injected provider if one exists, otherwise it will suggest the user to install MetaMask
	 */
	provider?: Provider
	walletDisplayName?: string // A display string for the wallet you are connected to. Defaults to our best guess (i.e. MetaMask, Coinbase Wallet) but should be provided if a custom provider is supplied as an optional config.
	availableAssetDatas?: string[] // An array of assetDatas that can be purchased through Instant. Defaults to all token pairs from orderSource. Will throw an error if empty.
	defaultSelectedAssetData?: string // The asset that should be opened by default. If this is not provided, Instant will show "Select Token" if there are multiple availableAssetDatas.
	defaultAssetBuyAmount?: number // Pre-fill the amount of tokens to purchase. Defaults to 0.
	additionalAssetMetaDataMap?: { [key: string]: unknown } // An object with keys that are assetData strings and values that are objects that adhere to the AssetMetaData schema. The values represent the meta data for that asset. There is an internal mapping for popular tokens that cannot be overriden and only appended to using this configuration option.
	networkId?: string | number // Id of Ethereum network to connect to. Defaults to 1 (mainnet).
	/**
	 * An object specifying what % ETH fee should be added to orders and where the fee should be sent. Max feePercentage is .05
	 */
	affiliateInfo?: {
		feeRecipient: string
		feePercentage: number
	}
	shouldDisableAnalyticsTracking?: boolean // An option to turn on / off analytics used to make Instant a better experience. Defaults to false.
}
interface ZRXInstant
{
	GIT_SHA: string //"2b64661c61eaedffe5debfdf1aa4210dcdb02f52"
	NPM_VERSION: string // "1.0.8"
	assetDataForERC20TokenAddress(e: unknown): unknown
	hasLiquidityForAssetDataAsync(e: unknown, t: unknown, r: unknown, n: unknown): unknown
	hasMetaDataForAssetData(e: unknown): unknown
	render(opts: ZRXInstantRenderProps, elementSelector: string): unknown
}
declare let zeroExInstant: ZRXInstant
let chainId = 1

export default Vue.extend({
	data: function()
	{
		return {
			zrxLoaded: false
		}
	},
	mounted()
	{
		let zrxScript = document.createElement('script')
		zrxScript.onload = () => this.hasLoaded()
		zrxScript.setAttribute('src', 'https://instant.0x.org/instant.js')
		document.head.appendChild(zrxScript)
	},
	computed: {
		eth: function()
		{
			return this.$store.getters.blockchains.eth(chainId)
		},
		provider: function()
		{
			return this.eth.web3.web3.currentProvider
		},
	},
	methods: {
		hasLoaded()
		{
			let zrx = (window as any).zeroExInstant
			this.zrxLoaded = !!zrx
			return !!zrx
		},
		renderZrx()
		{
			if (!this.hasLoaded())
				console.error(`Couldn't load 0x Instant library!`) //throw new Error("Couldn't load 0x Instant library!")
			
			let provider = this.provider

			zeroExInstant.render({
				orderSource: 'https://api.radarrelay.com/0x/v2/',
				networkId: chainId,
				walletDisplayName: 'Cold Crypto',
				provider: {
					async send(payload, callback)
					{
						console.log('provider send!')
						console.log(payload, callback)
						const respond = (result: any) =>
						{
							let resp = { jsonrpc: '2.0', id: payload.id, result }
							if (callback)
								callback(undefined as any, resp)
							
							return Promise.resolve(resp)
						}
						if (payload.method == 'eth_accounts')
						{
							return respond(['0xc94770007dda54cF92009BFF0dE90c06F603a09f'])
						}
						
						if (payload.method == 'eth_sendTransaction')
						{
							let txHash = ''
							return respond(txHash)
						}

						return provider.send(payload, callback)
					}
				}
			}, 'div#zrx')
		}
	}
})
</script>

<style lang="scss" scoped>

</style>