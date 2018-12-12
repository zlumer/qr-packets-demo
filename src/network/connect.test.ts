namespace global
{
	export let WebSocket: any
	export let wrtc: any
}
global.WebSocket = require('ws')
global.wrtc = require('wrtc')

import { WebrtcHSInitiator, WebrtcHSResponder } from "./wrtchs"

describe('webrtc handshake', () =>
{
	it('should connect', (done) =>
	{
		let hsUrl = 'wss://duxi.io/shake'

		let initiator = new WebrtcHSInitiator(hsUrl, sid =>
		{
			let responder = new WebrtcHSResponder(hsUrl, sid, () => console.log(`CONNNNNNNNNNECTED!!!!! (responder)`))
		}, () => (console.log(`CONNNNNNNNNNECTED!!!!! (initiator)`), done()))
	}, 25000)
})
