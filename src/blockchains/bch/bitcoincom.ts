import { ITransactionsResponse, IUtxoResponse, INewTx } from "./bitcoincom.i"
import { curryFirst } from "../../utils"
import { buildTx } from "./bch-tx-builder"
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
		getUtoxs: curryFirst(getUtoxs, host)
	}
}

const TOKEN = `9aa7d51f02ba4d2fa3b18ffd93535238`
    
export async function getAddressInfo(host: string, addr: string): Promise<IAddressResponse>
{
	return load(host, `/addrs/${addr}`)
}
export async function getUtoxs(host: string, addr: string): Promise<IUtxoResponse>
{
	return load(host, `/address/utxo/${addr}`)
}

export async function getTxs(host: string, addr: string): Promise<ITransactionsResponse> {
	return load(host, `/address/transactions/${addr}`)
}

export async function newTx(host: string, from: string, to: string, value: string): Promise<INewTx>
{
	return getUtoxs(host, from).then(response => {
		return buildTx(value, to, from, response.utxos, response.scriptPubKey)
	})
}

export async function sendTx(host: string, tx: any): Promise<string>
{
	return post(host, `/rawtransactions/sendRawTransaction`, { hexes: [tx.signedBchTx] })
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
