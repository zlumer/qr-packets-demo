<template>
	<!--<a class="css-1fdxz4i" href="/cold/">-->
		<router-link to="/" class="logo-link">
            <h1 :style="{ color: hcolor }">Ice Wallet<sup>beta mode</sup></h1>
		</router-link>
	<!--</a>-->
</template>

<script lang="ts">
import Vue from 'src/vue-ts'

export default Vue.extend({
    props: {
        black: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        hcolor: function()
        {
            return this.black ? 'rgb(23, 25, 51)' : '#fff'
        }
    }
})
</script>


<style lang="scss" scoped>
.logo-link {
    display: block;
    text-decoration: none;
}
h1 {
    font-size: 1.3rem;
    margin: 0;
    text-transform: uppercase;
    padding: 2rem 1.6rem;
    line-height: 1.3rem;
    width: inherit;
}

sup {
	color: #ff4057;
    font-size: 0.5rem;
    text-transform: lowercase;
    vertical-align: super;
}
</style>
