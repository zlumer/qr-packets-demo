import { IBlockchain } from "./IBlockchain"
import * as coinmarketcap from "./coinmarketcap"
import * as cryptolions from "./cryptolions"
import * as greymass from "./greymass"

import Eos, { EosInstance } from "eosjs"

export interface IEosTxHistoryItem<T extends {}>
{
	trx_id: string
	act: {
		account: string
		name: string
		data: T
	}
}
export interface IEosTransferActionData
{
	from: string
	to: string
	quantity: string
	memo: string
}
export interface IEosTxHeaders
{
	expiration: string
    ref_block_num: number
    ref_block_prefix: number
}
export interface IEosChainInfo
{
	block_cpu_limit: number // 192077
	block_net_limit: number // 1047568
	chain_id: string // "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
	head_block_id: string // "020b7b96a4744e80379cb4fd250e8c16088d47bd3444367ea4ed5b57437b3459"
	head_block_num: number // 34306966
	head_block_producer: string // "eoslaomaocom"
	head_block_time: string // "2018-12-27T15:05:06.500"
	last_irreversible_block_id: string // "020b7a54fd04724ba3f3390be01378ed74dc2d98f3a811a40e12ee461634519d"
	last_irreversible_block_num: number // 34306644
	server_version: string // "b312faa4"
	server_version_string: string // "mainnet-1.5.1"
	virtual_block_cpu_limit: number // 1818750
	virtual_block_net_limit: number // 1048576000
}
export interface IEosBlockTransaction
{
	cpu_usage_us: number // 395
	net_usage_words: number // 0
	status: string // "executed"
	trx: string // "d70c3acfe7d72bee87297e7abc3d4b32137d10a3b42f49cb19849281d3d5abde"

}
export interface IEosBlockInfo
{
	action_mroot: string // "c1319187218f7258dd6a0980ac10e50019b6e9596857a4b8ecca17ea5de1157d"
	block_extensions: []
	block_num: number // 34306976
	confirmed: number // 0
	header_extensions: []
	id: string // "020b7ba014d2bb83d058d40bd6699734721c716efec92996b33033937b6bd396"
	new_producers: null
	previous: string // "020b7b9f7fc3c9614344d0e9cb1f29b52ff5f48d8f9a395b26213ad7cd79d2f4"
	producer: string // "eoslaomaocom"
	producer_signature: string // "SIG_K1_Jx47ZjSmW2mu4fKx1J8z4qLRxDqCSAzxwSaHFnCqyivCA5JmVmfKTKTC5dv2zkKZCCK7U4dyQEU6ktGyRWQog4MaPpC1Xk"
	ref_block_prefix: number // 198465744
	schedule_version: number // 624
	timestamp: string // "2018-12-27T15:05:11.500"
	transaction_mroot: string // "97bc0e5dae1bf65ee7ef438896be91833d0bb8c37a29e33c237150554787defe"
	transactions: IEosBlockTransaction[]
}

export type EosBlockchain = IBlockchain<IEosTxHistoryItem<IEosTransferActionData>, string> & {
	getTxHeaders(): Promise<IEosTxHeaders>
} // TODO: add "getNetworkInfo" for mobile calls

const getUsdRate = () => coinmarketcap.loadPrice(coinmarketcap.tickerIds.eos)


declare global
{
	interface Window
	{
		__eos__sendTx: (tx: string) => Promise<string>
	}
}
export type IChainId = keyof typeof CHAINS
export type IChainSettings = typeof CHAINS[IChainId]

function getNetwork(httpEndpoint: string, chainId: string) {
	let eos = Eos({
		httpEndpoint,
		chainId,
	})
	return {
		async pushTx(tx: string): Promise<string>
		{
			if ("__eos__sendTx" in window)
				return console.log('FAKING EOS CALL!!!', tx), window.__eos__sendTx(tx)
			
			console.log(`[EOS] SENDING TX: ${tx}`)
			const txHash = await eos.pushTransaction(tx)
			console.log('txHash:', txHash)
			if (!txHash.transaction_id)
				throw new Error(`EOS: couldn't push tx! full response: ${JSON.stringify(txHash)}`)

			return txHash.transaction_id
		},
		async getTxHeaders(): Promise<IEosTxHeaders>
		{
			const info = await eos.getInfo({}) as IEosChainInfo
			// console.log(info)
		
			const expireInSeconds = 60 * 60 // 1 hour
		
			const chainDate = new Date(info.head_block_time + 'Z')
			const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000).toISOString().split('.')[0]
		
			const block = await eos.getBlock(info.last_irreversible_block_num)
			// console.log(block)
		
			const transactionHeaders = {
				expiration,
				ref_block_num: info.last_irreversible_block_num & 0xFFFF,
				ref_block_prefix: block.ref_block_prefix
			}
			// console.log(transactionHeaders)
		
			return transactionHeaders
		}
	}
}

function getNetworkByChainId(chainId: IChainId): EosBlockchain
{
	let chain = CHAINS[chainId]
	let httpEndpoint = chain.url
	let eos = getNetwork(httpEndpoint, chainId)
	eos.getTxHeaders()
	return {
		networkName: chain.name,
		testnet: chain.testnet,
		getTxHash: (tx) => '0xEOS_FAKE_HASH',
		getUsdValue: () => getUsdRate(),
		loadTxList: wallet => chain.loadTxList(wallet.address),
		pushTx: eos.pushTx,
		getTxHeaders: eos.getTxHeaders
	}
}
const CACHE = { } as { [chainId in IChainId]: EosBlockchain }

export function getCachedNetworkByChainId(chainId: number | string): EosBlockchain
{
	chainId = chainId + ""
	if (!chainId)
		chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' // eos mainnet
	
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId as IChainId)
}

const CHAINS = {
	'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': {
		testnet: false,
		name: 'Mainnet',
		url: 'https://eos.greymass.com',
		loadTxList: greymass.mainnet.loadTxList
	},
	'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': {
		testnet: true,
		name: 'Jungle',
		url: 'https://jungle2.cryptolions.io',
		loadTxList: cryptolions.jungle.loadTxList
	},
}
