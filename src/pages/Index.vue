<template>
    <white-popup
        header="Welcome!"
        subheader="Sign in to your wallet below"
    >
        <div class="button-container">
            <div class="login-button button-left">
                <router-link to="/login">
                    <button class="button-blue">Airgapped login</button>
                </router-link>
            </div>
            <div class="login-button button-right">
                <router-link to="/webrtc">
                    <button class="button-white">Online login</button>
                </router-link>
            </div>
        </div>
    </white-popup>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'
import WhitePopup from 'src/components/WhitePopup.vue'
import { reset } from 'src/webrtcsingleton'

export default Vue.extend({
    beforeMount()
    {
        reset(true)
    },
    components: {
        WhitePopup,
    }
})
</script>

<style lang="scss" scoped>


.button-container {
	display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 38rem;
}

.login-button {
	display: block;
    text-decoration: none;
	flex-flow: column nowrap;
	width: 50%; display: flex; justify-content: center; padding-right: 1rem;
}
.login-button > a {
	display: block;
    text-decoration: none;
}

.button-blue {
	cursor: pointer;
    line-height: 1.45rem;
    width: 100%;
    color: rgb(255, 255, 255);
    font-size: 1.1rem;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 0.25rem 0px;
    outline: 0px;
    padding: 0.5rem 2rem;
    border-radius: 6rem;
    background: rgb(0, 188, 249);
    transition: all 0.2s ease-in-out 0s;
}
.button-white {
	cursor: pointer;
    line-height: 1.45rem;
    width: 100%;
    color: rgb(0, 188, 249);
    font-size: 1rem;
    margin: 0.25rem 0px;
    outline: 0px;
    padding: 0.5rem 2rem;
    border-radius: 6rem;
    background: transparent;
    border-width: 3px;
    border-style: solid;
    border-color: rgb(0, 188, 249);
    border-image: initial;
    transition: all 0.2s ease-in-out 0s;
}


</style>
