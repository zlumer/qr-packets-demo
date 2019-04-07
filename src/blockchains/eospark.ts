export interface IEPResponse<TData>
{
	errno: number
	errmsg: string
	data: TData
}

export interface ITokenListData
{
	symbol_list: ITokenInfo[]
}

export interface ITokenInfo
{
	symbol: string
	code: string
	balance: string
}

const API_KEY = 'a9564ebc3289b7a14551baf8ad5ec60a'

export async function loadTokensList(account: string): Promise<ITokenListData>
{
	let res = await load<ITokenListData>('account', 'get_token_list', API_KEY, { account })
	return res.data
}
export async function load<T = unknown>(module: string, action: string, apiKey: string, query?: {[key: string]: string | number}): Promise<IEPResponse<T>>
{
	let qobj = {
		module,
		action,
		apikey: apiKey,
		...query
	} as { [key: string]: string | number }

	let qs = Object.keys(qobj)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qobj[key] + '')}`)
		.join('&')
	
	let url = `https://mighty-coast-75043.herokuapp.com/https://api.eospark.com/api?${qs}`
	// let fake = `{"errno":0,"errmsg":"Success","data":{"symbol_list":[{"symbol":"EOS","code":"eosio.token","balance":"0.2963"},{"symbol":"PGL","code":"prospectorsg","balance":"3.0096"},{"symbol":"MEETONE","code":"eosiomeetone","balance":"124.2457"},{"symbol":"BLACK","code":"eosblackteam","balance":"9.9760"},{"symbol":"OCT","code":"octtothemoon","balance":"42.4033"},{"symbol":"IQ","code":"everipediaiq","balance":"108.623"},{"symbol":"CET","code":"eosiochaince","balance":"34.6332"},{"symbol":"ZOS","code":"zosdiscounts","balance":"138.0000"},{"symbol":"GGS","code":"eosggshost11","balance":"52.5000"},{"symbol":"PEOS","code":"thepeostoken","balance":"1.0100"},{"symbol":"EMT","code":"emanateoneos","balance":"10.0000"},{"symbol":"NDX","code":"newdexissuer","balance":"10303.5874"}]}}`
	// fake = `{"errno":0,"errmsg":"Success","data":{"symbol_list":[{"symbol":"EOS","code":"eosio.token","balance":"4.5749"},{"symbol":"KARMA","code":"therealkarma","balance":"2290.6000"},{"symbol":"ZOS","code":"zosdiscounts","balance":"140.0000"},{"symbol":"MEETONE","code":"eosiomeetone","balance":"1212.2522"},{"symbol":"ADD","code":"eosadddddddd","balance":"1411.2522"},{"symbol":"BET","code":"betdividends","balance":"12.0374"},{"symbol":"CET","code":"eosiochaince","balance":"100.0000"},{"symbol":"EMT","code":"emanateoneos","balance":"10.0000"},{"symbol":"PEOS","code":"thepeostoken","balance":"51.5944"},{"symbol":"EFOR","code":"theforcegrou","balance":"100.0000"},{"symbol":"GO","code":"okkkkkkkkkkk","balance":"2000"},{"symbol":"MPT","code":"metpacktoken","balance":"16.6245"}]}}`
	// let p = new Promise<IEPResponse<T>>(res => res(JSON.parse(fake)))
	return fetch(url).then(x => x.json()).then((res: IEPResponse<T>) =>
	{
		if (!res || (res.errno != 0) || (res.errmsg != "Success"))
			throw Error(res.errmsg)
		
		return res
	})
}