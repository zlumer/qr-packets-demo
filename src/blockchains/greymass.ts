import { IEosTransferActionData, IEosTxHistoryItem } from "./eos"

export interface IActionTraceReceipt
{
	receiver: string // "dimalubiteos"
	act_digest: string // "c0226badaa50c4d0e9937ce36c8a64cbeb73311fa467ed17b5f876be08aa72bc"
	global_sequence: number // 3325928263
	recv_sequence: number // 1
	auth_sequence:[
		string, /* "lynxlynxlynx" */
		number /* 302910 */
	][]
	code_sequence: number // 2
	abi_sequence: number // 2
}
export interface IActionTraceAct
{
	account: string // "eosio.token"
	name: string // "transfer"
	authorization: {
		actor: string // "lynxlynxlynx"
		permission: string // "active"
	}[]
	data: {
		from: string // "lynxlynxlynx"
		to: string // "dimalubiteos"
		quantity: string // "0.0100 EOS"
		memo: string // "EOSLynx Android account"
	}
	hex_data: string // "d0a78f7dfad8a78f80a9caeee868a44b640000000000000004454f530000000017454f534c796e7820416e64726f6964206163636f756e74"
}
export interface IActionTrace
{
	receipt: IActionTraceReceipt
	act: IActionTraceAct
	context_free: boolean // false
	elapsed: number // 8
	console: string // ""
	trx_id: string // "94709f5dc4eb1b23870003890a18aa4ff69d8643c85b4a09eb971ab4a4744851"
	block_num: number // 34139724
	block_time: string // "2018-12-26T15:44:18.000"
	producer_block_id: string // "0208ee4c13fece488179745a9476da9395737745e55183ef6cc1fa95d433511b"
	account_ram_deltas: []
	except: null
	inline_traces: []
}
export interface IAction
{
	global_action_seq: number // 3325928263
	account_action_seq: number // 0
	block_num: number // 34139724
	block_time: string // "2018-12-26T15:44:18.000",
	action_trace: IActionTrace
}
export interface IActionResponse
{
	actions: IAction[]
	last_irreversible_block: number // 34308077
}
export type IResponse<T> = T

export const mainnet = {
	loadTxList: (address: string) => loadTxList('https://eos.greymass.com', address)
}

export async function loadTxList(host: string, address: string): Promise<IEosTxHistoryItem<IEosTransferActionData>[]>
{
	let params = {
		account_name: address,
		offset: -100,
		pos: -1
	}
	let res = await load(host, `/v1/history/get_actions`, params) as IActionResponse
	console.log(res)
	return res.actions.map(x => x.action_trace).reverse()
}
export async function load(host: string, path: string, bodyParams: {}): Promise<IResponse<unknown>>
{
	let url = `${host}${path}`
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(bodyParams)
	}).then(x => x.json()).then(res =>
	{
		// if (!res || (res.status != '1') || (res.message != "OK"))
		// 	throw Error(res.message)
		
		return res
	})
}