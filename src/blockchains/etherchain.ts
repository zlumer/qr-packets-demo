export interface IECResponse
{
	safeLow: string // "2"
	standard: string // "2"
	fast: string // "5"
	fastest: string // "15"
}

export async function loadGasPrice(): Promise<IECResponse>
{
	return fetch('https://www.etherchain.org/api/gasPriceOracle').then(x => x.json())
}