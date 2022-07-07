<template>
	<v-app id="app">
		<v-main>
			<router-view/>
		</v-main>
		<PageFooter v-if="showFooter" />
	</v-app>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import PageFooter from "./components/misc/PageFooter.vue";

export default {
	name: 'App',
	metaInfo: {
      title: 'Housing Editor',
      titleTemplate: '%s | Housing Editor'
    },
	components: {
		PageFooter,
	},
	data: () => ({
		showFooter: false,
	}),
	mounted() {
		this.routeChange(this.$route);
		if (this.$route.name === 'about') this.$vuetify.theme.dark = true;
	},
	watch:{
		$route (to){
			this.routeChange(to);
		}
	},
	methods: {
		routeChange(to) {
			this.$vuetify.theme.dark = localStorage.getItem('darkMode') === 'true' ? true : false;
			switch(to.name) {
				case 'login':
				case 'link-account':
				case 'edit-action':
				case 'edit-item':
					this.showFooter = false;
					break;
				default:
					this.showFooter = true;
					break;
			}
		},
	},

};
</script>

<style lang="scss">
@font-face {
	font-family: 'Minecraft';
	src: url('@/assets/fonts/minecraftio.ttf');
}
#app {
	background: var(--v-background-base);
}
</style>