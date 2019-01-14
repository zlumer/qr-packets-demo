<template>
	<div>
		<button type="submit" @click="onButton" :disabled="signing || !canSign">SIGN TX</button>
		<span v-if="loading">loading...</span>
		<remote-call v-if="signing && !loading" :method="method" :params="txJson" @result="onResult"></remote-call>
		<button type="submit" @click="onCancel" v-if="signing && !loading">Cancel</button>
	</div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import RemoteCall from './RemoteCall.vue'

export default Vue.extend({
	data()
	{
		return {
			signing: false,
		}
	},
	props: {
		loading: {
			type: Boolean,
			required: false,
			default: false
		},
		txJson: {
			type: String,
			required: false
		},
		method: {
			type: String,
			required: true,
		},
		canSign: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		wallet: function()
		{
			return this.$store.state.currentWallet!
		},
		blockchainId: function()
		{
			return this.wallet.blockchain
		},
		blockchain: function()
		{
			return this.$store.getters.currentBlockchain
		}
	},
	methods: {
		async onButton()
		{
			this.signing = true
			this.$emit('sign')
		},
		onCancel()
		{
			this.signing = false
			this.$emit('cancel')
		},
		onResult(signedTx: string)
		{
			console.log(`signed tx: ${signedTx}`)
			this.$store.commit('setTxToPush', { tx: signedTx, wallet: this.wallet })
			this.$router.push({ name: "pushtx", params: {
				blockchain: this.blockchainId,
				txhash: this.blockchain.getTxHash(signedTx)
			} })
		}
	},
	components: {
		RemoteCall
	}
})
</script>

