export type IBlockchainSymbol = 'eth' | 'btc' | 'neo' | 'eos' | 'pha'

export type IWallet = {
	blockchain: IBlockchainSymbol
	address: string
	chainId: string | number
}
export type IMethodABI = {
	method: string
	args: string[]
}
export type ISignature = string
export type ISignedTx = string

export type IOutgoingEthTransferTx = {
	nonce: number
	gasPrice: string
	to: string
	value: string
}
export type IOutgoingEthCallTx = IOutgoingEthTransferTx & {
	gasLimit: string
	data: string
}

export type IOutgoingEosTransferTx = {

}
