import SimplePeer from "simple-peer"

namespace global
{
	export let wrtc: any
}

export type SignalData = { type?: string, sdp?: any, candidate?: any }

export function createPeer(opts: SimplePeer.Options)
{
	if (global && global.wrtc)
		opts.wrtc = global.wrtc
	
	return new SimplePeer(opts)
}