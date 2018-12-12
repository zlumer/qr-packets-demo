import { IHostCommand, IHCSimple, allToObj } from "./hostproto"
import { JsonRpcWebsocket } from "./jrpcws"
import { RequestHandler } from "./jsonrpc"
import { SignalData } from "./SimplePeer"

export function isIce(msg: IHostCommand<any, any>): msg is IHCSimple<{ice: IIceCandidate}>
{
	return msg.method == 'ice'
}
export function isAnswer(msg: IHostCommand<any, any>): msg is IHCSimple<{answer: string}>
{
	return msg.method == 'answer'
}
export function isOffer(msg: IHostCommand<any, any>): msg is IHCSimple<{offer: string}>
{
	return msg.method == 'offer'
}

export enum HandshakeStatus
{
	NotStarted,
	ConnectingHandshake,
	ExchangingOfferAnswer,
	ExchangingIce,
	Connected,
}

type IIceCandidate = {}

export interface IHandshakeHandlerBase
{
	onIce(ice: IIceCandidate): void
}
export interface IHandshakeHandlerInitiator extends IHandshakeHandlerBase
{
	onWsConnect(sid: string): void
	onAnswer(answer: string): void
}
export interface IHandshakeHandlerResponder extends IHandshakeHandlerBase
{
	onOffer(offer: string): void
}

class HandshakeConnectionBase
{
	status = HandshakeStatus.NotStarted
	
	wsrpc: JsonRpcWebsocket
	
	constructor(wsUrl: string, private _handler: IHandshakeHandlerBase)
	{
		this.status = HandshakeStatus.ConnectingHandshake
		this.wsrpc = new JsonRpcWebsocket(new WebSocket(wsUrl), (json, cb) => this._handshakeHandler(json, cb), () => this.onWsOpen())
	}
	onWsOpen()
	{
		this.status = HandshakeStatus.ExchangingOfferAnswer

		this.m_onWsOpen && this.m_onWsOpen()
	}
	m_onWsOpen?: () => void
	m_handshakeHandler?: RequestHandler
	_handshakeHandler: RequestHandler = (json, cb) =>
	{
		if (isIce(json))
		{
			let { ice } = allToObj(json, ["ice"])
			this._handler.onIce(ice)
		}

		this.m_handshakeHandler && this.m_handshakeHandler(json, cb)
	}
	signal(signal: SignalData)
	{
		if (signal.candidate)
		{
			this.wsrpc.callRaw('ice', { ice: signal.candidate })
		}
	}
}

export class HandshakeConnectionInitiator extends HandshakeConnectionBase
{
	constructor(wsUrl: string, private handler: IHandshakeHandlerInitiator)
	{
		super(wsUrl, handler)
	}
	m_handshakeHandler: RequestHandler = (json, cb) =>
	{
		if (isAnswer(json))
		{
			let { answer } = allToObj(json, ['answer'])
			console.log(`got answer: ${answer}`)
			this.status = HandshakeStatus.ExchangingIce
			this.handler.onAnswer(answer)
		}
	}
	
	async signal(signal: SignalData)
	{
		super.signal(signal)
		
		if (signal.type == 'offer')
		{
			let sidResponse = await this.wsrpc.callRaw('offer', { offer: signal.sdp })
			let sid = sidResponse.sid
			this.handler.onWsConnect(sid)
		}
	}
}
export class HandshakeConnectionResponder extends HandshakeConnectionBase
{
	constructor(wsUrl: string, private sid: string, private handler: IHandshakeHandlerResponder)
	{
		super(wsUrl, handler)
	}
	m_onWsOpen = async () =>
	{
		let offerResponse = await this.wsrpc.callRaw('join', { sid: this.sid })
		let offer = offerResponse.offer
		console.log(`=================== OFFER ================`, offer)
		this.status = HandshakeStatus.ExchangingIce
		this.handler.onOffer(offer)
	}
	m_handshakeHandler: RequestHandler = (json, cb) =>
	{
		if (isOffer(json))
		{
			let { offer } = allToObj(json, ['offer'])
			console.log(`got offer: ${offer}`)
			this.status = HandshakeStatus.ExchangingIce
			this.handler.onOffer(offer)
		}
	}
	async signal(signal: SignalData)
	{
		super.signal(signal)

		if (signal.type == 'answer')
		{
			await this.wsrpc.callRaw('answer', { answer: signal.sdp })
		}
	}
}
