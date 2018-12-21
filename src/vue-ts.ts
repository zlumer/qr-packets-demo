import OriginalVue, { VueConstructor } from "vue"
import { Store } from "./store"

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export interface Vue extends Omit<OriginalVue, "$store">
{
	$store: Store & Omit<OriginalVue["$store"], keyof Store>
}
export default OriginalVue as VueWithProps<{}>
// @ts-ignore
export type VueWithProps<T> = VueConstructor<Vue & T>