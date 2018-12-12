import SimplePeer from "simple-peer"

namespace global
{
	export let wrtc: any
}

export function createPeer(opts: SimplePeer.Options)
{
	if (global.wrtc)
		opts.wrtc = global.wrtc
	
	return new SimplePeer(opts)
}