export interface IUtxoResponse {
  utxos:         IUtxo[];
  legacyAddress: string;
  cashAddress:   string;
  slpAddress:    string;
  scriptPubKey:  string;
}

export interface IUtxo {
  txid:          string;
  vout:          number;
  amount:        number;
  satoshis:      number;
  height:        number;
  confirmations: number;
}

export interface INewTx {
  utxos:        IUtxo[],
  destinations: IDest[],
  scriptPubKey: string,
}

export interface IDest {
	address:      string,
	value:        number
}

export interface ITransactionsResponse {
  pagesTotal:    number
  txs:           ITx[]
  legacyAddress: string
  cashAddress:   string
  currentPage:   number
}

export interface ITx {
  txid:          string
  version:       number
  locktime:      number
  vin:           IVin[]
  vout:          IVout[]
  blockhash:     string
  blockheight:   number
  confirmations: number
  time:          number
  blocktime:     number
  valueOut:      number
  size:          number
  valueIn:       number
  fees:          number
}

export interface IVin {
  txid:            string
  vout:            number
  sequence:        number
  n:               number
  scriptSig:       IScriptSig
  addr:            string
  valueSat:        number
  value:           number
  doubleSpentTxID: null
}

export interface IScriptSig {
  hex: string
  asm: string
}

export interface IVout {
  value:        string
  n:            number
  scriptPubKey: IScriptPubKey
  spentTxId:    null | string
  spentIndex:   number | null
  spentHeight:  number | null
}

export interface IScriptPubKey {
  hex:       string
  asm:       string
  addresses: string[]
  type:      "pubkeyhash" | "scripthash"
}
