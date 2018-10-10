<template>
	<QrImage :qrcode="qrcode"/>
</template>

<script lang="ts">
import Vue from 'vue'
import QrImage from "./QrImage.vue"

export default Vue.extend({
	components: {
		QrImage
	},
	data: function ()
	{
		return {
			qrindex: 0,
			timer: 0,
		}
	},
	props: {
		qrs: Array as () => string[],
		showTimeout: {
			type: Number,
			default: 275
		},
	},
	computed: {
		qrcode: function ()
		{
			return this.qrs[this.qrindex]
		}
	},
	watch: {
		qrs()
		{
			this.qrindex = 0
			if (this.timer)
				window.clearInterval(this.timer), this.timer = 0

			if (this.qrs.length <= 1)
				return
			
			this.timer = window.setInterval(() => this.showNext(), this.showTimeout)
		}
	},
	methods: {
		showNext()
		{
			if (!this.qrs.length)
				return
			
			this.qrindex = (this.qrindex + 1) % this.qrs.length
		}
	}
})
</script>
>