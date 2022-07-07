<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<div v-if="userId">
			<v-btn icon small class="red" @click="heartClicked()"
			v-if="userHasLiked"> 
				<v-icon small color="white">mdi-heart</v-icon>
			</v-btn>

			<!-- if not not liked -->
			<v-btn icon small class="grey lighten-3" @click="heartClicked()"
			v-else>
				<v-icon small>mdi-heart-outline</v-icon>
			</v-btn>
			<span class="mx-1 overline">Likes: {{ likes }}</span>
		</div>

		<!-- if not logged in -->
		<div v-else>
			<v-btn icon small class="grey lighten-3" @click="$router.push('/login')">
				<v-icon small>mdi-heart-outline</v-icon>
			</v-btn>
			<span class="mx-1 overline">Likes: {{ likes }}</span>
		</div>
	</div>
</template>

<script>
import CustomSnackbar from '../misc/CustomSnackbar.vue';

export default {
	name: 'LikeButton',
	components: {
		CustomSnackbar
	},
	props: {
		type: String,
		data: Object,
		userId: String,
	},
	data() {
		return {
			userHasLiked: this.data.likes?.users.indexOf(this.userId) > -1,
			fetching: false,
			likes: this.data.likes?.count || 0,
			id: this.data._id,
		}
	},
	methods: {
		heartClicked() {
			if (this.fetching) return;
			if (this.data.likes?.users.indexOf(this.userId) === -1) { // like
				this.userHasLiked = true;
				this.$emit('liked')
			} else { // unlike
				this.userHasLiked = false;
				this.$emit('liked')
			}

			// send like to server
			this.fetching = true;
			fetch(`${this.$apiHostname}/${this.type}/like/${this.id}`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
			}).then(res => {
				if (!res.ok) throw new Error(res.status); 
				this.fetching = false;
			}).catch(err => {
				this.fetching = false;
				this.userHasLiked = !this.userHasLiked;
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.text = err;
			});
		}
	},
	watch: {
		data: {
			handler(newValue) {
				this.userHasLiked = newValue.likes?.users.indexOf(this.userId) > -1;
				this.id = newValue._id;
				this.likes = newValue.likes?.count || 0;
			},
			deep: true,
		}
	}
}
</script>