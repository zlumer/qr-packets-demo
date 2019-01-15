import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import { IBlockchainSymbol, IWallet } from "./interop"
import { TypedBlockchains, typedBlockchains } from "src/blockchains"
import { IBlockchain } from "src/blockchains/IBlockchain"

export const options: SOptions = {
	state: {
		wallets: [],
		currentWallet: null,
		txToPush: null,
		webrtc: {
			outgoingId: 1,
			connected: false
		},
	},
	getters: {
		txHash: (state, getters) => (tx, bc) =>
		{
			return getters.blockchains[bc](state.currentWallet!.chainId).getTxHash(tx)
		},
		txToPushHash: (state, getters) =>
		{
			let tx = state.txToPush
			if (!tx)
				return undefined
			
			return getters.txHash(tx.tx, tx.wallet.blockchain)
		},
		blockchains: (state, getters) => typedBlockchains,
		currentBlockchain: (state, getters) => getters.blockchains[state.currentWallet!.blockchain](state.currentWallet!.chainId)
	},
	mutations: {
		setWalletList: (state, payload) =>
		{
			console.log(`SET_WALLET_LIST: `, payload)
			state.wallets = payload.wallets
		},
		setCurrentWallet: (state, payload) => state.currentWallet = payload.wallet,
		setTxToPush: (state, payload) => state.txToPush = payload,
		resetTxToPush: state => state.txToPush = null,
		webrtcIncId: state => state.webrtc.outgoingId++,
		webrtcResetId: state => state.webrtc.outgoingId = 1,
		webrtcConnected: state =>
		{
			console.log('MUTATION: webrtcConnected')
			state.webrtc.connected = true
		},
		webrtcDisconnected: state => state.webrtc.connected = false,
	},
	actions: {
		webrtcConnected(store)
		{
			store.commit('webrtcConnected')
		},
		webrtcDisconnected(store)
		{
			store.commit('webrtcDisconnected')
			store.commit('webrtcResetId')
		},
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>

export interface IState
{
	wallets: IWallet[]
	currentWallet: IWallet | null
	txToPush: {
		tx: string
		wallet: IWallet
	} | null
	webrtc: {
		outgoingId: number
		connected: boolean
	}
}

type MutationPayloadMap = {
	setWalletList: { wallets: IWallet[] }
	setCurrentWallet: { wallet: IWallet }

	setTxToPush: { tx: string, wallet: IWallet }
	resetTxToPush: undefined

	webrtcIncId: undefined
	webrtcResetId: undefined
	webrtcConnected: undefined
	webrtcDisconnected: undefined
}

type ActionPayloadMap = {
	webrtcConnected: undefined
	webrtcDisconnected: undefined
}

type GettersReturnMap = {
	txHash: (tx: string, blockchain: IBlockchainSymbol) => string
	txToPushHash?: string
	blockchains: TypedBlockchains,
	currentBlockchain: IBlockchain<unknown, unknown>
}