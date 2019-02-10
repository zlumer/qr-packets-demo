import VueRouter, { NavigationGuard } from "vue-router"

import Landing from "./pages/Landing.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"
import Wallet from "./pages/Wallet.vue"
import Pay from "./pages/Pay.vue"
import Instant0x from "./pages/Instant0x.vue"
import TransferHoc from "./pages/blockchain/TransferHoc.vue"
import EthTokens from "./pages/blockchain/EthTokens.vue"
import PushTxVue from "./pages/PushTx.vue"
import WebrtcVue from "./pages/Webrtc.vue"

import { Store } from "./store"
import { ILayoutName } from "./layouts"
import { IBlockchainSymbol } from "./store/interop"
import config from "./config"
import { getQueryString } from "./router-tools"

const BASE_PATH = config.basePath

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
		// console.log(to)
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
			{ path: '/', component: Landing, meta: metaLayout('default') },
			{ path: '/login', component: Login, meta: metaLayout('home') },
			{ path: '/webrtc', component: WebrtcVue, meta: metaLayout('home') },
			{ path: '/wallets', component: Wallets, meta: metaLayout('default') },
			{
				path: '/pay/:blockchain',
				component: Pay,
				meta: metaLayout('home'),
				beforeEnter: updateWallet,
			},
			{
				path: '/subw/:action',
				beforeEnter: (to, from, next) =>
				{
					let w = store.state.currentWallet || store.state.wallets[0]
					// console.log(`current wallet: `, store.state.currentWallet)
					// console.log(`wallets: `, store.state.wallets)
					if (!w.address)
						/* console.log('no address wallet'), */ w = store.state.wallets.filter(x => x.blockchain == w.blockchain)[0]
					
					// console.log(`ENTERING /subw:`, to, w)
					if (!w)
						return next({
							path: '/login',
							query: {
								redirect: `/subw/${to.params.action}${getQueryString(to)}`
							}
						})
					
					next({
						path: `/wallet/${w.blockchain}/${w.address}/${to.params.action}${getQueryString(to)}`
					})
				}
			},
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
			{
				path: '/0xinstant',
				name: '0xinstant',
				component: Instant0x,
				meta: metaLayout('default'),
			},
		]
	})
	router.beforeEach(beforeEach)
	return router
}