import { RTCHelper } from "./webrtc"
import { JsonRpc } from "./jsonrpc"

function init()
{
	let rtc = new RTCHelper()

	let jrpc = new JsonRpc(
		msg => rtc.dataChannel!.send(msg),
		(json, cb) =>
		{
			console.log(`ignored remote signer request:`, json)
			cb(undefined, null)
		}
	)
	let connected = false
	
	return {
		rtc,
		jrpc,
		connected
	}
}

export let singleton = init()

export function reset()
{
	singleton = init()
}