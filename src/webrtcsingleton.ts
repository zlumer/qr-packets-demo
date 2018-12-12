import { JsonRpc } from './network/jsonrpc'

import SimplePeer from "simple-peer"
import { SignalData } from './network/SimplePeer'

let i = 0

export function init(initiator: boolean)
{
	let rtc = new SimplePeer({
		initiator
	})
	let ii = i++
	
	let jrpc = new JsonRpc(
		msg =>
		{
			console.log(`JSONRPC ${ii}: ${msg}`)
			if (!obj.connected)
				throw `WebRTC singleton: can't send msg when not connected! ${msg}`
			rtc.send(msg)
		},
		(json, cb) => {
			console.log(`ignored remote signer request:`, json)
			cb(undefined, null)
		}
	)
	rtc.on('error', err =>
	{
		console.log(err)
	})
	let data = { ice: [] as SignalData[], offer: undefined as SignalData | undefined }
	rtc.on('signal', signal =>
	{
		console.log(`SIGNAL$`, signal)
		if (signal.type == "offer")
			data.offer = signal
		if (signal.candidate)
			data.ice.push(signal)
	})
	let obj = {
		rtc,
		jrpc,
		connected: false,
		data,
	}
	rtc.on('connect', () => (console.log('### WEBRTC CONNECTED ###'), obj.connected = true))
	rtc.on('close', () => (console.log('### WEBRTC DISCONNECTED ###'), obj.connected = false))
	
	rtc.on('data', data => (console.log(`webrtc jrpc incoming:`, data.toString()), jrpc.onMessage(data.toString())))
	return obj
}
export async function checkConnection(): Promise<boolean>
{
	// console.log(`### WEBRTC STATUS: ${singleton.connected} ###`)
	if (!singleton.connected)
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
