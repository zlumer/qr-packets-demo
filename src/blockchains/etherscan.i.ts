export interface IError
{
	status: "0"
	message: "NOTOK"
	result: string
}
interface ITxBase
{
	blockHash: string
	blockNumber: string
	confirmations: string
	contractAddress: string
	cumulativeGasUsed: string
	from: string
	gas: string
	gasPrice: string
	gasUsed: string
	hash: string
	input: string
	nonce: string
	timeStamp: string
	to: string
	transactionIndex: string
	value: string
}
export interface ITx extends ITxBase
{
	isError: string
	txreceipt_status: string
}
export interface ITokenTx extends ITxBase
{
	tokenDecimal: string // "18"
	tokenName: string
	tokenSymbol: string
}
export interface IResponse<T>
{
	status: "1"
	message:"OK"
	result: T
}