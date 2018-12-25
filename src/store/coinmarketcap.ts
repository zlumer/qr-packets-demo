import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import * as cmc from "src/blockchains/coinmarketcap"
import { IBlockchainSymbol } from "./interop"

function ensureToken(state: IState, token: string)
{
	if (!state.tokenPrices[token])
		state.tokenPrices[token] = { price: NaN, loading: false }
}

export const options: StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap> = {
	state: {
		tokenPrices: { }
	},
	mutations: {
		tokenPriceUpdate: (state, payload) =>
		{
			ensureToken(state, payload.token)

			state.tokenPrices[payload.token].price = payload.price
		},
		tokenPriceSetLoading: (state, payload) =>
		{
			ensureToken(state, payload.token)

			state.tokenPrices[payload.token].loading = payload.loading
		},
	},
	actions: {
		async updateTokenPrice(store, payload)
		{
			let cmcId = ("cmcId" in payload) ? payload.cmcId : cmc.tickerIds[payload.blockchain]

			store.commit('tokenPriceSetLoading', { token: cmcId, loading: true })
			let price = await cmc.loadPrice(cmcId)
			store.commit('tokenPriceUpdate', { token: cmcId, price })
			store.commit('tokenPriceSetLoading', { token: cmcId, loading: false })
		}
	},
	getters: {
		getTokenPrice: (state, getters) => (token) =>
		{
			let t = state.tokenPrices[token]
			return t ? t.price : NaN
		},
		eosPrice: (state, getters) => getters.getTokenPrice(cmc.tickerIds.eos),
		ethPrice: (state, getters) => getters.getTokenPrice(cmc.tickerIds.eth),
	}
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>

export interface IState
{
	tokenPrices: {
		[key: string]: {
			loading: boolean
			price: number
		}
	}
}

type MutationPayloadMap = {
	tokenPriceSetLoading: { token: string, loading: boolean }
	tokenPriceUpdate: { token: string, price: number }
}

type ActionPayloadMap = {
	updateTokenPrice: { cmcId: string } | { blockchain: IBlockchainSymbol }
}

type GettersReturnMap = {
	getTokenPrice: (token: string) => number
	ethPrice: number
	eosPrice: number
}