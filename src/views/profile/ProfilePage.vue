<template>
	<div>
		<CustomSnackbar ref='snackbar' />
		<NavigationBar />
		<v-card :img="randomBanner" tile class="py-5">
			<v-row align="start" class="pa-5">
				<v-col class="frosted mx-1 col-auto pa-3 pb-2">
					<img :src="avatar" width='128' height='128' :style="isMinecraftAvatar ? `image-rendering: pixelated` : ''">
				</v-col>
				<v-col class="frosted mx-1 col-auto">
					<span class="text-h3 white--text">{{ name }}</span>
					<br>
					<v-chip :style="`background-color: ${ rank.color }`">
						<span class="white--text">{{ rank.title }}</span>
						<v-icon v-if="rank.icon" :style="`color: ${ rank.icon.color }`" right>{{ rank.icon.name }}</v-icon>
					</v-chip>
					<br>
					<span v-if='user' class="mx-1 overline white--text">Joined • {{ getJoinDate() }}</span>
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
				<v-row>
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
				</v-row>
			</v-tab-item>
			<v-tab-item>
				<span class="text-h3 grey--text text--lighten-2">Coming soon...</span>
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
import moment from "moment";

export default {
	name: 'ProfilePage',
	metaInfo() {
		return {
			title: this.getTitle(),
			titleTemplate: '%s - Profile',
		}
	},
	components: {
		NavigationBar,
		ActionCard,
		ItemCard,
		CustomSnackbar
	},
	data() {
		return {
			user: null,
			userId: null,
			token: localStorage.getItem('token'),
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

		}
	},
	methods: {
		async getProfile() {
			const response = await fetch(`${this.$apiHostname}/users/profile/${this.userId}`, {
				headers: {
					'Authorization': 'Bearer ' + this.token,
				},
			});
			if (response.ok) {
				const json = await response.json();

				const user = json;
				if (!user) return;
				this.user = json;
				this.name = user.minecraft?.name || user.google?.name;
				this.avatar = user.minecraft?.uuid ? ('https://mc-heads.net/avatar/' + user.minecraft?.uuid + '/16') : user.google?.picture;
				this.isMinecraftAvatar = user.minecraft?.uuid ? true : false;
				this.rank = user.profile.rank || { title: 'Housing Player', color: '#333' };
			}
		},
		async getActionPage(pageNum) {
			if (this.loading) return;
			this.loading = true;
			this.actions = new Array(this.actionDisplayNum).fill({})
			const json = await requestActionPage(this.$apiHostname, pageNum, this.actionDisplayNum, this.sortBy, this.userId);
			if (!json) return this.$refs.snackbar.show('Error loading actions', 'error');
			this.totalActionPages = json.totalPages;
			this.actions = json.docs;
			this.loading = false;
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

		getJoinDate() {
			return moment(this.user.createdAt).format('MMMM Do YYYY');
		},
		getTitle() {
			return this.name || 'Loading...';
		}
	},
	async mounted() {
		this.userId = this.$route.params.userId;
		if (this.userId) {
			this.getProfile();
		} else {
			this.$router.push('/');
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
				case 2: // items tab
					this.getItemPage();
					break;
			}
		}
	}
}
</script>

<style scoped>
.frosted {
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
}
</style>