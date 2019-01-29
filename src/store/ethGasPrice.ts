import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import { IEGSResponse, loadGasPrice as loadEgs } from "src/blockchains/ethgasstation"
import { IECResponse, loadGasPrice as loadEc } from "src/blockchains/etherchain"
import Vue from "src/vue-ts"

export const options: SOptions = {
	state: {
		ethGas_ec: undefined,
		ethGas_egs: undefined
	},
	getters: {
		ethGas_gweiPrices(state, getters)
		{
			if (!state.ethGas_ec || !state.ethGas_egs)
				return []
			
			let prices = []
			if (state.ethGas_ec)
				prices.push(...[state.ethGas_ec.safeLow, state.ethGas_ec.standard, state.ethGas_ec.fast, state.ethGas_ec.fastest].map(parseFloat))
			if (state.ethGas_egs)
				prices.push(...[state.ethGas_egs.safeLow, state.ethGas_egs.average, state.ethGas_egs.fast, state.ethGas_egs.fastest].map(x => x / 10))
			
			return prices
				.filter((val, idx, arr) => arr.indexOf(val) == idx) // remove duplicate values
				.sort((a,b) => a-b) // sort ascending
		}
	},
	mutations: {
		ethGas_setEc(s, { info })
		{
			Vue.set(s, 'ethGas_ec', info)
		},
		ethGas_setEgs(s, { info })
		{
			Vue.set(s, 'ethGas_egs', info)
		},
	},
	actions: {
		async ethGas_updatePrices(store)
		{
			let [ec, egs] = await Promise.all([loadEc(), loadEgs()])
			store.commit('ethGas_setEc', { info: ec })
			store.commit('ethGas_setEgs', { info: egs })
		}
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>

export interface IState
{
	ethGas_egs?: IEGSResponse
	ethGas_ec?: IECResponse
}

type MutationPayloadMap = {
	ethGas_setEgs: { info: IEGSResponse }
	ethGas_setEc: { info: IECResponse }
}

type ActionPayloadMap = {
	ethGas_updatePrices: void
}

type GettersReturnMap = {
	ethGas_gweiPrices: number[]
}