export interface IAddressResponse
{
    address:             string
    total_received:      number
    total_sent:          number
    balance:             number
    unconfirmed_balance: number
    final_balance:       number
    n_tx:                number
    unconfirmed_n_tx:    number
    final_n_tx:          number
    txrefs:              ITxRef[]
    tx_url:              string
}

export interface ITxRef
{
    tx_hash:       string
    block_height:  number
    tx_input_n:    number
    tx_output_n:   number
    value:         number
    ref_balance:   number
    confirmations: number
    confirmed:     Date
    double_spend:  boolean
    spent?:        boolean
    spent_by?:     string
}
export interface IAddressFullResponse
{
    address:             string
    total_received:      number
    total_sent:          number
    balance:             number
    unconfirmed_balance: number
    final_balance:       number
    n_tx:                number
    unconfirmed_n_tx:    number
    final_n_tx:          number
    txs:                 IFullTx[]
}

export interface IFullTx
{
    block_hash:    string
    block_height:  number
    block_index:   number
    hash:          string
    addresses:     string[]
    total:         number
    fees:          number
    size:          number
    preference:    ITxPreference
    relayed_by?:   string
    confirmed:     Date
    received:      Date
    ver:           number
    double_spend:  boolean
    vin_sz:        number
    vout_sz:       number
    confirmations: number
    confidence:    number
    inputs:        ITxInput[]
    outputs:       ITxOutput[]
}

export interface ITxInput
{
    prev_hash:    string
    output_index: number
    script:       string
    output_value: number
    sequence:     number
    addresses:    string[]
    script_type:  IScriptType
    age:          number
}

export enum IScriptType
{
    PayToPubkeyHash = "pay-to-pubkey-hash",
}

export interface ITxOutput
{
    value:       number
    script:      string
    addresses:   string[]
    script_type: IScriptType
    spent_by?:   string
}

export enum ITxPreference
{
    Low = "low",
    Medium = "medium",
}

export interface INewTxResponse
{
	tx: unknown
	tosign: string[]
}
