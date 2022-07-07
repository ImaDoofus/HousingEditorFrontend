<template>
	<v-card-text class="pt-5">
		<CustomSnackbar ref="snackbar" />
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
					<router-link to="/profile/62c6871f53cc93e40cd459b2" tag="img" src="https://mc-heads.net/avatar/imadoofus" style="image-rendering: pixelated;"></router-link>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>
						<!-- <div class="d-flex align-center"> -->
							<v-tooltip top>
								<template v-slot:activator="{ on, attrs }">
									<span v-bind="attrs" v-on="on">
										<span class='font-weight-bold' @click="$router.push({ name: 'profile', params: { userId: '62bfd50b0d3e3b3f455ee8f3' }})">ImaDoofus</span>
										<v-icon color="yellow darken-2">mdi-crown</v-icon>
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
					<span>
						<v-icon @click="likeComment">
							mdi-thumb-up-outline
						</v-icon>
						0
					</span>
				</v-list-item-action>

			</v-list-item>
		</v-list>
	</v-card-text>
</template>

<script>
import moment from 'moment'
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';

export default {
	name: 'CommentSection',
	components: {
		CustomSnackbar,
	},
	data() {
		return {
			commentInput: '',
			addCommentIsValid: false,
			postCommentMenu: false,
		}
	},
	methods: {
		likeComment() {
			console.log('Like comment');
		},
		postComment() {
			this.$snackbar.open('Comment posted!');
		},
		validateComment() {
			this.addCommentIsValid = this.commentInput.length > 0;
		},
	},
	mounted() {
		
	}	
}
</script>