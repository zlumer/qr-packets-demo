<template>
	<div v-if="!wallet">ERROR: NO ACTIVE WALLET! (should never happen)</div>
	<div class="column" v-else>
		<overlay-popup v-if="hasPopup"
			:header="popupHeader"
			@close="closePopup"
		>
			<router-view></router-view>
		</overlay-popup>
		<div class="row">
			<div class="column column-buttons">
				<router-link
					:to="{name:'newtx', query:{ chainId: wallet.chainId }}"
				>
					<button class="blue-button" :class="{[cfg.ident]: true}">
						Send {{blockchain.toUpperCase()}}
					</button>
				</router-link>
				<router-link
					v-if="blockchain == 'eth'"
					:to="{name:'erc20', query:{ chainId: wallet.chainId }}"
				>
					<button class="blue-button" :class="{[cfg.ident]: true}">
						Transfer ERC20
					</button>
				</router-link>
				<router-link
					v-if="blockchain == 'eos'"
					:to="{name:'eostok', query:{ chainId: wallet.chainId }}"
				>
					<button class="blue-button" :class="{[cfg.ident]: true}">
						Send tokens
					</button>
				</router-link>
			</div>
			<div class="column column-info">
				<h1>{{blockchain}} Wallet</h1>
				<h2>
					<div class="address">{{address}}</div>
				</h2>
				<h3>
					Network: <b>{{networkName}}</b>
				</h3>
			</div>
		</div>
		<div class="hr"/>
		<tx-list-hoc :wallet="wallet" />
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import TxListHoc from './blockchain/TxListHoc.vue'
import OverlayPopup from 'src/components/popup/OverlayPopup.vue'
import cfg from 'src/config'

export default Vue.extend({
	data()
	{
		return {
		}
	},
	computed: {
		address: function()
		{
			return this.wallet.address
		},
		blockchain: function()
		{
			return this.wallet.blockchain
		},
		wallet: function()
		{
			return this.$store.state.currentWallet!
		},
		networkName: function()
		{
			return this.$store.getters.currentBlockchain!.networkName
		},
		hasPopup: function()
		{
			return !!this.$route.meta.popup
		},
		popupHeader: function()
		{
			const headers = {
				newtx: `Send ${this.blockchain.toUpperCase()}`,
				erc20: 'Send tokens',
				pushtx: 'Push TX',
				eostok: `Send tokens`,
			}
			return headers[this.$route.name as keyof typeof headers] || ''
		},
	},
	methods: {
		closePopup()
		{
			let w = {
				address: this.wallet.address,
				blockchain: this.wallet.blockchain,
			}
			this.$router.push({ name: 'wallet', params: w, query: { chainId: this.wallet.chainId + "" } })
		}
	},
	components: {
		TxListHoc,
		OverlayPopup,
	},
})
</script>

<style lang="scss" scoped>

.column {
	display: flex;
	flex-flow: column nowrap;
	width: 100%;
}
.column-buttons {
	flex-basis: 15rem;
	margin-right: 2rem;
}
.column-info {
	display: flex;
	justify-content: center;
}
.row {
	display: flex;
  	justify-content: space-between;
  	width: 100%;
}
.address {
	font-size: .8rem;
  	line-height: 1.5rem;
}
.hr {
	background-color: transparent;
	height: 1px;
	margin: 1rem 0;
	width: 100%;
}
h1 {
	color: #160A2E;
	font-size: 1.6rem;
	margin: 0;
	text-transform: uppercase;
}
h2 {
	color: #160A2E;
	font-size: 1.4rem;
	font-weight: normal;
	margin: 0 0 .25rem 0;
}
h3 {
	margin: 0;
	padding: 0;
	font-weight: normal;
	font-size: 14px;
}
.copyright {
	color: rgba(255, 255, 255, 0.2);
    font-size: 0.85rem;
    padding-left: 2rem;
}

</style>
