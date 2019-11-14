<template>
	<div>
		<div v-if="zrxLoaded">
			
		</div>
		<div v-else>
			Loading 0x Instant UI...
		</div>
		<!-- <button @click="renderZrx()">render</button> -->

		<div v-if="loginProcess" class="hint-item">{{ subheader }}</div>
		<remote-call
			v-if="command"
			qr-width="350px"
			:id="2"
			:method="command.method"
			:params="command.params"
			:two-step="true"
			@result="onRemoteResponse"
		/>
		<div id="zrx" v-show="!command && !loadingNonce"/>
		<div v-if="loadingNonce">
			Preparing transaction (loading nonce)...
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import { Provider } from 'web3/providers'
import RemoteCall from 'src/components/RemoteCall.vue'
import { IWallet } from 'src/store/interop'
import { appName } from 'src/multiproj'

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
			zrxLoaded: false,
			loadingNonce: false,
			cachedAddresses: [] as string[],
			command: null as null | {
				method: string,
				params: string,
				callback: (result: unknown) => void
			},
		}
	},
	mounted()
	{
		let zrxScript = document.createElement('script')
		zrxScript.onload = () => (this.hasLoaded(), this.renderZrx())
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
		loginProcess: function()
		{
			return this.command && (this.command.method == 'getWalletList')
		},
		subheader: function() {
			return 'Scan this QR code with ' + appName + ' mobile app to login'
		}
	},
	methods: {
		hasLoaded()
		{
			let zrx = (window as any).zeroExInstant
			this.zrxLoaded = !!zrx
			return !!zrx
		},
		onRemoteResponse(result: unknown)
		{
			if (this.command)
				this.command.callback(result)
			else
				console.error(`Instant0x: scanned QR code when no callback is available! ${JSON.stringify(result)}`)
			
			this.command = null
		},
		renderZrx()
		{
			if (!this.hasLoaded())
				console.error(`Couldn't load 0x Instant library!`) //throw new Error("Couldn't load 0x Instant library!")
			
			let provider = this.provider
			let vueComp = this

			zeroExInstant.render({
				orderSource: 'https://api.radarrelay.com/0x/v2/',
				networkId: chainId,
				walletDisplayName: 'Ice Wallet',
				provider: {
					async send(payload, callback)
					{
						console.log('provider send!')
						console.log(payload, callback)
						const respond = <T>(result: T) =>
						{
							let resp = { jsonrpc: '2.0', id: payload.id, result }
							if (callback)
								callback(undefined as any, resp)
							
							return Promise.resolve(resp)
						}
						if (payload.method == 'eth_accounts')
						{
							// console.log(`Instant0x: eth_accounts() / cached: `, vueComp.cachedAddresses)

							if (vueComp.cachedAddresses.length)
								return respond(vueComp.cachedAddresses)
							
							return new Promise((res, rej) =>
							{
								vueComp.command = {
									method: `getWalletList`,
									params: `[["eth"]]`,
									callback: result =>
									{
										let wallets = result as IWallet[]
										let addresses = wallets
											// .filter(x => parseInt(x.chainId + "") == chainId) // turned off for a while
											.map(x => x.address.toLowerCase())
										
										vueComp.cachedAddresses = addresses
										// console.log(`Instant0x: cachedAddresses set to: `, vueComp.cachedAddresses)

										res(respond<string[]>(addresses))
									}
								}
							})
						}
						
						if (payload.method == 'eth_sendTransaction')
						{
							return new Promise((res, rej) =>
							{
								let msg = payload.params[0] as {
									data: "0x18978e8200000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000821ab0d4414980000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000003c000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000dae9bf0e5b961b8eef35bc501ca196114c59570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a258b39954cef5cb142fd567a46cddb31a6701240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030ca024f987b9000000000000000000000000000000000000000000000000000000cb365104eaa2c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005c5ae7b6000000000000000000000000000000000000000000000000000000005c5ae691000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000024f47261b00000000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000421b3087109254f6b98dc6b1b930d9332e64df239c1d40a9494a856b819ebe2229797cfcb7d4a20db8369bce94fbf7c404f74b84c8ae76d4095c71796ebbc8e098c2030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
									from: "0x873375ac5181d80404a330c97f08704273b3b865"
									gas: "0x39d1b"
									gasPrice: "0x11e1a3000"
									to: "0x5468a1dc173652ee28d249c271fa9933144746b1"
									value: "0x21de62d6271b200"
								}
								let methodStamp = msg.data.replace('0x', '').substr(0, 8)
								let dataArgs = msg.data.replace('0x', '').substr(8)
								
								vueComp.loadingNonce = true

								vueComp.eth.web3.getNonce(msg.from).then(nonce =>
								{
									vueComp.loadingNonce = false
									
									let abiArgs = [dataArgs]

									vueComp.command = {
										method: 'signContractCall',
										params: JSON.stringify({
											wallet: {
												address: msg.from,
												blockchain: 'eth',
												chainId,
											},
											tx: {
												...msg,
												nonce,
												gas: undefined,
												gasLimit: msg.gas,
											},
										}),
										callback: result =>
										{
											let signedTx = result as string
											console.log(`0x instant: got signed tx ${signedTx}`)
											// return res(respond('0x298a400024aecc13bac2801876dd7b4b0d9f984e6bf40905611e544fcbe7d2fb'))

											vueComp.eth.pushTx(signedTx).then(txHash =>
											{
												return res(respond(txHash))
											})
										}
									}
								})

								// let txHash = ''
								// return respond(txHash)
							})
						}

						return provider.send(payload, callback)
					}
				}
			}, 'div#zrx')
		}
	},
	components: {
		RemoteCall,
	}
})
</script>

<style lang="scss" scoped>

.hint-item {
	justify-content: space-around;
    display: flex;
    -webkit-box-pack: justify;
    width: 100%;
	margin-bottom: 20px;
}

</style>