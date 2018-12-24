export interface CMCResponse<TData>
{
	data: TData
	metadata: {
		timestamp: number
		error: null | unknown
	}
}
export interface CMCTicker
{
	id: number
	name: string
	symbol: string
	website_slug: string
	rank: number
	circulating_supply: number
	total_supply: number
	max_supply: number | null
	quotes: {
		[key in 'USD']: {
			price: number
			volume_24h: number
			market_cap: number
			percent_change_1h: number
			percent_change_24h: number
			percent_change_7d: number
		}
	}
	last_updated: number
}
export const tickerIds = {
	eth: '1027',
	eos: '1765',
}
export async function loadTicker(id: string): Promise<CMCResponse<CMCTicker>>
{
	let url = `https://api.coinmarketcap.com/v2/ticker/${id}/`
	let res = await fetch(url)
	return res.json()
}
export async function loadPrice(id: string): Promise<number>
{
	let ticker = await loadTicker(id)
	return ticker.data.quotes.USD.price
}