export interface IEGSResponse
{
	safeLow: number // 20.0
	average: number // 20.0
	fast: number // 50.0
	fastest: number // 200.0
	
	safeLowWait: number // 1.6
	avgWait: number // 1.6
	fastWait: number // 0.8
	fastestWait: number // 0.6

	speed: number // 0.8870369833210312
	blockNum: number // 7140049
	block_time: number // 17.484536082474225
}

export async function loadGasPrice(): Promise<IEGSResponse>
{
	return fetch('https://ethgasstation.info/json/ethgasAPI.json').then(x => x.json())
}