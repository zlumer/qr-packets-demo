import { StoreOptions, Store as IStore, ReadonlyCascade } from "./vuex-type-ext"
import { IWallet } from "./interop"
import { calcWalletId } from "./utils"
import { Store as MainStore } from "./"
import Vue from "src/vue-ts"
import { IBchHistoryItem as ITx } from "src/blockchains/bch"

function defaultStatus(): TWalletStatus
{
	return { loading: false, txs: null, error: undefined }
}
function mutateWallet(state: IState, wallet: IWallet, update: Partial<Readonly<TWalletStatus>>)
{
	let id = calcWalletId(wallet)
	if (!state.txListsBch[id])
		Vue.set(state.txListsBch, id, defaultStatus())
	
	Object
		.keys(update)
		.map(x => x as keyof typeof update)
		.forEach(key => Vue.set(state.txListsBch[id], key, update[key]))
}
function getStatus(state: ReadonlyCascade<IState>, wallet: IWallet)
{
	let id = calcWalletId(wallet)
	return state.txListsBch[id] || defaultStatus()
}

export const options: SOptions = {
	state: {
		txListsBch: {}
	},
	getters: {
		bchtx_getTxs: state => wallet => getStatus(state, wallet).txs,
		bchtx_hasError: state => wallet => getStatus(state, wallet).error,
		bchtx_isLoading: state => wallet => getStatus(state, wallet).loading,
	},
	mutations: {
		bchtx_setLoading: (state, payload) => mutateWallet(state, payload.wallet, { loading: payload.loading }),
		bchtx_setTxs: (state, payload) => mutateWallet(state, payload.wallet, { txs: payload.txs }),
		bchtx_error: (state, payload) => mutateWallet(state, payload.wallet, { error: payload.error }),
	},
	actions: {
		bchtx_softUpdateTxs: async (store, payload) =>
		{
			if (store.getters.bchtx_isLoading(payload.wallet))
				return
			
			store.commit('bchtx_error', { ...payload }) // clear error message
			store.commit('bchtx_setLoading', { ...payload, loading: true })
			try
			{
				let txs = await store.getters.blockchains.bch(payload.wallet.chainId).loadTxList(payload.wallet)
				// txs.map(x => x.)
				store.commit('bchtx_setTxs', { ...payload, txs })
				store.commit('bchtx_setLoading', { ...payload, loading: false })
			}
			catch (error)
			{
				store.commit('bchtx_error', { ...payload, error })
			}
		},
		bchtx_hardUpdateTxs: async (store, payload) =>
		{
			if (store.getters.bchtx_isLoading(payload.wallet))
				return
			
			store.commit('bchtx_setTxs', { ...payload, txs: null })
			await store.dispatch("bchtx_softUpdateTxs", payload)
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
	txListsBch: {
		[walletKey: string]: TWalletStatus
	}
}

type MutationPayloadMap = {
	bchtx_setLoading: { wallet: IWallet, loading: boolean }
	bchtx_setTxs: { wallet: IWallet, txs: ITx[] | null }
	bchtx_error: { wallet: IWallet, error?: Error | string }
}

type ActionPayloadMap = {
	bchtx_softUpdateTxs: { wallet: IWallet }
	bchtx_hardUpdateTxs: { wallet: IWallet }
}

type GettersReturnMap = {
	bchtx_getTxs: (wallet: IWallet) => ReadonlyArray<ITx> | null
	bchtx_hasError: (wallet: IWallet) => Error | string | undefined
	bchtx_isLoading: (wallet: IWallet) => boolean
}
