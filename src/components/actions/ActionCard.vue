<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<ActionDetail ref='actionDetail' @delete='deleteClientSide()' :canDelete='canDelete'/>
		<v-sheet class="action_card">
			<v-card :color="loading ? 'card lighten-4' : 'card'" tile class="flex-grow-1">
				<v-card-title v-if="loading" class="grey--text">
					<div class="d-flex">
						<div style="line-height: 10px;">
							<v-sheet width="250" height="20" color="grey darken-1"></v-sheet>
							<br>
							<v-sheet width="100" height="7" color="grey darken-2"></v-sheet>
						</div>
						<div class="action_avatar">
							<v-sheet width="64" height="64" color="grey"></v-sheet>
						</div>
					</div>
				</v-card-title>
				<v-card-title v-else @click="openDialog(action)">
					<v-row class="d-flex" style="white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis;">
						<v-col cols="10" class="my-0 py-0">
							<span>{{ action.post.title }}</span>
						</v-col>
						<v-col class="my-0 py-0 d-flex align-start" style="height: 14px;" fluid>
							<router-link :to="`profile/${ action.author.id }`" class="user-router-link" style="line-height: 14px;">@{{ action.author.name }}</router-link>
							<span class="mx-1 overline" style="line-height: 14px;">• {{ getUploadDate() }}</span>
						</v-col>
						<v-col cols="12" class="my-1 py-0 d-flex align-start" style="line-height: 16px;">
							<v-chip :class='`mr-1 my-0 py-1 ${getTagTextColor(tag)}--text`' x-small v-for="tag in action.post.tags" :key="tag" :color="getTagColor(tag)"
								style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
								{{ tag }}
							</v-chip>
						</v-col>
						<div class="action_avatar">
							<img v-if='action.author.avatar' :src="action.author.avatar" width="64" height="64">
							<img v-if='action.author.uuid' :src="`https://mc-heads.net/avatar/${action.author.uuid}`" width="64" height="64" style="image-rendering: pixelated;">
						</div>
					</v-row>
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
					<v-spacer></v-spacer>
					<v-btn class="grey" text dark disabled></v-btn>
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
		canDelete: Boolean,
	},
	data() {
		return {
			mutableAction: this.action,
			loading: true,
			userId: localStorage.getItem('userId'),
			actionTags: [
				{ name: 'Action Pad', color: 'red', textColor: 'black' },
				{ name: 'Action Button', color: 'pink', textColor: 'black' },
				{ name: 'NPC', color: 'purple', textColor: 'white' },
				{ name: 'Region', color: 'deep-purple', textColor: 'white' },
				{ name: 'Command', color: 'indigo', textColor: 'white' },
				{ name: 'Event', color: 'blue', textColor: 'black' },
				{ name: 'Utility', color: 'light-blue', textColor: 'black' },
				{ name: 'Shop', color: 'cyan', textColor: 'black' },
				{ name: 'Crafting', color: 'teal', textColor: 'black' },
				{ name: 'Parkour', color: 'green', textColor: 'black' },
				{ name: 'Template', color: 'light-green', textColor: 'black' },
				{ name: 'PVP', color: 'lime', textColor: 'black' },
				{ name: 'Conditionals', color: 'yellow', textColor: 'black' },
				{ name: 'Random Action', color: 'amber', textColor: 'black' },
				{ name: 'Complex', color: 'orange', textColor: 'black' },
				{ name: 'Simple', color: 'deep-orange', textColor: 'black' },
				{ name: 'Quest', color: 'brown', textColor: 'white' },
				{ name: 'Fishing', color: 'blue-grey', textColor: 'white' },
			],
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
		},
		getTagColor(tag) {
			return this.actionTags.find(t => t.name === tag)?.color || 'grey';
		},
		getTagTextColor(tag) {
			return this.actionTags.find(t => t.name === tag)?.textColor || 'black';
		},
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