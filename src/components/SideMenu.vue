<template>
	<aside class="side-container">
		<logo :black="true"/>
		<menu class="menu-container">
			<div class="link black">Wallets</div>
			<router-link
				v-for="w in wallets"
				tag="div"
				class="link"
				:class="identcss({ blue: isActiveWallet(w) })"
				:to="link(w)"
				:key="calcWalletId(w)"
			>
				<component
					:is="isActiveWallet(w) ? 'span' : 'a'"
				>
					<crypto-icon
						class="icon"
						:blockchain="w.blockchain"
					/>
					<span
						class="address"
					>{{w.address}}</span>
				</component>
			</router-link>
		</menu>
	</aside>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import Logo from './Logo.vue'
import CryptoIcon from './icons/CryptoIcon.vue'
import { IWallet } from 'src/store/interop'
import cfg from 'src/config'

export default Vue.extend({
	computed: {
		wallets: function()
		{
			let wallets = this.$store.state.wallets
			if (!wallets.length && this.currentWallet && this.currentWallet.address)
				return [this.currentWallet]
			
			return wallets
		},
		selectedAddress: function()
		{
			console.log(JSON.stringify(this.currentWallet))
			return this.currentWallet ? this.currentWallet.address : ''
		},
		currentWallet: function()
		{
			return this.$store.state.currentWallet
		},
		calcWalletId: function()
		{
			return this.$store.getters.calcWalletId
		},
	},
	methods: {
		link(w: IWallet)
		{
			return {
				name: 'wallet',
				params: {
					address: w.address,
					blockchain: w.blockchain,
				},
				query: { chainId: w.chainId }
			}
		},
		identcss: function(obj: {})
  	{
			return { [cfg.ident]: true, ...obj }
  	},
		isActiveWallet: function(w: IWallet)
		{
			if (!this.selectedAddress || !w || !w.address)
				return false
			
			return this.selectedAddress.toLowerCase() === w.address.toLowerCase()
		}
	},
	components: {
		Logo,
		CryptoIcon,
	}
})
</script>

<style lang="scss" scoped>
.side-container {
	background: #fff;
	box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04);
	grid-area: sidebar;
}
.menu-container {
	padding: 0;
	margin: 0;
}
.link {
	font-weight:bold;
	padding: 0.75rem 0.5rem;
	display: block;
	text-decoration: none;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	color: #160a2e;
}
.link.blue {
	&.ice {                                                                                                       
          color: #5ca0d3;                                                                                         
          border-left: 3px solid #5ca0d3;                                                                         
          background: #f0e9e9;                                                                                    
  }                                                                                                               
  &.cold {                                                                                                        
          color: #00BCF9;                                                                                         
          border-left: 3px solid #00BCF9;                                                                         
          background: rgba(179, 236, 254, 0.6);                                                                   
  }

.link .icon {
	vertical-align: middle;
	width: 2rem;
	height: 2rem;
}
.link .address {
	line-height: 1rem;
	padding: 0.5rem 0;
}
.link a {
	color: inherit;
	text-decoration: none;
}
</style>