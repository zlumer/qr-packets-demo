import { IUints, IInts, IBytes, IFixed, IUfixed } from './eth-abi-types'

export type IAbiArgumentType = 'string' | 'address' | 'bool' | 'function' | IUints | IInts | IFixed | IBytes | IUfixed
export interface IAbiArgument
{
	name: string
	type: IAbiArgumentType
	components?: IAbiArgument[]
}
export interface IAbiEventInput extends IAbiArgument
{
	indexed: boolean
}
export type IStateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'
export interface IAbiFunctionEntry
{
	type?: 'function'
	name: string
	inputs: IAbiArgument[]
	outputs?: IAbiArgument[]
	stateMutability: IStateMutability
	// payable?: boolean // deprecated
	// constant?: boolean // deprecated
}
export interface IAbiEventEntry
{
	type: 'event'
	name: string
	inputs: IAbiEventInput[]
	anonymous: boolean
}
export interface IAbiConstructorEntry
{
	type: "constructor"
	inputs: IAbiArgument[]
	stateMutability: IStateMutability
}
export interface IAbiFallbackEntry
{
	type: "fallback"
	stateMutability: IStateMutability
}
export type IAbiEntry = IAbiFallbackEntry | IAbiFunctionEntry | IAbiEventEntry | IAbiConstructorEntry
export type ABI = IAbiEntry[]