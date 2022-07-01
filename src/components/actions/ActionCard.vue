<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<ActionDetail ref='actionDetail' @delete='deleteClientSide()' :canDelete='canDelete'/>
		<v-sheet class="action_card">
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
				<v-card-title v-else @click="openDialog(action)">
					<div class="d-flex">
						<div style="line-height: 10px;">
							<span>{{ action.post.title }}</span>
							<br>
							<router-link :to="`${this.$apiHostname}/dashboard`" class="user-router-link">@{{ action.author.name }}</router-link>
							<span class="mx-1 overline">• {{ getUploadDate() }}</span>
						</div>
						<div class="action_avatar">
							<img v-if='action.author.avatar' :src="action.author.avatar" width="64" height="64">
							<img v-if='action.author.uuid' :src="`https://mc-heads.net/avatar/${action.author.uuid}`" width="64" height="64" style="image-rendering: pixelated;">
						</div>
					</div>
				</v-card-title>
		
				<v-card-text v-if="loading" class="card_text">
					<div class="action_content">
						<v-sheet v-for="i in [1,2,3,4,5,6,7,9,10]" :key='i' :width="Math.random() * 250 + 50" :height="Math.random() > 0.8 ? 50 : 8" color="grey lighten-1" class="my-1"></v-sheet>
					</div>
				</v-card-text>

				<v-card-text v-else class="card_text">
					<div v-html="action.post.content" class="action_content" @click="openDialog(action)"></div>
				</v-card-text>
		
				<v-card-actions v-if="loading">
					<v-icon>mdi-heart</v-icon>
				</v-card-actions>
				<v-card-actions v-else>
					<LikeButton type='actions' :data="mutableAction" :user-id="userId" @liked='liked'/>
					<v-spacer></v-spacer>
					<v-btn class="amber" small text dark @click="copyId(action)">
						<span>COPY ID</span>
						<v-icon right>mdi-content-copy</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-sheet>
	</div>
</template>

<script>
import ActionDetail from './ActionDetail.vue';
import LikeButton from '../engagement/LikeButton.vue';
import CustomSnackbar from '../misc/CustomSnackbar.vue';
import moment from 'moment';

export default {
	name: 'ActionCard',
	components: {
		ActionDetail,
		LikeButton,
		CustomSnackbar,
	},
	props: {
		action: Object,
		canDelete: Boolean
	},
	data() {
		return {
			mutableAction: this.action,
			loading: true,
			userId: localStorage.getItem('userId'),
		}
	},
	methods: {
		openDialog(action) {
			const detail = this.$refs.actionDetail;
			detail.setAction(action);
			detail.shown = true;
		},
		copyId(action) {
			const snackbar = this.$refs.snackbar;
			console.log('copyId', action._id)
			navigator.clipboard.writeText(action._id);
			snackbar.shown = true;
			snackbar.text = 'Copied action ID';
			snackbar.color = 'green';
			snackbar.timeout = 2000;
		},
		liked() {
			const likes = this.mutableAction.likes;
			if (!likes) return this.mutableAction.likes = { count: 1, users: [this.userId] };
			if (likes.users.includes(this.userId)) {
				likes.users.splice(likes.users.indexOf(this.userId), 1);
				likes.count--;
			} else {
				likes.users.push(this.userId);
				likes.count++;
			}
			this.mutableAction.likes = likes;
		},
		getUploadDate() {
			return moment(this.action.createdAt).fromNow();
		},
		deleteClientSide() {
			this.loading = true;
			console.log(this.action)
			// this.$emit('delete', this.action._id);
		}
	},
	watch: {
		action: {
			handler(action) {
				this.loading = true
				this.mutableAction = action;
				if (action.post) this.loading = false;
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

.action_content {
	cursor: pointer;

	height: 125%;
	width: 125%;

	-webkit-transform: scale(0.8);
	transform: scale(0.8);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
}

.action_card:hover {
	background: rgb(245, 245, 245) !important;
	box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2) !important;
}

.action_card {
	border: thin solid rgba(0, 0, 0, 0.2) !important;
}

.v-card_title {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
}
.action_avatar {
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