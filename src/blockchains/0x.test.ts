import { getMethod } from "./0x"

describe('0x tests', () =>
{
	it('should return method name by signature', () =>
	{
		let m = getMethod('18978e82')
		expect(m).toBeTruthy()
		expect(m.split('(')[0]).toEqual('marketBuyOrdersWithEth')
	})
	it('should return method name by signature with 0x', () =>
	{
		let m = getMethod('0x18978e82')
		expect(m).toBeTruthy()
		expect(m.split('(')[0]).toEqual('marketBuyOrdersWithEth')
	})
})