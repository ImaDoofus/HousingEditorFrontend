<template>
	<v-dialog v-model="shown" max-width='800'>
		<v-card v-if="action">
			<v-card-title class="primary white--text">{{ action.post.title }}</v-card-title>
			<v-card-text class="pa-5 mb-5" v-html="action.post.content"></v-card-text>
			<v-card-actions>
				<LikeButton type='actions' :data="action" :user-id="userId" @liked='$parent.liked()'/>

				<v-spacer></v-spacer>

				<v-chip color="amber darken-2" text-color="white" class="font-weight-bold mr-1" @click="copyId(action)">
					<span>{{ action._id }}</span>
					<v-divider vertical color="white" class="mx-2"></v-divider>
					<v-icon>mdi-content-copy</v-icon>
				</v-chip>

				<v-chip color="red" text-color="white" class="font-weight-bold" @click="editButtonClicked(action)">
					<span>View Code</span>
					<v-icon right>mdi-xml</v-icon>
				</v-chip>
			</v-card-actions>

			<v-divider></v-divider>

			<!-- comments section -->
			<v-card-text class="pt-5">
				<v-form v-model="addCommentIsValid">
					<v-text-field placeholder="Add a comment..." counter class="pb-3" @click="postCommentMenu = true" v-model="commentInput"></v-text-field>
					<v-row class="justify-end mr-1 mb-3" v-if="postCommentMenu">
						<v-btn text @click="postCommentMenu = false; commentInput = ''">Cancel</v-btn>
						<v-btn :disabled="!addCommentIsValid" color="primary">Comment</v-btn>
					</v-row>
				</v-form>
				<v-row class="align-center">
					<span class="pr-2">1 Comment</span>
					<v-select :items="['Date', 'Likes']" prepend-icon="mdi-sort" label="SORT BY" dense style="max-width: 150px;"></v-select>
				</v-row>

				<v-list>
					<v-list-item>
						<v-list-item-avatar tile>
							<v-img src="https://mc-heads.net/avatar/MHF_Steve" style="image-rendering: pixelated;"></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title>
								<!-- <div class="d-flex align-center"> -->
									<v-tooltip top>
										<template v-slot:activator="{ on, attrs }">
											<span v-bind="attrs" v-on="on">
												<v-icon color="yellow darken-2">mdi-crown</v-icon>
												<span class="font-weight-bold">ImaDoofus (Admin)</span>
											</span>
										</template>
										<span>Creator of HousingEditor.com</span>
									</v-tooltip>
									<span class="grey--text ml-1">· {{ moment.unix(1655707970).fromNow() }}</span>
								<!-- </div> -->
							</v-list-item-title>
							<v-list-item-subtitle>
								<span>Comments are coming soon...</span>
							</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action>
							<span v-if="likedComingSoonComment">
								<v-icon @click="likeComment">
									mdi-thumb-up
								</v-icon>
								1
							</span>
							<span v-else>
								<v-icon @click="likeComment">
									mdi-thumb-up-outline
								</v-icon>
								0
							</span>
						</v-list-item-action>

					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>

	</v-dialog>
</template>

<script>
import LikeButton from '../engagement/LikeButton.vue';
// import CommentSection from '../engagement/CommentSection.vue';

export default {
	name: 'ActionDetail',
	components: {
		LikeButton,
		// CommentSection,
	},
	data() {
		return {
			shown: false,
			action: null,
			comments: null,
			userID: null,
			addCommentIsValid: false,
			postCommentMenu: false,
			commentInput: '',
			userId: localStorage.getItem('userId'),
		}
	},
	methods: {
		copyId(action) {
			this.$parent.copyId(action);
		},
		editButtonClicked(action) {
			this.$router.push({ name: 'edit-action', params: { id: action._id } })
		},
		setAction(action) {
			console.log('setting action', action);
			this.action = action || {
				_id: '',
				post: {
					title: '',
					content: '',
				}
			};
			this.comments = action.comments || { count: 0, data: [] };
			this.likes = action.likes || { count: 0, users: [] };

			this.likedComingSoonComment = false;
		},
		likeComment() {
			console.log('likeComment');
			this.likedComingSoonComment = !this.likedComingSoonComment;
		}
	}
}
</script>