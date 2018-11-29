import { IJsonRpcMessage, IHostResult, IHostCommand, IHostError } from "./hostproto"

export function isResult(msg: IJsonRpcMessage): msg is IHostResult<unknown>
{
	return ("result" in msg)
}
export function isMethodCall(msg: IJsonRpcMessage): msg is IHostCommand<unknown[], unknown>
{
	return ("method" in msg)
}
export function isError(msg: IJsonRpcMessage): msg is IHostError
{
	return ("error" in msg)
}