<template>
    <aside class="side-container">
        <logo :black="true"/>
        <menu class="menu-container">
            <!-- // TODO: Make link to wallets -->
            <div class="link">Wallets</div>
        </menu>
    </aside>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import Logo from './Logo.vue'

export default Vue.extend({
	components: {
        Logo
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
    color: #00BCF9;
    border-left: 3px solid #00BCF9;
    font-weight:bold;
    padding: .75rem 1.5rem;
    background: rgba(179, 236, 254, 0.6);
    display: block;
    text-decoration: none;
}
</style>