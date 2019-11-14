<template>
    <div class="container" :class="cssident">
		<mp-header />
    	<main>
        	<slot/>
    	</main>
		<mp-footer />
	</div>
</template>

<script>
import Vue from 'src/vue-ts'
import Header from 'src/components/MainPageHeader.vue'
import Footer from 'src/components/MainPageFooter.vue'
import { cssident } from 'src/multiproj'

export default Vue.extend({
	data: function()
	{
		return {
			cssident
		}
	},
	components: {
		"mp-header": Header,
		"mp-footer": Footer,
	}
})
</script>

<style lang="scss" scoped>

.container {
	min-height: 100vh;
	&.cold {                                                                                                             
					background: linear-gradient(57deg, rgb(13, 13, 13) 0%, rgb(22, 10, 46) 100%);                                
	}                                                                                                                    
	&.ice {                                                                                                              
					background: #5ca0d3;                                                                                         
	}
}

main {
	-webkit-box-align: center;
    align-items: center;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    min-height: calc((100vh - 4rem) - 4rem);
}

</style>