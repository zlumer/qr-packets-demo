namespace global
{
	export let WebSocket: any
	export let wrtc: any
}
global.WebSocket = require('ws')
global.wrtc = require('wrtc')

import { WebrtcHSInitiator, WebrtcHSResponder } from "./wrtchs"

describe.skip('webrtc handshake', () =>
{
	it('should connect', (done) =>
	{
		let callbacks = [(a: () => void) => initiator.destroy(a)]
		let finish = (d: () => void): void => callbacks.length ? callbacks.pop()!(() => finish(d)) : d()
		let hsUrl = 'wss://duxi.io/shake'

		let initiator = new WebrtcHSInitiator(hsUrl, sid =>
		{
			callbacks.push(a => responder.destroy(a))

			let responder = new WebrtcHSResponder(hsUrl, sid, () => console.log(`CONNNNNNNNNNECTED!!!!! (responder)`))
		}, () => (console.log(`CONNNNNNNNNNECTED!!!!! (initiator)`), finish(done)))
	}, 25000)
})
