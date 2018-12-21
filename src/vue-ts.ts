import OriginalVue, { VueConstructor } from "vue"
import { Store } from "./store"

type IIS = OriginalVue["$store"]
interface IFS
{
	replaceState: IIS["replaceState"]
	subscribe: IIS["subscribe"]
	hotUpdate: IIS["hotUpdate"]
	watch: IIS["watch"]
	registerModule: IIS["registerModule"]
	unregisterModule: IIS["unregisterModule"]
}
export interface Vue extends OriginalVue
{
	$store: Store & IFS
}
export default OriginalVue as VueWithProps<{}>
export type VueWithProps<T> = VueConstructor<Vue & T>