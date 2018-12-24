import { IBlockchain } from "./IBlockchain"
import * as coinmarketcap from "./coinmarketcap"
import * as cryptolions from "./cryptolions"

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

export type EosBlockchain = IBlockchain<IEosTxHistoryItem<IEosTransferActionData>, string> & { eos: EosInstance } // TODO: add "getNetworkInfo" for mobile calls

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

function getNetwork(chainId: IChainId): EosBlockchain
{
	let chain = CHAINS[chainId]
	let httpEndpoint = chain.url
	let eos = Eos({
		httpEndpoint,
		chainId,
	})
	return {
		eos,
		networkName: chain.name,
		testnet: chain.testnet,
		getTxHash: (tx) => '0xEOS_FAKE_HASH',
		getUsdValue: () => getUsdRate(),
		loadTxList: wallet => chain.loadTxList(wallet.address),
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
		}
	}
}
const CACHE = { } as { [chainId in IChainId]: EosBlockchain }
export function getCachedNetworkByChainId(chainId: number | string): EosBlockchain
{
	chainId = chainId + ""
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetwork(chainId as IChainId)
}

const CHAINS = {
	'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': {
		testnet: false,
		name: 'Mainnet',
		url: 'http://mainnet.eoscalgary.io:80',
		loadTxList: cryptolions.jungle.loadTxList
	},
	'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': {
		testnet: true,
		name: 'Jungle',
		url: 'https://jungle2.cryptolions.io',
		loadTxList: cryptolions.jungle.loadTxList
	},
}
