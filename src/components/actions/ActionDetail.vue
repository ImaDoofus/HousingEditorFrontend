<template>
	<v-dialog v-model="shown" max-width='800'>
		<CustomSnackbar ref="snackbar" />
		<v-card v-if="action">
			<v-card-title class="primary white--text">
				<span class="headline">{{ action.post.title }}</span>
				<v-spacer></v-spacer>
				<v-btn dark icon @click="threeDotsDialog = true">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="pa-5 mb-5" v-html="action.post.content"></v-card-text>
			<v-card-actions>
				<LikeButton type='actions' :data="action" :user-id="userId" @liked='$parent.liked()'/>

				<v-spacer></v-spacer>

				<v-chip color="amber darken-2" text-color="white" class="font-weight-bold" @click="copyId()">
					<span>{{ action._id }}</span>
					<v-divider vertical color="white" class="mx-2"></v-divider>
					<v-icon>mdi-content-copy</v-icon>
				</v-chip>

				<v-chip color="primary" text-color="white" class="font-weight-bold mx-1" @click="copyEditButtonClicked()">
					<span>Remix Action</span>
					<v-icon right>mdi-puzzle</v-icon>
				</v-chip>

				<v-chip v-if="userIsOwner" color="red" text-color="white" class="font-weight-bold" @click="editButtonClicked()">
					<span>Edit Code</span>
					<v-icon right>mdi-xml</v-icon>
				</v-chip>

			</v-card-actions>

			<v-divider></v-divider>

			<CommentSection />
		</v-card>
		<v-dialog v-model="threeDotsDialog" max-width="400">
			<v-card v-if="action">
				<v-card-actions class="d-flex justify-space-around">
					<v-btn class="primary" dark @click="shareAction">
						<v-icon>mdi-share</v-icon>
						Share
					</v-btn>
					<router-link :to="`/action/${action._id}`" v-slot="{ href, navigate }" custom>
						<v-btn class="green" dark :href="href" @click="navigate">
							<v-icon>mdi-open-in-new</v-icon>
							View Page
						</v-btn>
					</router-link>
					<div v-if="userIsOwner">
						<v-btn class="red" dark @click="deleteAction">
							<v-icon>mdi-delete</v-icon>
							Delete
						</v-btn>
					</div>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="deleteDialog" max-width="500">
			<v-card v-if="action" class="pa-5">
				<v-card-title class="justify-center">
					<span class="headline">Delete Action</span>
				</v-card-title>
				<span>Type "<span class="font-weight-bold">{{ action.post.title }}</span>" to delete. <span class="font-weight-bold red--text">(Warning: Cannot undo this action!)</span></span>
				<v-text-field v-model="deleteInput"></v-text-field>
				<v-card-actions class="justify-center">
					<v-btn class="red white--text" @click="confirmDelete" :disabled="deleteInputValid">
						<v-icon>mdi-delete</v-icon>
						Confirm Delete
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-dialog>
</template>

<script>
import LikeButton from '../engagement/LikeButton.vue';
import CommentSection from '../engagement/CommentSection.vue';
import CustomSnackbar from '../misc/CustomSnackbar.vue';

export default {
	name: 'ActionDetail',
	components: {
		LikeButton,
		CommentSection,
		CustomSnackbar,
	},
	data() {
		return {
			shown: false,
			action: null,
			comments: null,
			addCommentIsValid: false,
			postCommentMenu: false,
			commentInput: '',
			threeDotsDialog: false,

			// delete stuff
			deleteDialog: false,
			deleteInput: '',

			// permission stuff
			userIsOwner: false,

			userId: localStorage.getItem('userId'),
		}
	},
	computed: {
		deleteInputValid() {
			return this.action.post.title !== this.deleteInput;
		}
	},
	methods: {
		copyId() {
			this.$parent.copyId(this.action);
		},
		editButtonClicked() {
			this.$router.push({ name: 'edit-action', params: { id: this.action._id, copy: false } })
		},
		copyEditButtonClicked() {
			this.$router.push({ name: 'edit-action', params: { id: this.action._id, copy: true } })
		},
		setAction(action) {
			this.action = action;
			this.userIsOwner = action.author.id === this.userId;
		},
		likeComment() {
			console.log('likeComment');
		},
		deleteAction() {
			this.threeDotsDialog = false;
			this.deleteDialog = true;
		},
		confirmDelete() {
			fetch(`${this.$apiHostname}/api/actions/${this.action._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				if (res.status === 200) {
					this.$refs.snackbar.shown = true;
					this.$refs.snackbar.text = 'Action deleted';
					this.$refs.snackbar.color = 'success';
					this.action = null;
					this.$emit('delete');
				} else {
					this.$refs.snackbar.shown = true;
					this.$refs.snackbar.text = 'Error Deleting' + res.message;
					this.$refs.snackbar.color = 'error';
				}
			})
			.catch(err => {
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.text = 'Error Deleting' + err;
				this.$refs.snackbar.color = 'error';
			});
		},

		shareAction() {
			navigator.clipboard.writeText(`${this.$hostname}/action/${this.action._id}`);
			this.threeDotsDialog = false;
			this.$refs.snackbar.shown = true;
			this.$refs.snackbar.text = 'Copied link to this action!';
			this.$refs.snackbar.color = 'success';
			this.$refs.snackbar.timeout = 1500;
		}
	}
}
</script>