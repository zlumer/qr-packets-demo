/**
 * Types for helping make commit and dispatch methods in vuex stores type safe.
 * sources:
 * https://gist.github.com/bmingles/8dc0ddcb87aeb092beb5a12447b10a36
 * https://gist.github.com/wonderful-panda/46c072497f8731a2bde28da40e9ea2d7
 */

/**
 * Type defining the commit method portion of our store.
 */
export type Mutator<TMutationPayloadMap> = {
	commit: <T extends keyof TMutationPayloadMap>(
		mutationType: T,
		...payload: OptionalArg<T, TMutationPayloadMap[T]>
	) => void
}

type OptionalArg<T, P> = P extends undefined ? [] : [P]

/**
 * Type defining the dispatch method portion of our store.
 */
export type Dispatcher<TActionPayloadMap> = {
	dispatch: <T extends keyof TActionPayloadMap>(
		actionType: T,
		...payload: OptionalArg<T, TActionPayloadMap[T]>
	) => Promise<any>;
};

/**
 * Type for mapping action type strings to action payloads.
 */
export type ActionDictionary<TActionPayloadMap, TActionContext> = {
	[P in keyof TActionPayloadMap]: (
		store: TActionContext,
		payload: TActionPayloadMap[P],
	) => void;
};

export type ActionContext<
	TState,
	TDispatcher extends Dispatcher<any>,
	TMutator extends Mutator<any>,
	TGetters
	> =
		TDispatcher &
		TMutator &
		{ readonly state: ReadonlyCascade<TState>, readonly getters: ReadonlyCascade<TGetters>, rootGetters?: TGetters, rootState?: TState }

/**
 * Type for mapping mutation type strings to mutation payloads.
 */
export type MutationDictionary<TState, TMutationPayloadMap> = {
	[P in keyof TMutationPayloadMap]: (state: TState, ...payload: OptionalArg<P, TMutationPayloadMap[P]>) => void;
};

export type GettersDictionary<TState, TGettersReturnMap, TExtraGetters = {}> = {
	[P in keyof TGettersReturnMap]: (
		state: ReadonlyCascade<TState>,
		getters: Readonly<TGettersReturnMap & TExtraGetters>
	) => TGettersReturnMap[P]
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type ArrayElement<T> = T extends Array<infer U> ? U : never
type ReadonlyFunction<T extends Function> = T extends (...args: infer ARGS) => infer TRet ? (...args: ARGS) => Readonly<TRet> : never
type primitive = string | number | boolean | undefined | null
type ReadonlyCascade<T> =
	T extends primitive
		? T
	: T extends Function
		? ReadonlyFunction<T>
	: T extends Array<infer U>
		? IfTuple<T, T, ReadonlyArray<Readonly<ArrayElement<T>>>>
	: { readonly [key in keyof T]: ReadonlyCascade<T[key]> }

type WritealsoObj<T> =
	T extends primitive
		? T
	: T extends Readonly<infer U>
		? { [key in keyof U]: WritealsoObj<U[key]> }
	: T

// https://stackoverflow.com/questions/52786547/recursively-setting-a-typescript-type-not-read-only-without-clobbering-tuples
type IfTuple<T extends any[], Y = true, N = false> = "0" extends keyof T ? Y : N

type WriteArray<T> = T extends ReadonlyArray<infer U> ? Array<WritealsoObj<U>> : never
type WriteFunction<T> = T extends (...args: infer ARGS) => infer TRet ? (...args: ARGS) => Writealso<TRet> : never
type Writealso<T> =
	T extends primitive
		? T
	: T extends Readonly<Function>
		? WriteFunction<T>
	: T extends ReadonlyArray<infer U>
		? WriteArray<T>
	: T extends Readonly<infer U>
		? { -readonly [key in keyof T]: Writealso<T[key]> }
	: never

type CommonProps<T1 extends {}, T2 extends {}> = {
	[P in (keyof T1 & keyof T2)]: T1[P] & T2[P]
}
type PropsFrom1<T1 extends {}, T2 extends {}> = {
	[P in Exclude<keyof T1, keyof T2>]: T1[P]
}
type PropsFrom2<T1 extends {}, T2 extends {}> = {
	[P in Exclude<keyof T2, keyof T1>]: T2[P]
}
type Merge<T1 extends {}, T2 extends {}> = CommonProps<T1, T2> & PropsFrom1<T1, T2> & PropsFrom2<T1, T2>

type Merge3<T1, T2, T3> = Merge<T3, Merge<T1, T2>>
type MergeMultiple<T1, T2 = unknown, T3 = unknown, T4 = unknown, T5 = unknown> = Merge3<T1, T2, Merge3<T3, T4, T5>>

export type Store<TState = unknown, TMutationPayloadMap = unknown, TActionPayloadMap = unknown, TGettersReturnMap = unknown> =
	Dispatcher<TActionPayloadMap> & Mutator<TMutationPayloadMap> & {
		readonly state: ReadonlyCascade<TState>
		readonly getters: TGettersReturnMap
	}
	& { readonly __TActionPayloadMap__?: TActionPayloadMap }
/**
 * Type for options passed to new Vuex.Store()
 */

export type StoreOptions<TState = unknown, TMutationPayloadMap = unknown, TActionPayloadMap = unknown, TGettersReturnMap = unknown,
		TExtraStore extends Store = Store> =
	& OptionalField<keyof TGettersReturnMap, { getters: GettersDictionary<TState & TExtraStore["state"], TGettersReturnMap, TExtraStore["getters"]> }, {}>
	& OptionalField<keyof TState, { state: TState }, {}>
	& OptionalField<keyof TMutationPayloadMap, { mutations: MutationDictionary<TState & Writealso<TExtraStore["state"]>, TMutationPayloadMap> }, {}>
	& OptionalField<keyof TState, { actions: ActionDictionary<TActionPayloadMap, ActionContext<
		TState & TExtraStore["state"],
		Dispatcher<TActionPayloadMap> & Pick<TExtraStore, "dispatch">,
		Mutator<TMutationPayloadMap> & Pick<TExtraStore, "commit">,
		TGettersReturnMap & TExtraStore["getters"]>>
	}, {}>

type OptionalField<TKeyType, TFieldObjectType, TNever> = [TKeyType] extends [never] ? TNever : TFieldObjectType
