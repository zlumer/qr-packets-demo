import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import { IBlockchainSymbol, IWallet } from "./interop"
import { TypedBlockchains, typedBlockchains, defaultChainIds } from "src/blockchains"
import { IBlockchain } from "src/blockchains/IBlockchain"
import { calcWalletId, pick } from "./utils"

export const options: SOptions = {
	state: {
		wallets: [],
		currentWallet: null,
		currentChain: null,
		txToPush: null,
		webrtc: {
			outgoingId: 1,
			connected: false
		},
	},
	getters: {
		calcWalletId: (state, getters) => wallet => calcWalletId(wallet),
		txHash: (state, getters) => (tx, bc, chainId) =>
		{
			if (typeof chainId === 'undefined')
				chainId = (state.currentChain && state.currentChain.blockchain == bc) ? state.currentChain.chainId : defaultChainIds[bc]

			return getters.blockchains[bc](chainId).getTxHash(tx)
		},
		txToPushHash: (state, getters) =>
		{
			let tx = state.txToPush
			if (!tx)
				return undefined
			
			return getters.txHash(tx.tx, tx.wallet.blockchain, tx.wallet.chainId)
		},
		blockchains: (state, getters) => typedBlockchains,
		currentBlockchain: (state, getters) => state.currentChain ? getters.blockchains[state.currentChain.blockchain](state.currentChain.chainId) : null,
	},
	mutations: {
		setWalletList: (state, payload) =>
		{
			console.log(`SET_WALLET_LIST: `, payload)
			state.wallets = payload.wallets
		},
		setCurrentWallet: (state, payload) =>
		{
			state.currentWallet = payload.wallet
			
			if (!payload.wallet)
				return state.currentChain = null
			
			if (!payload.wallet.chainId)
				state.currentWallet.chainId = defaultChainIds[payload.wallet.blockchain]
			
			state.currentChain = pick(state.currentWallet, ['blockchain', 'chainId'])
		},
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
	currentChain: {
		blockchain: IBlockchainSymbol
		chainId: string | number
	} | null
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
	calcWalletId: (wallet: IWallet) => string
	txHash: (tx: string, blockchain: IBlockchainSymbol, chainId?: string | number) => string
	txToPushHash?: string
	blockchains: TypedBlockchains,
	currentBlockchain: IBlockchain<unknown, unknown> | null
}