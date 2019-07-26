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
	// empty for now
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

function blockcypherTxToHistory(tx: ITxRef)
{
	return {
		hash: tx.tx_hash,
		value: tx.value,
		date: tx.confirmed + "",
		incoming: (tx.tx_output_n >= 0)
	}
}

const TESTNET = {
	testnet: true,
	name: "Testnet",
	loadTxList: async (addr: string) => (await testnet.getAddressInfo(addr)).txrefs.map(blockcypherTxToHistory)
}
const MAINNET = {
	testnet: false,
	name: "Mainnet",
	loadTxList: async (addr: string) => (await mainnet.getAddressInfo(addr)).txrefs.map(blockcypherTxToHistory)
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
		getTxHash: (tx) => '0xBTC_FAKE_HASH',
		getUsdValue: () => getUsdRate(),
		loadTxList: wallet => chain.loadTxList(wallet.address),
		pushTx: tx => { throw "BTC pushTx() not implemented!" },
	}
}
const CACHE = { } as { [chainId in IChainId]: BtcBlockchain }
