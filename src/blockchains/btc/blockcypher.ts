import { IAddressResponse, IAddressFullResponse } from "./blockcypher.i"

// https://api.blockcypher.com/v1/btc/test3/addrs/mjB1mRuNzsJK8b2PmgfWawPAXHqS6M5Akb

export const testnet = makeNetwork("https://api.blockcypher.com/v1/btc/test3")
export const bcytestnet = makeNetwork("https://api.blockcypher.com/v1/bcy/test")
export const mainnet = makeNetwork("https://api.blockcypher.com/v1/btc/main")

function makeNetwork(host: string)
{
	return {
		getAddressInfo: curryFirst(getAddressInfo, host),
		getAddressInfoFull: curryFirst(getAddressInfoFull, host),
	}
}

function curryFirst<TFirst, TRest extends any[], TRes>(func: (first: TFirst, ...args: TRest) => TRes, firstArg: TFirst)
{
	return (...args: TRest) => func(firstArg, ...args)
}

export async function getAddressInfo(host: string, addr: string): Promise<IAddressResponse>
{
	return load(host, `/addrs/${addr}`)
}
export async function getAddressInfoFull(host: string, addr: string): Promise<IAddressFullResponse>
{
	return load(host, `/addrs/${addr}/full`)
}

export async function load<T = unknown>(host: string, path: string): Promise<T>
{
	let url = `${host}${path}`
	return fetch(url).then(x => x.json()).then(res =>
	{
		if (!res || res.error)
			throw Error(res && res.error)
		
		return res
	})
}
