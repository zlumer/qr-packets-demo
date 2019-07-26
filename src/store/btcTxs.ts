import { StoreOptions, Store as IStore, ReadonlyCascade } from "./vuex-type-ext"
import { IWallet } from "./interop"
import { calcWalletId } from "./utils"
import { Store as MainStore } from "./"
import Vue from "src/vue-ts"
import { IBtcHistoryItem as ITx } from "src/blockchains/btc"

function defaultStatus(): TWalletStatus
{
	return { loading: false, txs: null, error: undefined }
}
function mutateWallet(state: IState, wallet: IWallet, update: Partial<Readonly<TWalletStatus>>)
{
	let id = calcWalletId(wallet)
	if (!state.txListsBtc[id])
		Vue.set(state.txListsBtc, id, defaultStatus())
	
	Object
		.keys(update)
		.map(x => x as keyof typeof update)
		.forEach(key => Vue.set(state.txListsBtc[id], key, update[key]))
}
function getStatus(state: ReadonlyCascade<IState>, wallet: IWallet)
{
	let id = calcWalletId(wallet)
	return state.txListsBtc[id] || defaultStatus()
}

export const options: SOptions = {
	state: {
		txListsBtc: {}
	},
	getters: {
		btctx_getTxs: state => wallet => getStatus(state, wallet).txs,
		btctx_hasError: state => wallet => getStatus(state, wallet).error,
		btctx_isLoading: state => wallet => getStatus(state, wallet).loading,
	},
	mutations: {
		btctx_setLoading: (state, payload) => mutateWallet(state, payload.wallet, { loading: payload.loading }),
		btctx_setTxs: (state, payload) => mutateWallet(state, payload.wallet, { txs: payload.txs }),
		btctx_error: (state, payload) => mutateWallet(state, payload.wallet, { error: payload.error }),
	},
	actions: {
		btctx_softUpdateTxs: async (store, payload) =>
		{
			if (store.getters.btctx_isLoading(payload.wallet))
				return
			
			store.commit('btctx_error', { ...payload }) // clear error message
			store.commit('btctx_setLoading', { ...payload, loading: true })
			try
			{
				let txs = await store.getters.blockchains.btc(payload.wallet.chainId).loadTxList(payload.wallet)
				// txs.map(x => x.)
				store.commit('btctx_setTxs', { ...payload, txs })
				store.commit('btctx_setLoading', { ...payload, loading: false })
			}
			catch (error)
			{
				store.commit('btctx_error', { ...payload, error })
			}
		},
		btctx_hardUpdateTxs: async (store, payload) =>
		{
			if (store.getters.btctx_isLoading(payload.wallet))
				return
			
			store.commit('btctx_setTxs', { ...payload, txs: null })
			await store.dispatch("btctx_softUpdateTxs", payload)
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
	txListsBtc: {
		[walletKey: string]: TWalletStatus
	}
}

type MutationPayloadMap = {
	btctx_setLoading: { wallet: IWallet, loading: boolean }
	btctx_setTxs: { wallet: IWallet, txs: ITx[] | null }
	btctx_error: { wallet: IWallet, error?: Error | string }
}

type ActionPayloadMap = {
	btctx_softUpdateTxs: { wallet: IWallet }
	btctx_hardUpdateTxs: { wallet: IWallet }
}

type GettersReturnMap = {
	btctx_getTxs: (wallet: IWallet) => ReadonlyArray<ITx> | null
	btctx_hasError: (wallet: IWallet) => Error | string | undefined
	btctx_isLoading: (wallet: IWallet) => boolean
}
