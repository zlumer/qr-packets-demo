import { JsonRpc } from './network/jsonrpc'

import SimplePeer from "simple-peer"
import { SignalData } from './network/SimplePeer'

let i = 0

export function init(initiator: boolean)
{
	let servers = [
		{
			urls: "stun:stun.l.google.com:19302"
		},
		{
			urls: "stun:global.stun:3478?transport=udp"
		},
		{
			urls: 'stun:global.stun.twilio.com:3478?transport=udp'
		},
	]
	let obj = {
		jrpc: null as unknown as JsonRpc,
	}
	return obj
}
export async function checkConnection(): Promise<boolean>
{
	// console.log(`### WEBRTC STATUS: ${singleton.connected} ###`)
	if (!singleton.jrpc)
		return false

	try
	{
		// await timedPromise(singleton.jrpc.ping(), 5000)
		return true
	}
	catch (e)
	{
		return false
	}
}

let singleton = init(true)
export let getSingleton = () => singleton

export function reset(initiator: boolean)
{
	singleton = init(initiator)
}
