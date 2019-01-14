import Vue from 'vue'
import AppLayout from './App.vue'
import DefaultLayout from './Default.vue'
import HomeLayout from './Home.vue'

const LAYOUTS = {
	app: AppLayout,
	default: DefaultLayout,
	home: HomeLayout,
}

export type ILayoutName = keyof typeof LAYOUTS

export function layoutNameToComponent(name: ILayoutName)
{
	return `${name}-layout`
}
export function registerLayouts()
{
	let layoutNames = Object.keys(LAYOUTS) as ILayoutName[]
	layoutNames.forEach(key =>
	{
		let layout = LAYOUTS[key]
		Vue.component(layoutNameToComponent(key), layout)
	})
}
