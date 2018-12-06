import { JsonRpc } from './jsonrpc'
import { timedPromise } from './promise'

import SimplePeer from "simple-peer"

let i = 0

export function init(initiator: boolean)
{
	let rtc = new SimplePeer({
		initiator
	})
	let ii = i++

	let jrpc = new JsonRpc(
		msg => (console.log(`JSONRPC ${ii}: ${msg}`), rtc.send(msg)),
		(json, cb) => {
			console.log(`ignored remote signer request:`, json)
			cb(undefined, null)
		}
	)
	rtc.on('error', err =>
	{
		console.log(err)
	})
	rtc.on('signal', signal =>
	{
		console.log(`SIGNAL$`, signal)
		// jrpc.callRaw("")
	})

	rtc.on('data', data => (console.log(`webrtc jrpc incoming:`, data), jrpc.onMessage(data.toString())))
	let connected = false

	return {
		rtc,
		jrpc,
		connected,
	}
}
export async function checkConnection(): Promise<boolean>
{
	if (!singleton.connected)
		return false

	try
	{
		await timedPromise(singleton.jrpc.ping(), 5000)
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
