import Vuex, { Store } from "vuex"

import { StoreOptions, MergeMultiple, Merge, Merge3 } from "./vuex-type-ext"

import { options as cmc, Store as StoreCMC, IState as StateCMC } from "./coinmarketcap"
import { options as main, Store as StoreMain, IState as StateMain } from "./main"
import { options as ethTxs, Store as StoreEthTxs, IState as StateEthTxs } from "./ethTxs"

export function createStore()
{
	return new Vuex.Store<IState>(mergeOptions(cmc, main, ethTxs))
}

export type Store = Merge3<StoreCMC, StoreMain, StoreEthTxs>
export type IState = Merge3<StateCMC, StateMain, StateEthTxs>



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
