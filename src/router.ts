import VueRouter, { NavigationGuard } from "vue-router"

import Index from "./pages/Index.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"
import Wallet from "./pages/Wallet.vue"
import TransferHoc from "./pages/blockchain/TransferHoc.vue"
import EthTokens from "./pages/blockchain/EthTokens.vue"
import PushTxVue from "./pages/PushTx.vue"
import WebrtcVue from "./pages/Webrtc.vue"

import { Store } from "./store"
import { ILayoutName } from "./layouts"
import { IBlockchainSymbol } from "./store/interop"

declare let ROOT_PATH: string
const BASE_PATH = ROOT_PATH
console.log(`BASE_PATH: ${BASE_PATH}`)

export function createRouter(store: Store)
{
	const updateWallet: NavigationGuard = (to, from, next) =>
	{
		console.log('updating wallet!', to, from, next)
		let blockchain = to.params.blockchain as IBlockchainSymbol
		let address: string = to.params.address
		let chainId: string = (to.query.chainId || "").toString()
		store.commit('setCurrentWallet', { wallet: { blockchain, address, chainId } })
		return next()
	}
	const beforeEach: NavigationGuard = (to, from, next) =>
	{
		if (to.name == 'wallet')
			return updateWallet(to, from, next)
		if (to.matched.some(x => x.name == 'wallet'))
			return updateWallet(to, from, next)
		
		return next()
	}

	function metaLayout(layout: ILayoutName)
	{
		return { layout }
	}

	let router = new VueRouter({
		...(BASE_PATH ? { base: BASE_PATH } : {}),
		mode: 'history',
		routes: [
			{ path: '/', component: Index, meta: metaLayout('home') },
			{ path: '/login', component: Login, meta: metaLayout('home') },
			{ path: '/webrtc', component: WebrtcVue, meta: metaLayout('home') },
			{ path: '/wallets', component: Wallets, meta: metaLayout('default') },
			{
				path: '/wallet/:blockchain/:address',
				name: 'wallet',
				component: Wallet,
				meta: metaLayout('app'),
				children: [
					{
						path: 'create',
						name: 'newtx',
						component: TransferHoc,
						meta: { ...metaLayout('app'), popup: true },
					},
					{
						path: 'erc20',
						name: 'erc20',
						component: EthTokens,
						meta: { ...metaLayout('app'), popup: true },
					},
					{
						path: '/pushtx/:blockchain/:txhash',
						name: 'pushtx',
						component: PushTxVue,
						props: true,
						meta: { ...metaLayout('app'), popup: true },
					}
				],
			},
		]
	})
	router.beforeEach(beforeEach)
	return router
}