<template>
	<div :class="cssident">
		<component :is="layout">
			<router-view/>
		</component>
	</div>
</template>

<script lang="ts">

import Vue, { VueWithProps } from "./vue-ts"
import { layoutNameToComponent } from "./layouts"
import { cssident } from 'src/multiproj'

type TRefs = {
}

let App = (Vue as VueWithProps<{$refs: TRefs}>).extend({
	data: function()
	{
		return {
			cssident
		}
	},
	computed: {
		layout: function()
		{
			return layoutNameToComponent(this.$route.meta.layout || "default")
		},
	}
})
export default App

</script>

<style lang="scss">
@import url(normalize.css);
@import url(global.scss);
@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons);

@font-face {
	font-family: 'GothamPro';
	src: url(GothamPro.woff);
}
html,
body {
	font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
	margin: 0;
	font-size: 16px;
	div.ice {
		font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
	}
	div.cold {
		font-family: 'GothamPro', 'Lato', 'Arial', sans-serif;
	}
}
#root {
	height: 100%;
}
input[type=range] {
	-webkit-appearance: none;
	margin: 18px 0;
	width: 100%;
}
input[type=range]:focus {
	outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 3px;
	cursor: pointer;
	animate: 0.2s;
	box-shadow: none;
	background: #736C82;
	border-radius: 1.3px;
	border: 0;
}
input[type=range]::-webkit-slider-thumb {
	box-shadow: none;
	border: 0;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #00BCF9;
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -6px;
  }
input[type=range]:focus::-webkit-slider-runnable-track {
	background: #736C82;
}
input[type=range]::-moz-range-track {
	width: 100%;
	height: 8.4px;
	cursor: pointer;
	animate: 0.2s;
	box-shadow: none;
	background: #736C82;
	border-radius: 1.3px;
	border: 0;
}
input[type=range]::-moz-range-thumb {
	box-shadow: none;
	border: 0;
	height: 36px;
	width: 16px;
	border-radius: 3px;
	background: #00BCF9;
	cursor: pointer;
}
</style>