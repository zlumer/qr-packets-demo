import Vuex, { Store } from "vuex"

import { StoreOptions, MergeMultiple, Merge } from "./vuex-type-ext"

import { options as cmc, Store as StoreCMC, IState as StateCMC } from "./coinmarketcap"
import { options as main, Store as StoreMain, IState as StateMain } from "./main"
import { options as ethTxs, Store as StoreEthTxs, IState as StateEthTxs } from "./ethTxs"
import { options as ethTokens, Store as StoreEthTokens, IState as StateEthTokens } from "./ethTokens"
import { options as eosTokens, Store as StoreEosTokens, IState as StateEosTokens } from "./eosTokens"
import { options as ethGasPrice, Store as StoreEthGasPrice, IState as StateEthGasPrice } from "./ethGasPrice"

export const storeOptions = mergeOptions(cmc, main, ethTxs, ethTokens, mergeOptions(ethGasPrice, eosTokens))

export function createStore()
{
	let store = new Vuex.Store<IState>(storeOptions)
	return store
}

export type Store = MergeMultiple<StoreCMC, StoreMain, StoreEthTxs, StoreEthTokens,
					MergeMultiple<StoreEthGasPrice, StoreEosTokens>>
export type IState = MergeMultiple<StateCMC, StateMain, StateEthTxs, StateEthTokens,
					MergeMultiple<StateEthGasPrice, StateEosTokens>>



type SOU = StoreOptions<unknown, unknown, unknown, unknown>
function mergeOptions2<T extends SOU, U extends SOU>(opts1: T, opts2: U): Merge<T, U>
{
	return Object.keys(opts1).concat(Object.keys(opts2)).map(key => [key, {
		...opts1[key as keyof typeof opts1],
		...opts2[key as keyof typeof opts2]
	}]).reduce((prev, [key, val]) => ({ ...prev, [key as keyof Merge<T,U>]: val } as Merge<T,U>), {} as Merge<T,U>)
}
function mergeOptions<T1 extends SOU, T2 extends SOU, T3 extends SOU, T4 extends SOU, T5 extends SOU>
	(...opts:[T1,T2?,T3?,T4?,T5?]): MergeMultiple<T1, T2, T3, T4, T5>
{
	//@ts-ignore
	return opts.reduce((prev, cur) => mergeOptions2(prev, cur), opts[0])
}
