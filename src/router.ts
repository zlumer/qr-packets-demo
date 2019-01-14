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

export function createRouter(store: Store)
{
	const updateWallet: NavigationGuard = (to, from, next) =>
	{
		console.log('updating wallet!', to, from, next)
		let blockchain = to.params.blockchain as 'eth'
		let address: string = to.params.address
		let chainId: string = (to.query.chainId || "").toString()
		store.commit('setCurrentWallet', { wallet: { blockchain, address, chainId } })
		next()
	}

	function metaLayout(layout: ILayoutName)
	{
		return { layout }
	}

	return new VueRouter({
		mode: 'history',
		routes: [
			{ path: '/', component: Index, meta: metaLayout('home') },
			{ path: '/login', component: Login, meta: metaLayout('home') },
			{ path: '/webrtc', component: WebrtcVue, meta: metaLayout('home') },
			{ path: '/wallets', component: Wallets, meta: metaLayout('app') },
			{
				path: '/wallet/:blockchain/:address',
				name: 'wallet',
				component: Wallet,
				meta: metaLayout('app'),
				children: [
					{
						path: 'create',
						name: 'newtx',
						component: TransferHoc
					},
					{
						path: 'erc20',
						name: 'erc20',
						component: EthTokens
					}
				],
				beforeEnter: updateWallet
			},
			{
				path: '/pushtx/:blockchain/:txhash',
				name: 'pushtx',
				component: PushTxVue,
				props: true
			}
		]
	})
}