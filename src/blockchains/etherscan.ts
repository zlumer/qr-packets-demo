import { ITx, IResponse, ITokenTx } from "./etherscan.i"

export const mainnet = makeNetwork('https://api.etherscan.io')
export const rinkeby = makeNetwork('https://api-rinkeby.etherscan.io')
export const ropsten = makeNetwork('https://api-ropsten.etherscan.io')
export const kovan = makeNetwork('https://api-kovan.etherscan.io')

export type IEtherscanNetwork = ReturnType<typeof makeNetwork>

function makeNetwork(host: string)
{
	return {
		loadTxList: (address: string) => loadTxList(host, address),
		getTokenTxList: (address: string) => getTokenTxList(host, address),
	}
}

export async function loadTxList(host: string, address: string): Promise<ITx[]>
{
	try
	{
		let res = await load<ITx[]>(host, `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`)
		let txs = res.result
		txs = txs.filter((val, idx, arr) => idx == arr.findIndex(x => x.hash == val.hash)) // remove duplicates
		return txs.reverse()
	}
	catch (e)
	{
		if (e.message === "No transactions found")
			return []
		
		throw e
	}
}
export async function getTokenTxList(host: string, address: string): Promise<ITokenTx[]>
{
	try
	{
		let res = await load<ITokenTx[]>(host, `/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`)
		let txs = res.result
		txs = txs.filter((val, idx, arr) => idx == arr.findIndex(x => x.hash == val.hash))
		return txs.reverse()
	}
	catch (e)
	{
		if (e.message === "No transactions found")
			return []
		
		throw e
	}
}
export async function load<T = unknown>(host: string, path: string): Promise<IResponse<T>>
{
	let url = `${host}${path}`
	return fetch(url).then(x => x.json()).then(res =>
	{
		if (!res || (res.status != '1') || (res.message != "OK"))
			throw Error(res.message)
		
		return res
	})
}