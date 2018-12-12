import { JsonRpc, RequestHandler } from "./jsonrpc"

export class JsonRpcWebsocket extends JsonRpc
{
	queue = [] as string[]
	connected = false

	constructor(public ws: WebSocket, onRequest: RequestHandler, private onOpened?: () => void)
	{
		super(msg => this.tryWsSend(msg), onRequest)
		ws.addEventListener('open', () => this.onWsConnect())
		ws.addEventListener('message', msg => this.onMessage(msg.data.toString()))
	}
	onWsConnect()
	{
		this.connected = true
		if (this.queue.length)
			this.queue.map(msg => this.ws.send(msg))
		
		this.queue = []

		this.onOpened && this.onOpened()
	}
	tryWsSend(msg: string)
	{
		if (this.connected)
			this.ws.send(msg)
		else
			this.queue.push(msg)
	}
}
