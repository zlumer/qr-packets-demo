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
		etherscan: etherscan.mainnet
	},
	3: {
		testnet: true,
		name: "Ropsten",
		url: "wss://ropsten.infura.io/ws",
		etherscan: etherscan.ropsten
	},
	4: {
		testnet: true,
		name: "Rinkeby",
		url: 'https://rinkeby.infura.io/',
		etherscan: etherscan.rinkeby
	},
	42: {
		testnet: true,
		name: "Kovan",
		url: 'wss://kovan.infura.io/_ws',
		etherscan: etherscan.kovan
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

export type EthereumBlockchain = IBlockchain<IEthTxHistoryItem, string>
	& { web3: ReturnType<typeof getNetwork> }
	& { etherscan: etherscan.IEtherscanNetwork }

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
		loadTxList: wallet => settings.etherscan.loadTxList(wallet.address),
		etherscan: settings.etherscan,
		web3
	}
}

export const defaultChainId = 1 // eth mainnet

export function getCachedNetworkByChainId(chainId: number | string): EthereumBlockchain
{
	chainId = parseInt(chainId + "")
	if (isNaN(chainId))
		chainId = defaultChainId
	
	let chain = CACHE[chainId as IChainId]
	if (chain)
		return chain
	
	return CACHE[chainId as IChainId] = getNetworkByChainId(chainId)
}
