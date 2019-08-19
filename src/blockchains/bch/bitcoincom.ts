import { ITransactionsResponse } from "./bitcoincom.i"

// https://rest.bitcoin.com/v2/address/transactions/qpkxhhyumvx07s3cluq7un367mnxzgzswy4el8tn4w

export const testnet = makeNetwork("https://trest.bitcoin.com/v2")
export const mainnet = makeNetwork("https://rest.bitcoin.com/v2")

function makeNetwork(host: string)
{
	return {
		getAddressInfo: curryFirst(getAddressInfo, host),
		getAddressInfoFull: curryFirst(getTxs, host),
		newTx: curryFirst(newTx, host),
		sendTx: curryFirst(sendTx, host),
	}
}

const TOKEN = `9aa7d51f02ba4d2fa3b18ffd93535238`

function curryFirst<TFirst, TRest extends any[], TRes>(func: (first: TFirst, ...args: TRest) => TRes, firstArg: TFirst)
{
	return (...args: TRest) => func(firstArg, ...args)
}
    
export async function getAddressInfo(host: string, addr: string): Promise<IAddressResponse>
{
	return load(host, `/addrs/${addr}`)
}
export async function getTxs(host: string, addr: string): Promise<ITransactionsResponse>
{
	return load(host, `/address/transactions/${addr}`)
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
	console.log('loading url: ' + url)
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
