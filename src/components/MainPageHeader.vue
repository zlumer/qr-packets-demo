<template>
	<header>
		<logo/>
		<div class="top-menu">
			<a v-for="link in links"
				:key="link.text"
				:href="link.href"
				class="top-menu-link"
			>
			{{link.text}}
			</a>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import Logo from './Logo.vue'

export default Vue.extend({
	data: function()
	{
		return {
			links: [
				{ text: 'Support', href: 'https://github.com/DucaturFw/cold-crypto-web/issues' },
				{ text: 'Privacy policy', href: 'https://duxi.io/cold/COLDCRYPTO_PRIVACY_POLICY.pdf' },
				{ text: 'Terms of use', href: 'https://duxi.io/cold/COLDCRYPTO_TERMS_OF_USE.pdf' },
			]
		}
	},
	components: {
		Logo,
	}
})
</script>


<style lang="scss" scoped>

header {
	height: 4rem;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    grid-area: header / header / header / header;
}
.top-menu {
	display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.9rem;
    margin-top: 1rem;
    margin-right: 1rem;
    flex-flow: row nowrap;
}
.top-menu-link {
    color: rgb(255, 255, 255);
    padding: 1rem;
	text-decoration: none;
}

</style>
