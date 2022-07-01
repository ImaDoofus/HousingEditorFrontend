<template>
	<nav>
		<v-app-bar color="primary">
			<v-app-bar-nav-icon color="white" @click.native="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="text-uppercase white--text" style="cursor: pointer">
				<router-link to="/" style="text-decoration: none; color: inherit">
					<!-- <span class="font-weight-light">Housing</span>
					<span>Editor</span> -->
					<v-img src="@/assets/logo/logo.svg" width="150" height="40"></v-img>
				</router-link>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn v-if='showCreateAction' @click="$router.push('edit-action')" class="pr-5 mr-5">
				<span>New Action</span>
				<v-icon right>mdi-castle</v-icon>
			</v-btn>

			<v-btn text class="white--text pr-5 mr-5" v-if="loggedIn" @click="logout">Logout</v-btn>
			<v-btn text class="white--text pr-5 mr-5" v-else @click="login">Login</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app temporary color="primary">
			<v-list>
				<div v-if="loggedIn">
					<div v-if="avatar && name">
						<v-list-item class="justify-center">
							<v-avatar size="64" class='d-flex align-center' tile>
								<v-img :src="avatar" style="image-rendering: pixelated"></v-img>
							</v-avatar>
						</v-list-item>
						<v-list-item class="text-center">
							<v-list-item-title>
								<router-link to="/dashboard" class="white--text text-h5" style="text-decoration: none">{{ name }}</router-link>
							</v-list-item-title>
						</v-list-item>
						<v-divider color="white"></v-divider>
					</div>
				</div>
				<v-list-item v-else class="justify-center">
					<router-link to="/login" class="text-h5" v-slot="{ href, navigate }" custom>
						<v-btn text @click="navigate" :href="href" dark>Login</v-btn>
					</router-link>
				</v-list-item>
				<v-divider color="white" v-if="!loggedIn"></v-divider>
				<v-list-item v-for="link in links" :key="link.text" router :to="link.route">
					<v-list-item-action>
						<v-icon class="white--text">{{ link.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-title>
						<span class="white--text font-weight-light">{{ link.text }}</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
// import GoBack from '@/components/GoBack.vue'

export default {
	name: 'NavigationBar',
	// components: {
	// 	GoBack
	// },
	data: () => ({
		drawer: false,
		links: [
			{ icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
			{ icon: 'mdi-castle', text: 'Actions', route: '/actions' },
			{ icon: 'mdi-sword', text: 'Items', route: '/items' },
			{ icon: 'mdi-information', text: 'About', route: '/about' },
		],
		loggedIn: localStorage.getItem('token') ? true : false,
		avatar: localStorage.getItem('avatar'),
		name: localStorage.getItem('name'),
		showCreateAction: false,
	}),
	methods: {
		logout() {
			['token', 'userId', 'avatar', 'name'].forEach(key => localStorage.removeItem(key))
			this.loggedIn = false;
			this.$router.push('/');
		},
		login() {
			this.$router.push('/login');
		}
	},
	mounted() {
		switch (this.$route.name) {
			case 'action-catalog':
				this.showCreateAction = true;
				break;
			default:
				this.showCreateAction = false;
				break;
		}
	}
};
</script>
