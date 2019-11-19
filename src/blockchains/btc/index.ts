import { IBlockchain } from "../IBlockchain"
import * as coinmarketcap from "../coinmarketcap"
import { testnet, mainnet } from "./blockcypher"
import { ITxRef } from "./blockcypher.i"

export interface IBtcHistoryItem
{
	hash: string
	value: number
	date: string
	incoming: boolean
}

export type BtcBlockchain = IBlockchain<IBtcHistoryItem, string> & {
	prepareTx: typeof mainnet.newTx
}

const getUsdRate = () => coinmarketcap.loadPrice(coinmarketcap.tickerIds.btc)

export function getCachedNetworkByChainId(chainId: number | string): BtcBlockchain
{
	chainId = chainId + ""
	
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId as IChainId)
}

export type IChainId = keyof typeof CHAINS
export type IChainSettings = typeof CHAINS[IChainId]

function bcyTxToHistory(tx: ITxRef)
{
	return {
		hash: tx.tx_hash,
		value: tx.value,
		date: tx.confirmed + "",
		incoming: (tx.tx_output_n >= 0)
	}
}
function bcyMergeTxs(txs: ITxRef[])
{
	return txs.map(bcyTxToHistory).reduce((arr, cur) =>
	{
		if (!arr.length) // skip first element
			return arr.push(cur), arr
		
		let prevTx = arr[arr.length - 1]
		if (prevTx.hash != cur.hash) // no need to merge
			return arr.push(cur), arr
		
		if (prevTx.incoming)
		{
			prevTx.incoming = false
			prevTx.value = cur.value - prevTx.value
		}
		else
		{
			prevTx.value = prevTx.value - cur.value
		}
		return arr
	}, [] as IBtcHistoryItem[])
}

const TESTNET = {
	testnet: true,
	name: "Testnet",
	blockcypher: testnet,
	loadTxList: async (addr: string) => bcyMergeTxs((await testnet.getAddressInfo(addr)).txrefs)
}
const MAINNET = {
	testnet: false,
	name: "Mainnet",
	blockcypher: mainnet,
	loadTxList: async (addr: string) => bcyMergeTxs((await mainnet.getAddressInfo(addr)).txrefs)
}
const CHAINS = {
	'00': MAINNET,       // Pubkey hash (P2PKH address)     17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem
	'05': MAINNET,       // Script hash (P2SH address)      3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX
	'0488b21e': MAINNET, // BIP32 pubkey                    xpub661MyMwAqRbcEYS8w7XLSVeEsBXy79zSzH1J8...
	'6f': TESTNET,       // Testnet pubkey hash             mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn
	'c4': TESTNET,       // Testnet script hash             2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc
	'043587cf': TESTNET, // Testnet BIP32 pubkey            tpubD6NzVbkrYhZ4WLczPJWReQycCJdd6YVW...
}

export const defaultChainId = '00'

function getNetworkByChainId(chainId: IChainId): BtcBlockchain
{
	chainId = chainId.toLowerCase() as IChainId

	let chain = CHAINS[chainId]
	// let httpEndpoint = chain.url
	return {
		networkName: chain.name,
		testnet: chain.testnet,
		getTxHash: (tx) => 'UNKNOWN',
		getUsdValue: () => getUsdRate(),
		loadTxList: wallet => chain.loadTxList(wallet.address),
		pushTx: async tx => (await chain.blockcypher.sendTx(JSON.parse(tx))).tx.hash,
		prepareTx: chain.blockcypher.newTx,
	}
}
const CACHE = { } as { [chainId in IChainId]: BtcBlockchain }
