import Vue from 'src/vue-ts'

type Vue = InstanceType<typeof Vue>
type Store = Vue["$store"]
type Getters = Store["getters"]
type State = Store["state"]
type Actions = Store["__TActionPayloadMap__"]

export const mapGetters = <T extends keyof Getters>(getter: T) => function(this: Vue): Getters[T]
{
	let x = this.$store.getters[getter]
	return x
}
export const mapState = (field: keyof State) => function(this: Vue)
{
	return this.$store.state[field]
}
export const dispatcher = <T extends keyof Actions>(actionName: T) => function(this: Vue, payload: Actions[T]): Promise<void>
{
	return this.$store.dispatch(actionName as any, payload)
}
export const boundDispatcher = <T extends keyof Actions>(actionName: T, payload: Actions[T]) => function(this: Vue): Promise<void>
{
	return this.$store.dispatch(actionName as any, payload)
}
