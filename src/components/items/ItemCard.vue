<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<ItemDetail ref='itemDetail' @delete='deleteClientSide()' :canDelete='canDelete'/>
		<v-sheet class="item_card">
			<v-card :color="loading ? 'card lighten-4' : 'card'" tile>
				<v-card-title v-if="loading" class="grey--text">
					<div>
						<v-sheet width="250" height="20" color="grey darken-1"></v-sheet>
						<v-sheet width="120" height="8"></v-sheet>
						<v-sheet width="100" height="7" color="grey darken-2"></v-sheet>
					</div>
					<v-spacer></v-spacer>
					<v-sheet width="64" height="64" color="grey"></v-sheet>
				</v-card-title>
				<v-card-title v-else @click="openDialog(item)">
					<div class="d-flex">
						<div style="line-height: 10px;">
							<span>{{ item.post.title }}</span>
							<br>
							<router-link :to="`${this.$apiHostname}/dashboard`" class="user-router-link">@{{ item.author.name }}</router-link>
							<span class="mx-1 overline">• {{ getUploadDate() }}</span>
						</div>
						<div class="item_avatar">
							<img v-if='item.author.avatar' :src="item.author.avatar" width="64" height="64">
							<img v-if='item.author.uuid' :src="`https://mc-heads.net/avatar/${item.author.uuid}`" width="64" height="64" style="image-rendering: pixelated;">
						</div>
					</div>
				</v-card-title>
		
				<v-card-text v-if="loading" class="card_text">
					<div class="item_content">
						<v-sheet v-for="i in [1,2,3,4,5,6,7,9,10]" :key='i' :width="Math.random() * 250 + 50" :height="Math.random() > 0.8 ? 50 : 8" color="grey lighten-1" class="my-1"></v-sheet>
					</div>
				</v-card-text>

				<v-card-text v-else class="card_text">
					<div v-html="item.post.content" class="item_content" @click="openDialog(item)"></div>
				</v-card-text>
		
				<v-card-actions v-if="loading">
					<v-icon>mdi-heart</v-icon>
				</v-card-actions>
				<v-card-actions v-else>
					<LikeButton type='items' :data="mutableItem" :user-id="userId" @liked='liked'/>
					<v-spacer></v-spacer>
					<v-btn class="amber" small text dark @click="copyId(item)">
						<span>COPY ID</span>
						<v-icon right>mdi-content-copy</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-sheet>
	</div>
</template>

<script>
import ItemDetail from '../items/ItemDetail.vue';
import LikeButton from '../engagement/LikeButton.vue';
import CustomSnackbar from '../misc/CustomSnackbar.vue';
import moment from 'moment';

export default {
	name: 'ItemCard',
	components: {
		ItemDetail,
		LikeButton,
		CustomSnackbar,
	},
	props: {
		item: Object,
		canDelete: Boolean
	},
	data() {
		return {
			mutableItem: this.item,
			loading: true,
			userId: localStorage.getItem('userId'),
		}
	},
	methods: {
		openDialog(item) {
			const detail = this.$refs.itemDetail;
			detail.setItem(item);
			detail.shown = true;
		},
		copyId(item) {
			const snackbar = this.$refs.snackbar;
			console.log('copyId', item._id)
			navigator.clipboard.writeText(item._id);
			snackbar.shown = true;
			snackbar.text = 'Copied item ID';
			snackbar.color = 'green';
			snackbar.timeout = 2000;
		},
		liked() {
			const likes = this.mutableItem.likes;
			if (!likes) return this.mutableItem.likes = { count: 1, users: [this.userId] };
			if (likes.users.includes(this.userId)) {
				likes.users.splice(likes.users.indexOf(this.userId), 1);
				likes.count--;
			} else {
				likes.users.push(this.userId);
				likes.count++;
			}
			this.mutableItem.likes = likes;
		},
		getUploadDate() {
			return moment(this.item.createdAt).fromNow();
		},
		deleteClientSide() {
			this.loading = true;
			console.log(this.item)
			// this.$emit('delete', this.item._id);
		}
	},
	watch: {
		item: {
			handler(item) {
				this.loading = true
				this.mutableItem = item;
				if (item.post) this.loading = false;
			},
			deep: true,
		},
	},
}
</script>

<style>
.card_text {
	overflow: hidden;
	height: 200px;
	max-height: 200px;
}

.item_content {
	cursor: pointer;

	height: 125%;
	width: 125%;

	-webkit-transform: scale(0.8);
	transform: scale(0.8);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
}

.item_card:hover {
	background: rgb(245, 245, 245) !important;
	box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2) !important;
}

.item_card {
	border: thin solid rgba(0, 0, 0, 0.2) !important;
}

.v-card_title {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
}
.item_avatar {
	position: absolute;
	top: 10px;
	right: 10px;
}
.user-router-link {
	text-decoration: none;
	color: inherit;
	font-size: 12px;
}
.user-router-link:hover {
	text-decoration: underline;
}
</style>