import Vue from "src/vue-ts"
import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import * as cmc from "src/blockchains/coinmarketcap"
import { IBlockchainSymbol } from "./interop"

function ensureToken(state: IState, token: string)
{
	if (!state.tokenPrices[token])
		Vue.set(state.tokenPrices, token, { price: NaN, loading: false })
}

export const options: SOptions = {
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
			// console.log(`updateTokenPrice(${JSON.stringify(payload)})`)
			let cmcId = ("cmcId" in payload) ? payload.cmcId : cmc.tickerIds[payload.blockchain]
			// console.log(`updateTokenPrice: cmcId=${cmcId}`)
			
			store.commit('tokenPriceSetLoading', { token: cmcId, loading: true })
			// console.log(`updateTokenPrice: tokenPriceSetLoading ${cmcId}=${true}`)
			try
			{
				let price = await cmc.loadPrice(cmcId)
				// console.log(`updateTokenPrice: price=${price}`)
				store.commit('tokenPriceUpdate', { token: cmcId, price })
				// console.log(`updateTokenPrice: tokenPriceUpdate ${cmcId}=${price}`)
			}
			catch(e)
			{
				console.log(`error while loading token price! cmcId=${cmcId}`)
				console.error(e)
			}
			store.commit('tokenPriceSetLoading', { token: cmcId, loading: false })
			// console.log(`updateTokenPrice: tokenPriceSetLoading ${cmcId}=${false}`)
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
		btcPrice: (state, getters) => getters.getTokenPrice(cmc.tickerIds.btc),
		bchPrice: (state, getters) => getters.getTokenPrice(cmc.tickerIds.bch),
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
	btcPrice: number
	bchPrice: number
}