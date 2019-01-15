<template>
	<component :is="root" class="white-rect">
        <div class="content">
            <slot></slot>
        </div>
	</component>
</template>

<script lang="ts">
import Vue from 'src/vue-ts'

export default Vue.extend({
	props: {
        root: {
            type: String,
            default: "div"
        }
    }
})
</script>

<style lang="scss" scoped>

.white-rect {
	box-shadow: rgba(0, 0, 0, 0.5) 0px 0.25rem 1.5rem;
    max-height: 95vh;
    max-width: 95vw;
    min-height: 50vh;
    min-width: 60vw;
    background: rgb(255, 255, 255);
    border-radius: 0.25rem;
}
.content {
	box-sizing: border-box;
    padding: 2rem;
}

</style>