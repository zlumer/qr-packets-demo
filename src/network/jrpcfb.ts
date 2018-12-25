import { JsonRpc, RequestHandler, RequestJson, call } from "./jsonrpc"
import { IHCSimple } from "./hostproto"

export function isFallback(msg: RequestJson): msg is IHCSimple<{ msg: string }>
{
	return msg.method == "fallback"
}

export class JsonRpcFallback extends JsonRpc
{
	constructor(public jrpc: JsonRpc, onRequest: RequestHandler)
	{
		super(msg => (console.log(`FALLBACK OUT> ${msg}`), jrpc.callRaw("fallback", { msg })), onRequest)
		jrpc.onRequest = (json, cb) => this.onIncoming(json, cb)
	}
	onIncoming: RequestHandler = (json, cb) =>
	{
		if (isFallback(json))
		{
			let msg = Array.isArray(json.params) ? json.params[0] : json.params.msg
			this.onMessage(msg)
		}
	}
}
