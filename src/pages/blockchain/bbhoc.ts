import Vue from 'src/vue-ts'

import { IBlockchainSymbol, IWallet } from 'src/store/interop'
import VueOrig, { VueConstructor } from 'vue'

let bb = Vue.extend({
	props: {
		wallet: {
			type: Object as () => IWallet,
			required: true,
		},
		eth: Function as any as () => VueConstructor<VueOrig>,
		eos: Function as any as () => VueConstructor<VueOrig>,
		neo: Function as any as () => VueConstructor<VueOrig>,
		btc: Function as any as () => VueConstructor<VueOrig>,
		pha: Function as any as () => VueConstructor<VueOrig>,
	},
	computed: {
	},
	render: function (h)
	{
		let comp = this[this.wallet.blockchain]
		if (!comp)
			return h('div', [`error: no component for blockchain ${this.wallet.blockchain} (${comp})`])
		
		return h(comp, {props: this.$props})
	}
})

export function generate(chains: {[key in IBlockchainSymbol]?: VueConstructor<VueOrig>})
{
	return Vue.extend({
		props: {
			wallet: {
				type: Object as () => IWallet,
				required: true,
			}
		},
		render: function(h)
		{
			return h(bb, {
				props: {
					wallet: this.wallet,
					...chains
				}
			})
		},
	})
}
