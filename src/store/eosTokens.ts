import Vue from "src/vue-ts"
import { StoreOptions, Store as IStore } from "./vuex-type-ext"
import { IChainId, defaultChainId } from "src/blockchains/eos"
import { IWallet } from "./interop"
import { calcWalletId } from "./utils"
import { typedBlockchains } from "src/blockchains"
import { loadTokensList } from "src/blockchains/eos/bloksio"

export const options: SOptions = {
	state: {
		eosTokens: {
			accounts: { },
			tokens: {
				aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906: {},
				e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473: {},
			},
		}
	},
	getters: {
		eosTokens_getTokenList: (state, getters) => wallet =>
		{
			let key = calcWalletId(wallet)
			let tokens = state.eosTokens.accounts[key]
			if (!tokens)
				return []
			
			return Object.keys(tokens)
		},
		eosTokens_getTokenBalance: (state, getters) => (wallet, tokenAddr) =>
		{
			let key = calcWalletId(wallet)
			let tokens = state.eosTokens.accounts[key]
			if (!tokens)
				return ''
			
			return tokens[tokenAddr] ? tokens[tokenAddr].amount : ''
		},
		eosTokens_hasLoadedBalance: (state, getters) => (wallet, tokenAddr) =>
		{
			let key = calcWalletId(wallet)
			let tokens = state.eosTokens.accounts[key]
			if (!tokens)
				return false
			
			let loaded = tokens[tokenAddr] ? !tokens[tokenAddr].loading : false
			return loaded
		},
		eosTokens_getTokenInfo: (state, getters) => (chainId, tokenAddr) =>
		{
			let info = state.eosTokens.tokens[chainId][tokenAddr.toLowerCase()]
			return info
		},
		eosTokens_getTokensInfo: (state, getters) => (chainId, tokenAddrs) =>
		{
			return tokenAddrs
				.map(addr => addr.toLowerCase())
				.map(x => state.eosTokens.tokens[chainId][x])
		},
		eosTokens_hasLoadedTokenList: (state, getters) => (wallet) =>
		{
			let key = calcWalletId(wallet)
			let tokens = state.eosTokens.accounts[key]
			return !!tokens
		}
	},
	mutations: {
		eosTokens_setBalanceLoading(state, { wallet, tokenAddr, loading })
		{
			let key = calcWalletId(wallet)
			let w = state.eosTokens.accounts[key]
			if (!w)
				w = Vue.set(state.eosTokens.accounts, key, {})
			
			let tkn = w[tokenAddr]
			if (tkn)
				tkn.loading = loading
			else
				Vue.set(w, tokenAddr, { amount: '', loading: loading })
		},
		eosTokens_setTokenBalance(state, { wallet, contractAddr, amount })
		{
			let key = calcWalletId(wallet)
			let w = state.eosTokens.accounts[key]
			if (!w)
				w = Vue.set(state.eosTokens.accounts, key, {})
			
			let tkn = w[contractAddr]
			if (tkn)
				tkn.amount = amount
			else
				Vue.set(w, contractAddr, { amount: amount, loading: false })
		},
		eosTokens_setTokenBalanceEmpty(state, { wallet })
		{
			let key = calcWalletId(wallet)
			Vue.set(state.eosTokens.accounts, key, {})
		},
		eosTokens_setTokenInfo(state, { chainId, contractAddr, info })
		{
			let tokens = state.eosTokens.tokens[chainId]
			Vue.set(tokens, contractAddr, info)
		},
	},
	actions: {
		async eosTokens_updateTokenList(store, { wallet })
		{
			if (wallet.chainId != defaultChainId)
			{
				store.commit('eosTokens_setTokenBalanceEmpty', { wallet })
				return Promise.resolve() // ignore testnet tokens list
			}
			
			let res = await loadTokensList(wallet.address)
			
			res.tokens.forEach(info =>
			{
				store.commit('eosTokens_setTokenInfo', {
					chainId: wallet.chainId as IChainId,
					contractAddr: info.contract,
					info: {
						notatoken: false,
						decimals: parseInt(info.decimals),
						name: info.metadata.name || info.currency,
						symbol: info.currency,
					}
				})
				store.commit('eosTokens_setTokenBalance', {
					wallet: wallet,
					contractAddr: info.contract,
					amount: info.amount + "",
				})
			})

			let addresses = res.tokens.map(x => x.contract)
			if (!addresses.length)
				store.commit('eosTokens_setTokenBalanceEmpty', { wallet })
			addresses.forEach(addr =>
			{
				/* store.dispatch('eosTokens_updateTokenBalance', {
					wallet,
					tokenAddr: addr
				}) */
				/* store.dispatch('eosTokens_updateTokenInfo', {
					chainId: wallet.chainId as IChainId,
					tokenAddr: addr,
				}) */
			})
		},
		async eosTokens_updateTokenBalance(store, { wallet, tokenAddr })
		{
			store.commit('eosTokens_setBalanceLoading', {
				wallet,
				tokenAddr,
				loading: true
			})
			// let net = typedBlockchains.eth(wallet.chainId)
			// let balance = await net.web3.getErc20Balance(wallet.address, tokenAddr)
			/* store.commit('eosTokens_setTokenBalance', {
				wallet: wallet,
				contractAddr: tokenAddr,
				amount: balance
			}) */
			store.commit('eosTokens_setBalanceLoading', {
				wallet: wallet,
				tokenAddr: tokenAddr,
				loading: false
			})
			store.dispatch('eosTokens_updateTokenInfo', {
				chainId: wallet.chainId as IChainId,
				tokenAddr
			})
		},
		async eosTokens_updateTokenInfo(store, { chainId, tokenAddr })
		{
			if (store.state.eosTokens.tokens[chainId][tokenAddr])
				return /* console.log(`Store.EosTokens: token ${tokenAddr} on ${chainId} already loaded`), */ Promise.resolve()
			
			let info = await typedBlockchains.eth(chainId).web3.getTokenInfo(tokenAddr)
			if (info.notatoken)
				return store.commit('eosTokens_setTokenInfo', {
					chainId,
					contractAddr: tokenAddr,
					info: { notatoken: true }
				})
			let price = 0
			store.commit('eosTokens_setTokenInfo', {
				chainId: chainId,
				contractAddr: tokenAddr,
				info: {
					notatoken: false,
					symbol: info.symbol,
					decimals: info.decimals,
					name: info.name,
					verified: false,
				}
			})
		}
	},
}

export type Store = IStore<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>
export type SOptions = StoreOptions<IState, MutationPayloadMap, ActionPayloadMap, GettersReturnMap>

export interface IState
{
	eosTokens: {
		// lastAddressInfoTime: number
		// addressInfoQueue: Promise<any>[]
		tokens: {
			[chainId in IChainId]: {
				[contractAddr: string]: ITokenInfo
			}
		},
		accounts: {
			[walletKey: string]: {
				[contractAddr: string]: {
					loading: boolean
					amount: string
				}
			}
		}
	}
}
export type ITokenInfo = ITokenInfoOk | INotAToken
interface ITokenInfoOk
{
	notatoken: false

	name: string
	symbol: string
	decimals: number
	// price: number
	verified?: boolean
}
interface INotAToken
{
	notatoken: true
}

type MutationPayloadMap = {
	// eosTokens_updateTokens: { address: string, tokens: { [token: string]: number } }
	eosTokens_setTokenBalanceEmpty: { wallet: IWallet }
	eosTokens_setTokenBalance: { wallet: IWallet, contractAddr: string, amount: string }
	eosTokens_setTokenInfo: { chainId: IChainId, contractAddr: string, info: ITokenInfo }
	eosTokens_setBalanceLoading: { wallet: IWallet, tokenAddr: string, loading: boolean }
}

type ActionPayloadMap = {
	eosTokens_updateTokenList: { wallet: IWallet }
	eosTokens_updateTokenBalance: { wallet: IWallet, tokenAddr: string }
	eosTokens_updateTokenInfo: { chainId: IChainId, tokenAddr: string }
}

type GettersReturnMap = {
	// eosTokens_timePassed: number
	// eosTokens_canGetAddressInfo: boolean
	eosTokens_getTokenList: (wallet: IWallet) => string[]
	eosTokens_hasLoadedTokenList: (wallet: IWallet) => boolean
	eosTokens_getTokenBalance: (wallet: IWallet, tokenAddr: string) => string
	eosTokens_hasLoadedBalance: (wallet: IWallet, tokenAddr: string) => boolean
	eosTokens_getTokenInfo: (chainId: IChainId, tokenAddr: string) => ITokenInfo | undefined
	eosTokens_getTokensInfo: (chainId: IChainId, tokenAddrs: string[]) => (ITokenInfo | undefined)[]
}