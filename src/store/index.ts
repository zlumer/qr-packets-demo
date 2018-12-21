import Vuex, { Store } from "vuex"

import { IWallet } from "./interop"
import { StoreOptions, Dispatcher, Mutator } from "./vuex-type-ext"

export function createStore()
{
	return new Vuex.Store<IState>({
		state: {
			wallets: [],
			currentWallet: null,
			webrtc: {
				outgoingId: 1,
				connected: false
			}
		},
		mutations: {
			setWalletList: (state, payload) =>
			{
				console.log(`SET_WALLET_LIST: `, payload)
				state.wallets = payload.wallets
			},
			setCurrentWallet: (state, payload) => state.currentWallet = payload.wallet,
			webrtcIncId: state => state.webrtc.outgoingId++,
			webrtcResetId: state => state.webrtc.outgoingId = 1,
			webrtcConnected: state => state.webrtc.connected = true,
			webrtcDisconnected: state => state.webrtc.connected = false,
		},
		actions: {
			webrtcConnected(store)
			{
				store.commit('webrtcConnected', undefined)
			},
			webrtcDisconnected(store)
			{
				store.commit('webrtcDisconnected', undefined)
				store.commit('webrtcResetId', undefined)
			}
		}
	} as StoreOptions<IState, MutationPayloadMap, ActionPayloadMap>)
}

export type Store = Dispatcher<ActionPayloadMap> & Mutator<MutationPayloadMap> & {
	readonly state: IState
	readonly getters: any
}

export interface IState
{
	wallets: IWallet[]
	currentWallet: IWallet | null
	webrtc: {
		outgoingId: number
		connected: boolean
	}
}

type MutationPayloadMap = {
	setWalletList: { wallets: IWallet[] }
	setCurrentWallet: { wallet: IWallet }
	webrtcIncId: undefined
	webrtcResetId: undefined
	webrtcConnected: undefined
	webrtcDisconnected: undefined
}

type ActionPayloadMap = {
	webrtcConnected: undefined
	webrtcDisconnected: undefined
	/* 'loadFoo': {
		id: string
	},
	'loadBar': {
		id: number;
	} */
}
