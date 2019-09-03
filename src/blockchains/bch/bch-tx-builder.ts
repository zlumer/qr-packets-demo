import { IDest, IUtxo, INewTx } from "./bitcoincom.i"
import { utxoSelect, usum } from "./bch-utxo-selector"

export function buildTx(value: string, to: string, from: string, utxos: IUtxo[], scriptPubKey: string): INewTx {
  let satoshis = parseInt(value)
  let selected = utxoSelect(utxos, satoshis)
  let total = usum(selected.utxos)
  let change = total - satoshis - selected.fee
  console.log('selected UTXOS. total: ' + total + ' fee: ' + selected.fee + ' change: ' + change)
  console.log(selected)

  let destinations: IDest[] = [{ address: to, value: satoshis }, { address: from, value: change }]

  return {
    destinations: destinations,
    utxos: utxos,
    scriptPubKey: scriptPubKey
  }
}