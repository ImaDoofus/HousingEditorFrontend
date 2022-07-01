<template>
	<div>
		<CustomSnackbar ref='snackbar' />
		<NavigationBar />
		<v-card :img="randomBanner" tile class="py-5">
			<v-row align="start" class="pa-5">
				<v-col class="frosted mx-1 col-auto pa-3 pb-2">
					<img :src="avatar" width='128' height='128' class="avatar">
				</v-col>
				<v-col class="frosted mx-1 col-auto">
					<span class="text-h3 white--text">{{ name }}</span>
					<br>
					<span class="white--text">{{ rank }}</span>
				</v-col>
				<v-col class="frosted mx-1 col-auto">
					<v-btn class="mx-1 white font-weight-bold" @click="createAction">
						<span class="black--text">new action</span>
						<v-icon right color="black">mdi-castle</v-icon>
					</v-btn>

					<v-btn class="mx-1 yellow font-weight-bold" @click="createItem">
						<span class="black--text">new item</span>
						<v-icon right color="black">mdi-sword</v-icon>
					</v-btn>

					<v-btn class="mx-1 red lighten-2 font-weight-bold" @click="createPlugin">
						<span class="black--text">new plugin (coming soon)</span>
						<v-icon right color="black">mdi-puzzle</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card>
		<v-tabs v-model="tab">
			<v-tab>Housings
				<v-icon small right>mdi-home</v-icon>
			</v-tab>
			<v-tab>Actions
				<v-icon small right>mdi-castle</v-icon>
			</v-tab>
			<v-tab>Plugins
				<v-icon small right>mdi-puzzle</v-icon>
			</v-tab>
			<v-tab>Account Settings
				<v-icon small right>mdi-wrench</v-icon>
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab" class="pa-5">
			<v-tab-item>
				<span class="text-h3 grey--text text--lighten-2">Coming soon...</span>
			</v-tab-item>
			<v-tab-item>
				<v-row>
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-row>
							<v-col cols="12" sm="4" md="4" lg="3" v-for="(action, index) in actions" :key="`action-${index}`">
								<ActionCard :action='action' />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-pagination v-model="actionPage" :length="totalActionPages" :total-visible='7' circle @input="getActionPage(actionPage)" class="mt-3"></v-pagination>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-tab-item>
			<v-tab-item>
				<span class="text-h3 grey--text text--lighten-2">Coming soon...</span>
			</v-tab-item>
			<v-tab-item>
				<v-form>
					<span>Manage your Account</span>
					<v-checkbox label="Dark Theme" v-model="darkMode"></v-checkbox>
					<v-btn color="primary" @click="updateSettings">Update</v-btn>
				</v-form>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import NavigationBar from "@/components/misc/NavigationBar.vue";
import ActionCard from "@/components/actions/ActionCard.vue";
import CustomSnackbar from "@/components/misc/CustomSnackbar.vue";

export default {
	name: 'ProfilePage',
	components: {
    NavigationBar,
    ActionCard,
    CustomSnackbar
},
	data() {
		return {
			user: null,
			userId: null,
			userSub: null,
			token: null,
			tab: null,
			name: null,
			avatar: null,
			rank: null,
			randomBanner: require('@/assets/profile/banner' + Math.floor(Math.random() * 5) + '-min.png'),

			// actions
			actions: [],
			loadingActions: false,
			actionDisplayNum: 2,
			totalActionPages: 1,
			actionPage: 1,

			darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
		}
	},
	methods: {
		async getProfile() {
			const response = await fetch(`${this.$apiHostname}/api/users/my-profile`, {
				headers: {
					'Authorization': 'Bearer ' + this.token,
				},
			});
			if (response.ok) {
				const json = await response.json();
				this.user = json.user;
				const user = this.user;
				if (!user) return;
				this.userSub = user.google.sub;
				this.userId = user._id;
				if (user.minecraft?.name) this.name = user.minecraft.name;
				else this.name = user.google?.name;
				localStorage.setItem('name', this.name);

				if (user.minecraft?.uuid) this.avatar = 'https://mc-heads.net/avatar/' + user.minecraft.uuid + '/16';
				else this.avatar = user.google.picture
				localStorage.setItem('avatar', this.avatar);

				if (user.rank) this.rank = user.rank;
				else this.rank = 'Housing Player';
				localStorage.setItem('rank', this.rank);
			}
		},
		async getActionPage(pageNum) {
			if (this.loadingActions) return;
			this.loadingActions = true;
			this.actions = new Array(this.actionDisplayNum).fill({});
			try {
				const response = await fetch(`${this.$apiHostname}/api/actions/user/${this.userId}?page=${pageNum}`, {
					headers: [
						['Authorization', 'Bearer ' + this.token],
					]
				});
				console.log(response)
				const json = await response.json();
				if (this.actionPage !== json.page) {
					return this.getActionPage(this.actionPage);
				}
				console.log(json, this.actionPage)
				this.totalActionPages = json.totalPages;
				this.actions = json.docs;
				this.loadingActions = false;

				console.log(this.actions)
			} catch {
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.text = 'Error getting actions';
				
			}
		},

		createAction() {
			this.$router.push('/edit-action');
		},
		createItem() {
			this.$router.push('/edit-item');
		},
		createPlugin() {
			this.$refs.snackbar.shown = true;
			this.$refs.snackbar.text = 'Housing plugins coming soon...';
			this.$refs.snackbar.color = 'success';
		},

		updateSettings() {
			localStorage.setItem('darkMode', this.darkMode);
			console.log(this.darkMode, localStorage.getItem('darkMode'));
			this.$vuetify.theme.dark = this.darkMode;
		},
	},
	async mounted() {
		const token = localStorage.getItem('token');
		if (token) {
			this.token = token;
			this.getProfile();
		} else {
			this.$router.push('/login');
		}
	},
	watch: {
		tab(newValue) {
			console.log(newValue)
			switch(newValue) {
				case 0: // housings tab
					break;
				case 1: // actions tab
					this.getActionPage(this.actionPage);
					break;
			}
		}
	}
}
</script>

<style scoped>
.avatar {
	image-rendering: pixelated;
}
.frosted {
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
}
</style>