import { IBlockchainSymbol } from "src/store/interop"
import { IBlockchain } from "./IBlockchain"
import { EthereumBlockchain, getCachedNetworkByChainId as getEth, defaultChainId as ethCid } from "./eth-chains"
import { EosBlockchain, getCachedNetworkByChainId as getEos, defaultChainId as eosCid } from "./eos"
import { BtcBlockchain, getCachedNetworkByChainId as getBtc, defaultChainId as btcCid } from "./btc"
import { BchBlockchain, getCachedNetworkByChainId as getBch, defaultChainId as bchCid } from "./bch"

export type GetBlockchain<
	TSym extends IBlockchainSymbol,
	TRet extends IBlockchain<unknown, unknown>
> = { [key in TSym]: (chainId: string | number) => TRet }

export type TypedBlockchains =
	& GetBlockchain<'eth', EthereumBlockchain>
	& GetBlockchain<'eos', EosBlockchain>
	& GetBlockchain<'btc', BtcBlockchain>
	& GetBlockchain<'bch', BchBlockchain>
	& GetBlockchain<'neo', never>
	& GetBlockchain<'pha', never>

export const typedBlockchains: TypedBlockchains = {
	eth: chainId => getEth(chainId),
	eos: chainId => getEos(chainId),
	neo: chainId => { throw new Error('NEO is not supported yet!') },
	btc: chainId => getBtc(chainId),
	bch: chainId => getBch(chainId),
	pha: chainId => { throw new Error('Phantom is not supported yet!') },
}

export const defaultChainIds = {
	eth: ethCid,
	eos: eosCid,
	btc: btcCid,
	bch: bchCid,
	neo: '',
	pha: '',
}


// exhaustive type checking (ensure that all blockchains are handled)
type _<T extends keyof TypedBlockchains> = T
type __ = _<IBlockchainSymbol>