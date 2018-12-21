/**
 * Types for helping make commit and dispatch methods in vuex stores type safe.
 */

/**
 * Type defining the commit method portion of our store.
 */
export type Mutator<TMutationPayloadMap> = {
	commit: <T extends keyof TMutationPayloadMap>(
		mutationType: T,
		payload: TMutationPayloadMap[T]
	) => void;
};

/**
 * Type defining the dispatch method portion of our store.
 */
export type Dispatcher<TActionPayloadMap> = {
	dispatch: <T extends keyof TActionPayloadMap>(
		actionType: T,
		payload: TActionPayloadMap[T]
	) => Promise<any>;
};

/**
 * Type for mapping action type strings to action payloads.
 */
export type ActionDictionary<TActionPayloadMap, TMutationPayloadMap> = {
	[P in keyof TActionPayloadMap]: (
		store: Mutator<TMutationPayloadMap>,
		payload: TActionPayloadMap[P]
	) => void;
};

/**
 * Type for mapping mutation type strings to mutation payloads.
 */
export type MutationDictionary<TState, TMutationPayloadMap> = {
	[P in keyof TMutationPayloadMap]: (state: TState, payload: TMutationPayloadMap[P]) => void;
};

/**
 * Type for options passed to new Vuex.Store()
 */
export type StoreOptions<TState, TMutationPayloadMap, TActionPayloadMap> = {
	state: TState,
	mutations: MutationDictionary<TState, TMutationPayloadMap>,
	actions: ActionDictionary<TActionPayloadMap, TMutationPayloadMap>
};