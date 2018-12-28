<template>
    <div class="app-container">
        <main class="app-main">
            <slot/>
        </main>
        <side-menu/>
    </div>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import SideMenu from '../components/SideMenu.vue'

export default Vue.extend({
	components: {
        SideMenu
	}
})
</script>


<style lang="scss" scoped>
.app-container {
	background: #fff;
    display: grid;
    grid-template-areas: "sidebar main main main" "sidebar footer footer footer";
    grid-template-columns: 16rem auto auto auto;
    grid-template-rows: auto auto;
    min-height: 100vh;
}
.app-main {
    display: flex;
    grid-area: main;
    justify-content: center;
    min-height: calc(100vh - 4rem);
    padding: 2rem;
    background: #FAFAFB;
}
</style>
