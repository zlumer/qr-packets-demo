interface IError
{
	status: "0"
	message: "NOTOK"
	result: string
}
interface ITx
{
	blockNumber: string
	timeStamp: string
	hash: string
	nonce: string
	blockHash: string
	transactionIndex: string
	from: string
	to: string
	value: string
	gas: string
	gasPrice: string
	isError: string
	txreceipt_status: string
	input: string
	contractAddress: string
	cumulativeGasUsed: string
	gasUsed: string
	confirmations: string
}
interface IResponse<T>
{
	status: "1"
	message:"OK"
	result: T
}

export const mainnet = {
	loadTxList: (address: string) => loadTxList('https://api.etherscan.io', address)
}
export const rinkeby = {
	loadTxList: (address: string) => loadTxList('https://api-rinkeby.etherscan.io', address)
}
export const ropsten = {
	loadTxList: (address: string) => loadTxList('https://api-ropsten.etherscan.io', address)
}
export const kovan = {
	loadTxList: (address: string) => loadTxList('https://api-kovan.etherscan.io', address)
}

export async function loadTxList(host: string, address: string): Promise<ITx[]>
{
	try
	{
	let res = await load(host, `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`)
		let txs = res.result as ITx[]
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
export async function load(host: string, path: string): Promise<IResponse<unknown>>
{
	let url = `${host}${path}`
	return fetch(url).then(x => x.json()).then(res =>
	{
		if (!res || (res.status != '1') || (res.message != "OK"))
			throw Error(res.message)
		
		return res
	})
}