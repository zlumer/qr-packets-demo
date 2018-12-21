import VueRouter, { NavigationGuard } from "vue-router"

import Index from "./pages/Index.vue"
import Login from "./pages/Login.vue"
import Wallets from "./pages/Wallets.vue"
import Wallet from "./pages/Wallet.vue"
import EthTransfer from "./pages/EthTransfer.vue"
import PushTxVue from "./pages/PushTx.vue"
import WebrtcVue from "./pages/Webrtc.vue"

import { Store } from "./store"

export function createRouter(store: Store)
{
	const updateWallet: NavigationGuard = (to, from, next) =>
	{
		console.log('updating wallet!', to, from, next)
		let blockchain = to.params.blockchain as 'eth'
		let address: string = to.params.address
		let chainId: string = to.query.chainId.toString()
		store.commit('setCurrentWallet', { wallet: { blockchain, address, chainId } })
		next()
	}

	return new VueRouter({
		mode: 'history',
		routes: [
			{ path: '/', component: Index },
			{ path: '/login', component: Login },
			{ path: '/webrtc', component: WebrtcVue },
			{ path: '/wallets', component: Wallets },
			{
				path: '/wallet/:blockchain/:address',
				name: 'wallet',
				component: Wallet,
				children: [
					{
						path: 'create',
						name: 'newtx',
						component: EthTransfer,
					},
				],
				beforeEnter: updateWallet
			},
			{
				path: '/pushtx/:tx',
				name: 'pushtx',
				component: PushTxVue,
				props: true
			}
		]
	})
}