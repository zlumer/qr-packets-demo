import Vue from "src/vue-ts"
import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import { IEGSResponse, loadGasPrice as loadEgs } from "src/blockchains/ethgasstation"
import { IECResponse, loadGasPrice as loadEc } from "src/blockchains/etherchain"
import { Store as MainStore } from "./"
import { defaultChainIds } from "src/blockchains"
import { utils } from "src/blockchains/eth"

export const options: SOptions = {
	state: {
		ethGas_ec: undefined,
		ethGas_egs: undefined,
		ethGas_web3: undefined,
	},
	getters: {
		ethGas_gweiPrices(state, getters)
		{
			if (!state.ethGas_ec && !state.ethGas_egs && !state.ethGas_web3)
				return []
			
			let prices = []
			if (state.ethGas_ec)
				prices.push(...[state.ethGas_ec.safeLow, state.ethGas_ec.standard, state.ethGas_ec.fast, state.ethGas_ec.fastest].map(parseFloat))
			if (state.ethGas_egs)
				prices.push(...[state.ethGas_egs.safeLow, state.ethGas_egs.average, state.ethGas_egs.fast, state.ethGas_egs.fastest].map(x => x / 10))
			if (state.ethGas_web3)
				prices.push(parseFloat(utils.fromWei(state.ethGas_web3, 'gwei')))
			
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
		ethGas_setWeb3(s, { gas })
		{
			Vue.set(s, 'ethGas_web3', gas)
		}
	},
	actions: {
		async ethGas_updatePrices(store)
		{
			store.getters.blockchains.eth(defaultChainIds.eth).web3.web3.eth.getGasPrice()
				.then(gas => store.commit('ethGas_setWeb3', { gas: gas + "" }))
				.catch(err => console.error(err))
			loadEc()
				.then(ec => store.commit('ethGas_setEc', { info: ec }))
				.catch(err => console.error(err))
			loadEgs()
				.then(egs => store.commit('ethGas_setEgs', { info: egs }))
				.catch(err => console.error(err))
		}
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap, MainStore>

export interface IState
{
	ethGas_egs?: IEGSResponse
	ethGas_ec?: IECResponse
	ethGas_web3?: string
}

type MutationPayloadMap = {
	ethGas_setEgs: { info: IEGSResponse }
	ethGas_setEc: { info: IECResponse }
	ethGas_setWeb3: { gas: string }
}

type ActionPayloadMap = {
	ethGas_updatePrices: void
}

type GettersReturnMap = {
	ethGas_gweiPrices: number[]
}