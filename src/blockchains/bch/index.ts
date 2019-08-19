import { IBlockchain } from "../IBlockchain"
import * as coinmarketcap from "../coinmarketcap"
import { testnet, mainnet } from "./bitcoincom"
import { ITx, ITransactionsResponse } from "./bitcoincom.i"

export interface IBchHistoryItem
{
	hash: string
	value: number
	date: number
	incoming: boolean
}

export type BchBlockchain = IBlockchain<IBchHistoryItem, string> & {
	prepareTx: typeof mainnet.newTx
}

const getUsdRate = () => coinmarketcap.loadPrice(coinmarketcap.tickerIds.bch)

export function getCachedNetworkByChainId(chainId: number | string): BchBlockchain
{
	chainId = chainId + ""
	
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId as IChainId)
}

export type IChainId = keyof typeof CHAINS
export type IChainSettings = typeof CHAINS[IChainId]

function bcyTxToHistory(tx: ITx, addr: string)
{
	return {
		hash: tx.txid,
		value: getTxValue(tx, addr),
		date:  new Date(tx.time * 1000).toDateString(),
		incoming: (tx.valueOut >= 0)
	}
}
function getTxValue(tx: ITx, addr: string): number{
	let positive = true
	for(let input of tx.vin) {
		if (addr == input.addr) {
			positive = false
		}
	}
        
	// value
	var value = 0
	if (positive) {
		for (let out of tx.vout) {
				for (let address of out.scriptPubKey.addresses) {
						if (addr == address) {
								value += parseFloat(out.value)
						}
				}
		}
	} else {
			var v = 0
			for (let out of tx.vout) {
					for(let address of out.scriptPubKey.addresses) {
							if (addr != address) {
									value += parseFloat(out.value)
							}
					}
			}
	}
	console.log((positive? "+" : "") + value)
	return value * 100000000
}

function bcyMergeTxs(txResponse: ITransactionsResponse)
{
	return txResponse.txs.map((tx) => {return bcyTxToHistory(tx, txResponse.legacyAddress)}).reduce((arr, cur) =>
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
	}, [] as IBchHistoryItem[])
}

const TESTNET = {
	testnet: true,
	name: "Testnet",
	loadTxList: async (addr: string) => bcyMergeTxs((await testnet.getAddressInfoFull(addr))),
	pushTx: () => { throw "NOTIMPLENTED" },
	prepareTx: () => { throw "NOTIMPLENTED" },
}
const MAINNET = {
	testnet: false,
	name: "Mainnet",
	loadTxList: async (addr: string) => bcyMergeTxs((await mainnet.getAddressInfoFull(addr))),
	pushTx: () => { throw "NOTIMPLENTED" },
	prepareTx: async (tx: string) => (await mainnet.sendTx(JSON.parse(tx))).tx.hash,
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

function getNetworkByChainId(chainId: IChainId): BchBlockchain
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
		pushTx: chain.pushTx,
		prepareTx: chain.prepareTx,
	}
}
const CACHE = { } as { [chainId in IChainId]: BchBlockchain }
