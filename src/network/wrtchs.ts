import SimplePeer from "simple-peer"
import { HandshakeConnectionInitiator, IHandshakeHandlerInitiator, IHandshakeHandlerResponder, HandshakeConnectionResponder } from "./jrpchs"
import { SignalData } from "src/webrtcsingleton"
import { createPeer } from "./SimplePeer"

export class WebrtcHSInitiator implements IHandshakeHandlerInitiator
{
	rtc = createPeer({
		initiator: true,
	})
	ws: HandshakeConnectionInitiator

	_rtc_onSignal = (signal: SignalData) => this.onSignal(signal)
	_rtc_onConnect: () => void

	signals = [] as SignalData[]

	destroyed = false

	constructor(wsUrl: string, private onSid: (sid: string) => void, onConnect: (rtc: SimplePeer.Instance) => void)
	{
		this.ws = new HandshakeConnectionInitiator(wsUrl, this)
		this.rtc.on('signal', this._rtc_onSignal)
		this.rtc.on('connect', this._rtc_onConnect = () => this.destroy(() => onConnect(this.rtc)))
	}
	destroy(callback: () => void)
	{
		this.rtc.off('signal', this._rtc_onSignal)
		this.rtc.off('connect', this._rtc_onConnect)

		this.destroyed = true

		this.ws.wsrpc.ws.close()

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
		this.ws.signal(signal)
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
		this.rtc.signal({ candidate: ice })
	}
}
export class WebrtcHSResponder implements IHandshakeHandlerResponder
{
	rtc = createPeer({
		initiator: false,
	})
	ws: HandshakeConnectionResponder

	_rtc_onSignal = (signal: SignalData) => this.ws.signal(signal)
	_rtc_onConnect: () => void

	destroyed = false

	constructor(wsUrl: string, sid: string, onConnect: (rtc: SimplePeer.Instance) => void)
	{
		this.ws = new HandshakeConnectionResponder(wsUrl, sid, this)
		this.rtc.on('signal', this._rtc_onSignal)
		this.rtc.on('connect', this._rtc_onConnect = () => this.destroy(() => onConnect(this.rtc)))
	}
	destroy(callback: () => void)
	{
		this.rtc.off('signal', this._rtc_onSignal)
		this.rtc.off('connect', this._rtc_onConnect)
		
		this.destroyed = true

		this.ws.wsrpc.ws.close()

		callback()
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
		
		this.rtc.signal({ candidate: ice })
	}
}
