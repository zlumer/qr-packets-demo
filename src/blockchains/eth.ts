import Web3 = require('web3')
import { TransactionReceipt } from 'web3/types'

import erc20abi = require('./erc20abi.json')

export const utils = Web3.utils

export function getNetwork(providerUrl: string)
{
	const web3 = new Web3()
	let provider = providerUrl.match(/^wss?\:\/\//) ? new Web3.providers.WebsocketProvider(providerUrl) : new Web3.providers.HttpProvider(providerUrl)
	web3.setProvider(provider)
	
	return {
		async getNonce(address: string): Promise<number>
		{
			return await web3.eth.getTransactionCount(address)
		},
		async getErc20Balance(address: string, tokenAddr: string): Promise<number>
		{
			try
			{
				let cntr = new web3.eth.Contract(erc20abi, tokenAddr)
				let balance = await cntr.methods.balanceOf(address).call()
				return balance
			}
			catch (err)
			{
				console.log(err)
				return NaN
			}
		},
		async getTokenInfo(tokenAddr: string): Promise<{ name: string, symbol: string, decimals: number, notatoken?: boolean }>
		{
			try
			{
				let cntr = new web3.eth.Contract(erc20abi, tokenAddr)
				let [name, symbol] = await Promise.all([cntr.methods.name().call(), cntr.methods.symbol().call()])
				try
				{
					let decimals = await cntr.methods.decimals().call()
					return { name, symbol, decimals: parseInt(decimals) }
				}
				catch (e)
				{

				}
				return { name, symbol, decimals: 18 }
			}
			catch (error)
			{
				console.log(error)
				return { name: '...', symbol: '...', decimals: 18, notatoken: true }
			}
		},
		async sendTx(tx: string): Promise<TransactionReceipt>
		{
			if ("__eth__sendTx" in window)
			{
				console.log('FAKING ETH CALL!!!', tx)
				let txHash = window.__eth__sendTx(tx)
				console.log('tx hash: ', txHash)
				return Promise.resolve(txHash)
			}
			
			console.log(`[ETH] SENDING TX: ${tx}`)
			return await web3.eth.sendSignedTransaction(tx, (err, transactionHash) =>
			{
				console.log('transactionHash: ', transactionHash)

				if (err)
					throw err

				return transactionHash
			})
		}
	}
}

declare global
{
	interface Window
	{
		__eth__sendTx: (tx: string) => Promise<TransactionReceipt>
	}
}

export function getRawTxHash(tx: string): string
{
	// TODO: cover with tests
	return utils.sha3(tx)
}

export function isValidEthAddress(address: string)
{
	return isAddress(address)
}


/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
const isAddress = function (address: string) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
		// check if it has the basic requirements of an address
		// console.log('basic: ', address.length)
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
		// If it's all small caps or all all caps, return true
		// console.log('small')
        return true;
    } else {
		// console.log('checksum')
		// Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
const isChecksumAddress = function (address: string) {
	// Check each case
	var addressHash = utils.sha3(address.toLowerCase());
	addressHash = addressHash.replace('0x', '')
	address = address.replace('0x','')
	// console.log(addressHash)
	// console.log(address)
    for (var i = 0; i < 40; i++ ) {
		// the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};