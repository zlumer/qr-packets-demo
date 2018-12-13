import SimplePeer from "simple-peer"
import { HandshakeConnectionInitiator, IHandshakeHandlerInitiator, IHandshakeHandlerResponder, HandshakeConnectionResponder, HandshakeConnectionBase } from "./jrpchs"
import { createPeer, SignalData } from "./SimplePeer"

class WebrtcHsBase
{
	rtc: SimplePeer.Instance
	ws?: HandshakeConnectionBase

	signals = [] as SignalData[]

	destroyed = false
	
	constructor(initiator: boolean, onConnect: (rtc: SimplePeer.Instance) => void)
	{
		this.rtc = createPeer({ initiator })

		this.rtc.on('signal', signal => this.onSignal(signal))
		this.rtc.on('connect', () => this.destroy(() => onConnect(this.rtc)))
	}
	destroy(callback: () => void)
	{
		this.destroyed = true
		
		callback()
	}
	onSignal(signal: SignalData)
	{
		if (this.destroyed)
			return
		
		if (signal.candidate)
		{
			if (this.signals)
				return this.signals.push(signal)
		}
		this.ws!.signal(signal)
	}
}

export class WebrtcHSInitiator extends WebrtcHsBase implements IHandshakeHandlerInitiator
{
	ws: HandshakeConnectionInitiator

	constructor(wsUrl: string, private onSid: (sid: string) => void, onConnect: (rtc: SimplePeer.Instance) => void)
	{
		super(true, onConnect)

		this.ws = new HandshakeConnectionInitiator(wsUrl, this)
	}
	onAnswer(answer: string)
	{
		if (this.destroyed)
			return

		this.rtc.signal({ type: "answer", sdp: answer } as any)
		if (this.signals)
		{
			this.signals.map(x => this.ws.signal(x))
			delete this.signals
		}
	}
	onWsConnect(sid: string): void
	{
		if (this.destroyed)
			return
		
		this.onSid(sid)
	}
	onIce(ice: {})
	{
		if (this.destroyed)
			return
		
		console.log(`INITIATOR ICE ${ice}`)
		if (ice)
			this.rtc.signal({ candidate: ice })
	}
}
export class WebrtcHSResponder extends WebrtcHsBase implements IHandshakeHandlerResponder
{
	ws: HandshakeConnectionResponder

	constructor(wsUrl: string, sid: string, onConnect: (rtc: SimplePeer.Instance) => void)
	{
		super(false, onConnect)

		this.ws = new HandshakeConnectionResponder(wsUrl, sid, this)
	}
	onOffer(offer: string): void
	{
		if (this.destroyed)
			return
		
		this.rtc.signal({ type: "offer", sdp: offer } as any)
	}
	onIce(ice: {}): void
	{
		if (this.destroyed)
			return
		
		if (ice)
			this.rtc.signal({ candidate: ice })
	}
}
