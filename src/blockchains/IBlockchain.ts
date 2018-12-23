import { IWallet } from "src/store/interop"

export interface IBlockchain<TTxHistoryItem, TOutgoingTx, TTxPushResult>
{
	testnet: boolean
	networkName: string
	getUsdValue(): Promise<number>
	loadTxList(wallet: IWallet): Promise<TTxHistoryItem[]>
	pushTx(tx: TOutgoingTx): Promise<TTxPushResult>
	getTxHash(tx: TOutgoingTx): string
}

export function blockchainFactory<TTxHistoryItem, TOutgoingTx, TTxPushResult>(
	testnet: boolean,
	networkName: string,
	getUsdValue: () => Promise<number>,
	loadTxList: (wallet: IWallet) => Promise<TTxHistoryItem[]>,
	pushTx: (tx: TOutgoingTx) => Promise<TTxPushResult>,
	getTxHash: (tx: TOutgoingTx) => string
): IBlockchain<TTxHistoryItem, TOutgoingTx, TTxPushResult>
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