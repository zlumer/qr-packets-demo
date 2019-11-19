export interface ITokenResponse
{
    tokens:           IToken[]
    total_tokens_usd: number
}

export interface IToken
{
    key:       string
    currency:  string
    amount:    number
    contract:  string
    decimals:  string
    metadata:  IMetadata
    usd_value: number
    exchanges: IExchange[]
}

export interface IExchange
{
    name:      string
    price:     number
    price_usd: number
}

export interface IMetadata
{
    name?:       string
    logo:        string
    desc?:       ILocalizedDescription | string
    website?:    string
    created_at?: Date
}

export interface ILocalizedDescription
{
    en: string
    zh?: string
}


export async function loadTokensList(account: string): Promise<ITokenResponse>
{
	return fetch(`https://www.api.bloks.io/account/${account}?type=getAccountTokens`).then(x => x.json()).then((res: ITokenResponse) =>
	{
		if (!res || ("error" in res))
			throw new Error(JSON.stringify(res))
		
		return res
	})
}
