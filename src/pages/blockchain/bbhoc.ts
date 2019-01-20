import Vue from 'src/vue-ts'

import { IBlockchainSymbol, IWallet } from 'src/store/interop'
import VueOrig, { VueConstructor } from 'vue'

let bb = Vue.extend({
	props: {
		blockchain: {
			type: String as () => IBlockchainSymbol,
			required: true,
		},
		eth: Function as any as () => VueConstructor<VueOrig>,
		eos: Function as any as () => VueConstructor<VueOrig>,
		neo: Function as any as () => VueConstructor<VueOrig>,
		btc: Function as any as () => VueConstructor<VueOrig>,
		pha: Function as any as () => VueConstructor<VueOrig>,
		props: Object,
	},
	computed: {
	},
	render: function (h)
	{
		let comp = this[this.blockchain]
		if (!comp)
			return h('div', [`error: no component for blockchain ${this.blockchain} (${comp})`])
		
		// console.log(`BBHOC render with props:`)
		// console.log(this.props)
		return h(comp, {props: this.props})
	}
})

export function generate(chains: {[key in IBlockchainSymbol]?: VueConstructor<VueOrig>})
{
	return Vue.extend({
		props: {
			wallet: {
				type: Object as () => IWallet,
				required: false,
			},
			blockchain: {
				type: String as () => IBlockchainSymbol,
				required: false,
			}
		},
		render: function(h)
		{
			let wallet = this.wallet || this.$store.state.currentWallet
			// console.log(`BBHOC wallet:`)
			// console.log(wallet)
			let blockchain = this.blockchain || (wallet && wallet.blockchain)
			// console.log(blockchain)
			return h(bb, {
				props: {
					wallet,
					blockchain,
					props: this.$props,
					...chains,
				}
			})
		},
	})
}
