import { IWallet } from "src/store/interop"

export interface IBlockchain<TTxHistoryItem, TOutgoingTx>
{
	testnet: boolean
	networkName: string
	getUsdValue(): Promise<number>
	loadTxList(wallet: IWallet): Promise<TTxHistoryItem[]>
	pushTx(tx: TOutgoingTx): Promise<string>
	getTxHash(tx: TOutgoingTx): string
}

export function blockchainFactory<TTxHistoryItem, TOutgoingTx>(
	testnet: boolean,
	networkName: string,
	getUsdValue: () => Promise<number>,
	loadTxList: (wallet: IWallet) => Promise<TTxHistoryItem[]>,
	pushTx: (tx: TOutgoingTx) => Promise<string>,
	getTxHash: (tx: TOutgoingTx) => string
): IBlockchain<TTxHistoryItem, TOutgoingTx>
{
	return {
		testnet,
		networkName,
		getUsdValue,
		loadTxList,
		pushTx,
		getTxHash,
	}
}