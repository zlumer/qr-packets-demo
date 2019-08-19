import { IAddressResponse, IAddressFullResponse, INewTxResponse, ISendTxResponse } from "./blockcypher.i"
import { curryFirst } from "../../store/utils"

// https://api.blockcypher.com/v1/btc/test3/addrs/mjB1mRuNzsJK8b2PmgfWawPAXHqS6M5Akb

export const testnet = makeNetwork("https://api.blockcypher.com/v1/btc/test3")
export const bcytestnet = makeNetwork("https://api.blockcypher.com/v1/bcy/test")
export const mainnet = makeNetwork("https://api.blockcypher.com/v1/btc/main")

function makeNetwork(host: string)
{
	return {
		getAddressInfo: curryFirst(getAddressInfo, host),
		getAddressInfoFull: curryFirst(getAddressInfoFull, host),
		newTx: curryFirst(newTx, host),
		sendTx: curryFirst(sendTx, host),
	}
}

const TOKEN = `9aa7d51f02ba4d2fa3b18ffd93535238`

export async function getAddressInfo(host: string, addr: string): Promise<IAddressResponse>
{
	return load(host, `/addrs/${addr}`)
}
export async function getAddressInfoFull(host: string, addr: string): Promise<IAddressFullResponse>
{
	return load(host, `/addrs/${addr}/full`)
}
export async function newTx(host: string, from: string, to: string, value: string): Promise<INewTxResponse>
{
	// {"inputs":[{"addresses": ["CEztKBAYNoUEEaPYbkyFeXC5v8Jz9RoZH9"]}],"outputs":[{"addresses": ["C1rGdt7QEPGiwPMFhNKNhHmyoWpa5X92pn"], "value": 1000000}]}
	return post(host, `/txs/new?token=${TOKEN}`, {
		inputs: [{ addresses: [from] }],
		outputs: [{ addresses: [to], value: parseInt(value) }],
	})
}
export async function sendTx(host: string, tx: unknown): Promise<ISendTxResponse>
{
	return post(host, `/txs/send?token=${TOKEN}`, tx as {})
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
export async function post<T = unknown>(host: string, path: string, data: {}): Promise<T>
{
	let url = `${host}${path}`
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(x => x.json()).then(res =>
	{
		if (!res || res.error)
			throw Error(res && res.error)
		
		return res
	})
}
