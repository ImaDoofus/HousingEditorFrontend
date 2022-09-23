<template>
	<div>
		<CustomSnackbar ref='snackbar' />
		<NavigationBar />
		<v-card :img="randomBanner" tile class="py-5">
			<v-row align="start" class="ma-5 frosted">
				<v-col class="mx-1 col-auto pa-3 pb-2">
					<img :src="avatar" width='128' height='128' :style="isMinecraftAvatar ? `image-rendering: pixelated` : ''">
				</v-col>
				<v-col class="mx-1 col-auto">
					<span class="text-h3 white--text">{{ name }}</span>
					<br>
					<v-chip :style="`background-color: ${ rank.color }`">
						<span class="white--text">{{ rank.title }}</span>
						<v-icon v-if="rank.icon" :style="`color: ${ rank.icon.color }`" right>{{ rank.icon.name }}</v-icon>
					</v-chip>
				</v-col>
				<v-col class="mx-1">
					<v-btn class="mx-1 white font-weight-bold" @click="createAction">
						<span class="black--text">new action</span>
						<v-icon right color="black">mdi-castle</v-icon>
					</v-btn>

					<v-btn class="mx-1 yellow font-weight-bold" @click="createItem">
						<span class="black--text">new item</span>
						<v-icon right color="black">mdi-sword</v-icon>
					</v-btn>

					<v-btn v-if='!getIsLinked()' class="mx-1 green lighten-2 font-weight-bold" @click="linkAccount">
						<span class="black--text">link account</span>
						<v-icon right color="black">mdi-link-variant</v-icon>
					</v-btn>

					<v-btn class="mx-1 primary font-weight-bold" @click="viewPublicProfile">
						<span class="black--text">View public profile</span>
						<v-icon right color="black">mdi-account-group</v-icon>
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
			<v-tab>Items
				<v-icon small right>mdi-sword</v-icon>
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
							<v-col cols="12" sm="6" md="6" lg="4" v-for="(action, index) in actions" :key="`action-${index}`">
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
					<v-col cols="12" sm="12" md="12" lg="12">
						<v-row>
							<v-col cols="12" sm="6" md="6" lg="4" v-for="(item, index) in items" :key="`item-${index}`">
								<ItemCard :item='item' />
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-pagination v-model="itemPage" :length="totalItemPages" :total-visible='7' circle @input="getItemPage()" class="mt-3"></v-pagination>
							</v-col>
						</v-row>
					</v-col>
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
import ItemCard from "@/components/items/ItemCard.vue";
import CustomSnackbar from "@/components/misc/CustomSnackbar.vue";
import requestActionPage from "@/utils/requestActionPage.js";
import requestItemPage from "@/utils/requestItemPage.js";

export default {
	name: 'DashboardPage',
	metaInfo() {
		return {
			title: 'Dashboard',
		}
	},
	components: {
		NavigationBar,
		ActionCard,
		ItemCard,
		CustomSnackbar,
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
			isMinecraftAvatar: null,
			rank: {
				title: null,
				color: null,
				icon: null
			},
			randomBanner: require('@/assets/profile/banner' + Math.floor(Math.random() * 5) + '-min.png'),

			// actions
			actions: [],
			loadingActions: false,
			actionDisplayNum: 6,
			totalActionPages: 1,
			actionPage: 1,

			// items
			items: [],
			loadingItems: false,
			itemsDisplayNum: 6,
			totalItemPages: 1,
			itemPage: 1,

			darkMode: localStorage.getItem('darkMode') === 'true' ? true : false,
		}
	},
	methods: {
		async getProfile() {
			const response = await fetch(`${this.$apiHostname}/users/my-profile`, {
				headers: {
					'Authorization': 'Bearer ' + this.token,
				},
			});
			if (response.ok) {
				const user = await response.json();
				if (!user) return;
				this.user = user;
				this.userSub = user.google.sub;
				this.userId = user._id;
				this.name = user.minecraft?.name || user.google?.name;
				this.avatar = user.minecraft?.uuid ? ('https://mc-heads.net/avatar/' + user.minecraft?.uuid + '/16') : user.google?.picture;
				this.isMinecraftAvatar = user.minecraft?.uuid ? true : false;
				this.rank = user.profile.rank || { title: 'Housing Player', color: '#333' };

				localStorage.setItem('name', this.name);
				localStorage.setItem('avatar', this.avatar);
				localStorage.setItem('rank', this.rank);
			}
		},
		async getActionPage() {
			if (this.loadingActions) return;
			this.loadingActions = true;
			this.actions = new Array(this.actionDisplayNum).fill({})
			const json = await requestActionPage(this.$apiHostname, this.actionPage, this.actionDisplayNum, this.sortBy, this.userId);
			if (!json) return this.$refs.snackbar.show('Error loading actions', 'error');
			this.totalActionPages = json.totalPages;
			this.actions = json.docs;
			this.loadingActions = false;
		},

		async getItemPage() {
			if (this.loadingItems) return;
			this.loadingItems = true;
			this.items = new Array(this.itemsDisplayNum).fill({})
			const json = await requestItemPage(this.$apiHostname, this.itemPage, this.itemsDisplayNum, this.sortBy, this.userId);
			if (!json) return this.$refs.snackbar.show('Error loading items', 'error');
			this.totalItemPages = json.totalPages;
			this.items = json.docs;
			this.loadingItems = false;
		},

		createAction() {
			this.$router.push('/edit-action');
		},
		createItem() {
			this.$router.push('/edit-item');
		},
		viewPublicProfile() {
			this.$router.push({ name: 'profile', params: { userId: this.userId } });
		},
		linkAccount() {
			this.$router.push('/link-account');
		},
		getIsLinked() {
			if (!this.user) return true; // while loading
			return this.user?.minecraft?.uuid;
		},

		updateSettings() {
			localStorage.setItem('darkMode', this.darkMode);
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
			switch(newValue) {
				case 0: // housings tab
					break;
				case 1: // actions tab
					this.getActionPage(this.actionPage);
					break;
				case 2:
					this.getItemPage(this.itemPage);
					break;
			}
		}
	}
}
</script>

<style scoped>
.frosted {
	background: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
}
</style>