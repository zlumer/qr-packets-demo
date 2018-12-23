import { IBlockchainSymbol } from "src/store/interop"
import { getCachedNetworkByChainId, EthereumBlockchain } from "./eth-chains"
import { IBlockchain } from "./IBlockchain";

export type GetBlockchain<
	TSym extends IBlockchainSymbol,
	TRet extends IBlockchain<unknown, unknown>
> = { [key in TSym]: (chainId: string | number) => TRet }

export type TypedBlockchains =
	& GetBlockchain<'eth', EthereumBlockchain>
	& GetBlockchain<'eos', never>
	& GetBlockchain<'btc', never>
	& GetBlockchain<'neo', never>
	& GetBlockchain<'pha', never>

export const typedBlockchains: TypedBlockchains = {
	eth: chainId => getCachedNetworkByChainId(chainId),
	eos: chainId => { throw new Error('EOS is not supported yet!') },
	neo: chainId => { throw new Error('EOS is not supported yet!') },
	btc: chainId => { throw new Error('EOS is not supported yet!') },
	pha: chainId => { throw new Error('Phantom is not supported yet!') },
}


// exhaustive type checking (ensure that all blockchains are handled)
type _<T extends keyof TypedBlockchains> = T
type __ = _<IBlockchainSymbol>