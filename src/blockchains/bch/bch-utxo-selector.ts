import { ITransactionsResponse, IUtxoResponse, IUtxo } from "./bitcoincom.i"

export function utxoSelect(utxos: IUtxo[], targetValue: number): { utxos: IUtxo[], fee: number } {
  var result = { utxos: <IUtxo[]>[], fee: 0 }

  if (targetValue <= 0) {
    return result
  }

  let doubleTargetValue = targetValue * 2

  var numOutputs = 2
  var numInputs = 2

  function fee(): number {
    return calculateFee(numInputs, numOutputs)
  }

  function targetWithFee(): number {
    return targetValue + fee()
  }

  function targetWithFeeAndDust(): number {
    let dustThreshhold = 3 * 182
    return targetWithFee() + dustThreshhold
  }

  

  let sortedUtxos: IUtxo[] = utxos.sort((a: IUtxo, b: IUtxo) => { return a.satoshis < b.satoshis ? -1 : (a.satoshis > b.satoshis ? 1 : 0) })

  if (usum(utxos) < targetValue || sortedUtxos.length == 0) {
    console.log("mark1")
    
    throw "unsufficient funds"
  }

  function distFrom2x(val: number): number {
    if (val > doubleTargetValue) { return val - doubleTargetValue } else { return doubleTargetValue - val }
  }

  function eachSlice(array: IUtxo[], size: number) {
    var result = []
    for (var i = 0, l = array.length; i < l; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  // looking for utxo combinations
  for (let numTx = 1; numTx <= sortedUtxos.length; numTx++) {
    numInputs = numTx
    let nOutputsSlices = eachSlice(sortedUtxos, numInputs)
    console.log(nOutputsSlices)
    var nOutputsInRange = nOutputsSlices.filter((value: IUtxo[]) => {
      return usum(value) >= targetWithFeeAndDust()
    })

    nOutputsInRange = nOutputsInRange.sort((a: IUtxo[], b: IUtxo[]) => {
      if (distFrom2x(usum(a)) < distFrom2x(usum(b))) {
        return -1
      } else if (distFrom2x(usum(a)) > distFrom2x(usum(b))) {
        return 1
      } else {
        return 0
      }
    })

    if (nOutputsInRange.length > 0) {
      result.utxos = nOutputsInRange[0];
      result.fee = fee()
      return result
    }
  }


  // if didnt find any better, try with dust
  for (let numTx = 1; numTx <= sortedUtxos.length; numTx++) {
    numInputs = numTx
    let nOutputsSlices = eachSlice(sortedUtxos, numInputs)
    var nOutputsInRange = nOutputsSlices.filter((value: IUtxo[]) => {
      return usum(value) >= targetWithFee()
    })

    if (nOutputsInRange.length > 0) {
      result.utxos = nOutputsInRange[0];
      result.fee = fee()
      return result;
    }
  }
  throw "insufficient funds";
}

export function usum(array: IUtxo[]): number {
  var sum = 0
  for (let utxo of array) {
    sum += utxo.satoshis
  }
  return sum
}

function calculateFee(nIn: number, nOut: number): number {
  let feePerByte = 1
  var txsize = ((148 * nIn) + (34 * nOut) + 10)

  return txsize * feePerByte
}

