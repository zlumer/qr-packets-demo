import Vue from 'src/vue-ts'
import { Route } from 'vue-router'

interface IQueryGetter
{
	(field: string): (this: InstanceType<typeof Vue>) => string | undefined
	<T>(field: string, map: (value: string) => T): (this: InstanceType<typeof Vue>) => T | undefined
	<T>(field: string, map: (value: string) => T, def: T): (this: InstanceType<typeof Vue>) => T
}

export const fromQuery: IQueryGetter = <T>(field: string, map?: (value: string) => T, def?: T) => function(this: InstanceType<typeof Vue>)
{
	let q = this.$route.query[field] as string | undefined
	if (typeof q === 'undefined')
		return def
	
	return map ? map(q) : q
}
export const getQueryString = function(route: Route)
{
	return route.fullPath.substr(route.path.length)
}
