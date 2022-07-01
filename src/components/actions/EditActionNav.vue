<template>
	<nav>
		<v-app-bar flat app class="primary">
			<v-toolbar-title class="text-uppercase gray-text" style="cursor: pointer">
				<router-link to="/" style="text-decoration: none; color: inherit;">
					<!-- <span class="font-weight-light">Housing</span>
					<span>Editor</span> -->
					<v-img src="@/assets/logo/logo.svg" width="150" height="40"></v-img>
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn @click="dialog = true">
				<v-icon>mdi-file-outline</v-icon>
				<span>Save</span>
			</v-btn>
		</v-app-bar>
		<v-dialog v-model="dialog" max-width="1200px" transition="dialog-bottom-transition">
			<v-card class="base lighten-2">
				<v-card-title>
					<h2>Save your Action</h2>
				</v-card-title>
				<v-card-text class="base lighten-3">
					<v-form ref="form">
						<v-text-field label="Title" v-model="title" prepend-icon="mdi-subtitles" :rules="inputRules"></v-text-field>
					</v-form>
					<TipTap v-model='content'/>
					<v-row justify="space-between" class="ma-1">
						<v-btn text class="error mt-3" @click="cancel">Close</v-btn>
						<v-btn text class="success mt-3" @click="submit" :loading="loading">Save Action</v-btn>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
	</nav>
</template>

<script>
import TipTap from '@/components/formatting/TipTap';

export default {
	name: 'SaveAction',
	components: {
		TipTap,
	},
	data(){
		return {
			dialog: false,
			inputRules: [
				v => !!v || 'Title is required',
				v => v.length < 100 || 'Title must be less than 100 characters',
			],
			title: '',
			loading: false,
			content: '',
		}
	},
	methods: {
		cancel() {
			this.dialog = false;
		},
		async submit() {
			console.log(this.content)
			if (this.$refs.form.validate()) {
				this.$emit('submit', {
					title: this.title,
					content: this.content,
				});
			}
		},
		ctrlSHandler(e) {
			if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				this.dialog = true;
			}
		},
		set(post) {
			this.title = post.title;
			this.content = post.content;
		}
	},
	mounted: function () {
		document.addEventListener("keydown", this.ctrlSHandler);
	},
	beforeDestroy() {
		document.removeEventListener("keydown", this.ctrlSHandler);
	}
}
</script>

<style>
/* remove upload image option */
.el-tiptap-popper__menu__item:nth-child(2) { display: none !important; }
</style>