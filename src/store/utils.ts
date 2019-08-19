import { IWallet } from "./interop"

export function calcWalletId(wallet: IWallet)
{
	return `${wallet.blockchain}/${wallet.chainId}/${wallet.address}`
}

/**
 * https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 * 
 * Creates an object composed of the picked object properties.
 * @param obj The source object
 * @param paths The property paths to pick
 */
export function pick<T, K extends keyof T>(obj: T, paths: K[]): Pick<T, K>
{
	return { ...paths.reduce((mem, key) => ({ ...mem, [key]: obj[key] }), {}) } as Pick<T, K>
}


export function curryFirst<TFirst, TRest extends any[], TRes>(func: (first: TFirst, ...args: TRest) => TRes, firstArg: TFirst)
{
	return (...args: TRest) => func(firstArg, ...args)
}