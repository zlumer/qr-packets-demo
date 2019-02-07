import { utils } from "./eth"
import { ABI } from "./eth-contracts"
import Web3 = require('web3')

let web3 = new Web3()

export function getFunctionSignature(methodName: string): string
{
	// TODO: unit test coverage
	return utils.sha3(methodName).replace('0x', '').substr(0, 8)

	// return web3.eth.abi.encodeFunctionSignature(methodName).replace('0x','') // equivalent
}
export function listFunctionSignaturesMap(contract: ABI): { [signature: string]: string }
{
	let funcs = Object.keys(new web3.eth.Contract(contract).methods).filter(x => x.includes('('))
	return funcs.reduce((obj, func) => (obj[getFunctionSignature(func)] = func, obj), {} as {[key: string]: string})
}
export function getMethodNameByFunctionSignature(contract: ABI, signature: string): string
{
	let map = listFunctionSignaturesMap(contract)
	return map[signature.replace('0x', '')]
}
