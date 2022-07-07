<template>
	<v-dialog v-model="shown" max-width='800'>
		<CustomSnackbar ref="snackbar" />
		<v-card v-if="item">
			<v-card-title class="primary white--text">
				<span class="headline">{{ getItemName() }}</span>
				<v-spacer></v-spacer>
				<v-btn dark icon @click="threeDotsDialog = true">
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</v-card-title>
			<v-card-text class="pa-5 mb-5">
				<ItemPreview :name="item.itemData.customName" :lore="item.itemData.customLore" :item="item.itemData.item"></ItemPreview>
			</v-card-text>
			<v-card-actions>
				<LikeButton type='items' :data="item" :user-id="userId" @liked='$parent.liked()'/>

				<v-spacer></v-spacer>

				<v-chip color="amber darken-2" text-color="white" class="font-weight-bold" @click="copyId()">
					<span>{{ item._id }}</span>
					<v-divider vertical color="white" class="mx-2"></v-divider>
					<v-icon>mdi-content-copy</v-icon>
				</v-chip>

				<v-chip color="primary" text-color="white" class="font-weight-bold mx-1" @click="copyEditButtonClicked()">
					<span>Remix Item</span>
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
			<v-card v-if="item">
				<v-card-actions class="d-flex justify-space-around">
					<v-btn class="primary" dark @click="shareItem">
						<v-icon>mdi-share</v-icon>
						Share
					</v-btn>
					<router-link :to="`/item/${item._id}`" v-slot="{ href, navigate }" custom>
						<v-btn class="green" dark :href="href" @click="navigate">
							<v-icon>mdi-open-in-new</v-icon>
							View Page
						</v-btn>
					</router-link>
					<div v-if="userIsOwner">
						<v-btn class="red" dark @click="deleteItem">
							<v-icon>mdi-delete</v-icon>
							Delete
						</v-btn>
					</div>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="deleteDialog" max-width="500">
			<v-card v-if="item" class="pa-5">
				<v-card-title class="justify-center">
					<span class="headline">Delete Item</span>
				</v-card-title>
				<span>Type "<span class="font-weight-bold">{{ getItemName() }}</span>" to delete. <span class="font-weight-bold red--text">(Warning: Cannot undo this item!)</span></span>
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
import CommentSection from '@/components/engagement/CommentSection.vue';
import CustomSnackbar from '../misc/CustomSnackbar.vue';
import MCTextParser from '@/utils/MinecraftTextParser';
import ItemPreview from './ItemPreview.vue';

export default {
	name: 'ItemDetail',
	components: {
		LikeButton,
		CommentSection,
		CustomSnackbar,
		ItemPreview,
	},
	data() {
		return {
			shown: false,
			item: null,
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
			return this.getItemName() !== this.deleteInput;
		}
	},
	methods: {
		copyId() {
			this.$parent.copyId(this.item);
		},
		editButtonClicked() {
			this.$router.push({ name: 'edit-item', params: { id: this.item._id, copy: false } })
		},
		copyEditButtonClicked() {
			this.$router.push({ name: 'edit-item', params: { id: this.item._id, copy: true } })
		},
		setItem(item) {
			this.item = item;
			this.userIsOwner = item.author.id === this.userId;
		},
		getItemName() {
			return MCTextParser.removeFormatting(this.item?.itemData?.customName || this.item?.itemData?.item?.name || 'Loading...');
		},
		deleteItem() {
			this.threeDotsDialog = false;
			this.deleteDialog = true;
		},
		confirmDelete() {
			fetch(`${this.$apiHostname}/items/${this.item._id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
			})
			.then(res => {
				if (res.status === 200) {
					this.$refs.snackbar.shown = true;
					this.$refs.snackbar.text = 'Item deleted';
					this.$refs.snackbar.color = 'success';
					this.item = null;
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

		shareItem() {
			navigator.clipboard.writeText(`${this.$hostname}/item/${this.item._id}`);
			this.threeDotsDialog = false;
			this.$refs.snackbar.shown = true;
			this.$refs.snackbar.text = 'Copied link to this item!';
			this.$refs.snackbar.color = 'success';
			this.$refs.snackbar.timeout = 1500;
		}
	}
}
</script>