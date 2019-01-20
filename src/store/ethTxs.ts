import { StoreOptions, Store as IStore, ReadonlyCascade } from "./vuex-type-ext"
import { IWallet } from "./interop"
import { calcWalletId } from "./utils"
import { Store as MainStore } from "./"
import { IEthTxHistoryItem as ITx } from "src/blockchains/eth-chains"
import Vue from "src/vue-ts"

function defaultStatus(): TWalletStatus
{
	return { loading: false, txs: null, error: undefined }
}
function mutateWallet(state: IState, wallet: IWallet, update: Partial<Readonly<TWalletStatus>>)
{
	let id = calcWalletId(wallet)
	if (!state.txLists[id])
		Vue.set(state.txLists, id, defaultStatus())
	
	Object
		.keys(update)
		.map(x => x as keyof typeof update)
		.forEach(key => Vue.set(state.txLists[id], key, update[key]))
}
function getStatus(state: ReadonlyCascade<IState>, wallet: IWallet)
{
	let id = calcWalletId(wallet)
	return state.txLists[id] || defaultStatus()
}

export const options: SOptions = {
	state: {
		txLists: {}
	},
	getters: {
		ethtx_getTxs: state => wallet => getStatus(state, wallet).txs,
		ethtx_hasError: state => wallet => getStatus(state, wallet).error,
		ethtx_isLoading: state => wallet => getStatus(state, wallet).loading,
	},
	mutations: {
		ethtx_setLoading: (state, payload) => mutateWallet(state, payload.wallet, { loading: payload.loading }),
		ethtx_setTxs: (state, payload) => mutateWallet(state, payload.wallet, { txs: payload.txs }),
		ethtx_error: (state, payload) => mutateWallet(state, payload.wallet, { error: payload.error }),
	},
	actions: {
		ethtx_softUpdateTxs: async (store, payload) =>
		{
			if (store.getters.ethtx_isLoading(payload.wallet))
				return
			
			store.commit('ethtx_error', { ...payload }) // clear error message
			store.commit('ethtx_setLoading', { ...payload, loading: true })
			try
			{
				let txs = await store.getters.blockchains.eth(payload.wallet.chainId).loadTxList(payload.wallet)
				txs.map(x => x.from)
				store.commit('ethtx_setTxs', { ...payload, txs })
				store.commit('ethtx_setLoading', { ...payload, loading: false })
			}
			catch (error)
			{
				store.commit('ethtx_error', { ...payload, error })
			}
		},
		ethtx_hardUpdateTxs: async (store, payload) =>
		{
			if (store.getters.ethtx_isLoading(payload.wallet))
				return
			
			store.commit('ethtx_setTxs', { ...payload, txs: null })
			await store.dispatch("ethtx_softUpdateTxs", payload)
		}
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap, MainStore>

type TWalletStatus = {
	// lastUpdated: number
	loading: boolean
	error?: Error | string
	txs: ITx[] | null
}

export interface IState
{
	txLists: {
		[walletKey: string]: TWalletStatus
	}
}

type MutationPayloadMap = {
	ethtx_setLoading: { wallet: IWallet, loading: boolean }
	ethtx_setTxs: { wallet: IWallet, txs: ITx[] | null }
	ethtx_error: { wallet: IWallet, error?: Error | string }
}

type ActionPayloadMap = {
	ethtx_softUpdateTxs: { wallet: IWallet }
	ethtx_hardUpdateTxs: { wallet: IWallet }
}

type GettersReturnMap = {
	ethtx_getTxs: (wallet: IWallet) => ReadonlyArray<ITx> | null
	ethtx_hasError: (wallet: IWallet) => Error | string | undefined
	ethtx_isLoading: (wallet: IWallet) => boolean
}