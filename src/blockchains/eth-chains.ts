import { IBlockchain } from "./IBlockchain"
import { TransactionReceipt } from "web3/types"
import { getRawTxHash, getNetwork } from "./eth"
import * as coinmarketcap from "./coinmarketcap"
import * as etherscan from "./etherscan"

export type IChainId = keyof typeof SETTINGS
export type IChainSettings = typeof SETTINGS[IChainId]

const SETTINGS = {
	1: {
		testnet: false,
		name: "Mainnet",
		url: 'https://mainnet.infura.io/',
		loadTxList: etherscan.mainnet.loadTxList
	},
	3: {
		testnet: true,
		name: "Ropsten",
		url: "wss://ropsten.infura.io/ws",
		loadTxList: etherscan.ropsten.loadTxList
	},
	4: {
		testnet: true,
		name: "Rinkeby",
		url: 'https://rinkeby.infura.io/',
		loadTxList: etherscan.rinkeby.loadTxList
	},
	42: {
		testnet: true,
		name: "Kovan",
		url: 'wss://kovan.infura.io/_ws',
		loadTxList: etherscan.kovan.loadTxList
	},
}
const CACHE = { } as { [chainId in IChainId]: EthereumBlockchain }

interface IEthTxHistoryItem
{
	hash: string
	from: string
	to: string
	value: string
}

export type EthereumBlockchain = IBlockchain<IEthTxHistoryItem, string, TransactionReceipt> & { web3: ReturnType<typeof getNetwork> }

const getUsdRate = () => coinmarketcap.loadPrice('1027')

export function getNetworkByChainId(chainId: number | string): EthereumBlockchain
{
	chainId = parseInt(chainId + "")
	let { testnet, ...settings } = SETTINGS[chainId as IChainId]
	if (!settings)
		throw new Error(`ETH: network with chain id "${chainId}" is not supported!`)
	
	let web3 = getNetwork(settings.url)
	
	return {
		testnet,
		networkName: settings.name,
		getTxHash: getRawTxHash,
		pushTx: tx => web3.sendTx(tx),
		getUsdValue: testnet ? () => Promise.resolve(NaN) : getUsdRate,
		loadTxList: wallet => settings.loadTxList(wallet.address),
		web3
	}
}
export function getCachedNetworkByChainId(chainId: number | string): EthereumBlockchain
{
	chainId = parseInt(chainId + "")
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId)
}
