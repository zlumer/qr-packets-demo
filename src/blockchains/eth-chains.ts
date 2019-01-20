import { IBlockchain } from "./IBlockchain"
import { getRawTxHash, getNetwork } from "./eth"
import * as coinmarketcap from "./coinmarketcap"
import * as etherscan from "./etherscan"

export type IChainId = keyof typeof CHAINS
export type IChainSettings = typeof CHAINS[IChainId]

const CHAINS = {
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

export interface IEthTxHistoryItem
{
	hash: string
	from: string
	to: string
	value: string
}

export type EthereumBlockchain = IBlockchain<IEthTxHistoryItem, string> & { web3: ReturnType<typeof getNetwork> }

const getUsdRate = () => coinmarketcap.loadPrice(coinmarketcap.tickerIds.eth)

export function getNetworkByChainId(chainId: number | string): EthereumBlockchain
{
	chainId = parseInt(chainId + "")
	let { testnet, ...settings } = CHAINS[chainId as IChainId]
	if (!settings)
		throw new Error(`ETH: network with chain id "${chainId}" is not supported!`)
	
	let web3 = getNetwork(settings.url)
	
	return {
		testnet,
		networkName: settings.name,
		getTxHash: getRawTxHash,
		pushTx: async tx =>
		{
			let receipt = await web3.sendTx(tx)
			return receipt.transactionHash
		},
		getUsdValue: testnet ? () => Promise.resolve(0) : getUsdRate,
		loadTxList: wallet => settings.loadTxList(wallet.address),
		web3
	}
}
export function getCachedNetworkByChainId(chainId: number | string): EthereumBlockchain
{
	chainId = parseInt(chainId + "")
	if (isNaN(chainId))
		chainId = 1 // eth mainnet
	
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId)
}
