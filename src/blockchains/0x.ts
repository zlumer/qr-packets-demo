import { listFunctionSignaturesMap } from './eth-tools'

import contract = require('./0x5468a1dc173652ee28d249c271fa9933144746b1.abi.json')

let map = listFunctionSignaturesMap(contract)

export const getMethod = (sig: string) => map[sig.replace('0x', '')]
