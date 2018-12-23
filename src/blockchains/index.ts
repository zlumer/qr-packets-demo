import { IBlockchainSymbol } from "src/store/interop"
import { EthereumBlockchain, getCachedNetworkByChainId as getEth } from "./eth-chains"
import { IBlockchain } from "./IBlockchain"
import { EosBlockchain, getCachedNetworkByChainId as getEos } from "./eos"

export type GetBlockchain<
	TSym extends IBlockchainSymbol,
	TRet extends IBlockchain<unknown, unknown>
> = { [key in TSym]: (chainId: string | number) => TRet }

export type TypedBlockchains =
	& GetBlockchain<'eth', EthereumBlockchain>
	& GetBlockchain<'eos', EosBlockchain>
	& GetBlockchain<'btc', never>
	& GetBlockchain<'neo', never>
	& GetBlockchain<'pha', never>

export const typedBlockchains: TypedBlockchains = {
	eth: chainId => getEth(chainId),
	eos: chainId => getEos(chainId),
	neo: chainId => { throw new Error('NEO is not supported yet!') },
	btc: chainId => { throw new Error('BTC is not supported yet!') },
	pha: chainId => { throw new Error('Phantom is not supported yet!') },
}


// exhaustive type checking (ensure that all blockchains are handled)
type _<T extends keyof TypedBlockchains> = T
type __ = _<IBlockchainSymbol>