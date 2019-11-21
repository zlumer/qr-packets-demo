import { IEosTxHistoryItem, IEosTransferActionData } from "./eos"

interface IAction
{
	_id: string
	receipt: {
		receiver: string
		act_digest: string
		global_sequence: number
		recv_sequence: number
		auth_sequence: [string,number][]
		code_sequence: number
		abi_sequence: number
	}
	act: {
		account: string
		name: string
		authorization: {
			actor: string
			permission: string
		}[]
		data: {
			from: string
			to: string
			quantity: string
			memo: string
		}
		hex_data: string
	}
	context_free: boolean
	elapsed: number
	console: string
	trx_id: string
	block_num: number
	block_time: string
	producer_block_id: string
	account_ram_deltas: unknown[]
	except: unknown
	trx_status: string
	createdAt: string
}
type IActionResponse = IResponse<{
	actions: IAction[]
}>
type IResponse<T>  = T

export const jungle = {
	loadTxList: (address: string) => loadTxList('https://history.cryptolions.io', address)
}

export const main = {
	loadTxList: (address: string) => loadTxList('https://history.cryptolions.io', address)
}

export async function loadTxList(host: string, address: string): Promise<IEosTxHistoryItem<IEosTransferActionData>[]>
{
	let res = await load(host, `/v2/history/get_actions?account=${address}&limit=100&skip=0`) as IActionResponse
	return res.actions
}
export async function load(host: string, path: string): Promise<IResponse<unknown>>
{
	let url = `${host}${path}`
	return fetch(url).then(x => x.json()).then(res =>
	{
		// if (!res || (res.status != '1') || (res.message != "OK"))
		// 	throw Error(res.message)
		
		return res
	})
}