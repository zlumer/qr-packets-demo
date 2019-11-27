import { IWallet } from "./interop"

export function calcWalletId(wallet: IWallet)
{
	return `${wallet.blockchain}/${wallet.chainId}/${wallet.address}`
}
