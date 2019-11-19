import { StoreOptions, Store as IStore } from "./vuex-type-ext"

export const options: SOptions = {
	state: {
		btcSkeletonTx: null,
	},
	mutations: {
		btc_setSkeletonTx: (state, payload) =>
		{
			state.btcSkeletonTx = payload.tx
		}
	},
	actions: {
		
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>

export interface IState
{
	btcSkeletonTx: unknown
}

type MutationPayloadMap = {
	btc_setSkeletonTx: { tx: unknown }
}

type ActionPayloadMap = {
}

type GettersReturnMap = {
}