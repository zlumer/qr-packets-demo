import SimplePeer from "simple-peer"

import { JsonRpc, RequestHandler } from "./jsonrpc"

export class JsonRpcWebRtc extends JsonRpc
{
	queue = [] as string[]
	connected = false

	constructor(public rtc: SimplePeer.Instance, onRequest: RequestHandler, private onConnected?: () => void)
	{
		super(msg => this.tryRtcSend(msg), onRequest)
		rtc.on('data', (data) => this.onMessage(data.toString()))
		rtc.on('connect', () => this.onRtcConnect())
	}
	onRtcConnect()
	{
		this.connected = true
		if (this.queue.length)
			this.queue.map(msg => this.rtc.send(msg))
		
		this.queue = []

		this.onConnected && this.onConnected()
	}
	tryRtcSend(msg: string)
	{
		if (this.connected)
			this.rtc.send(msg)
		else
			this.queue.push(msg)
	}
}
