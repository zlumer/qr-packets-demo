<template>
	<div class="column">
		<router-view></router-view>
		<div class="row">
			<div class="column column-buttons">
				<router-link :to="{name:'newtx', query:{ chainId: wallet.chainId }}">
					<button>
						Create New Tx
					</button>
				</router-link>
				<router-link :to="{name:'erc20', query:{ chainId: wallet.chainId }}">
					<button>
						Transfer ERC20
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
button {
	border: 0;
	border-radius: .2rem;
	cursor: pointer;
	font-size: .9rem;
	margin: .25rem 0;
	outline: 0;
	padding: .5rem 2rem;
	line-height: 1.45rem;
	width: 100%;
	border-radius: 6rem;
	background: #00BCF9;
	color: #fff;
	transition: .2s ease-in-out all;
	font-size: 1.1rem;	
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


<script lang="ts">
import Vue from 'src/vue-ts'
import TxListHoc from './blockchain/TxListHoc.vue'

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
			return this.$store.getters.currentBlockchain.networkName
		},
	},
	components: {
		TxListHoc
	},
})
</script>
