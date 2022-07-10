<template>
	<nav>
		<CustomSnackbar ref="snackbar" />
		<v-app-bar flat app class="primary">
			<v-toolbar-title class="text-uppercase gray-text" style="cursor: pointer">
				<router-link to="/" style="text-decoration: none; color: inherit;">
					<!-- <span class="font-weight-light">Housing</span>
					<span>Editor</span> -->
					<v-img src="@/assets/logo/logo.svg" width="150" height="40"></v-img>
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn v-if="id" class="amber mx-5" text dark @click="copyId()">
				<span>COPY ID</span>
				<v-icon right>mdi-content-copy</v-icon>
			</v-btn>
			<v-btn @click="dialog = true">
				<v-icon>mdi-file-outline</v-icon>
				<span>Save</span>
			</v-btn>
		</v-app-bar>
		<v-dialog v-model="dialog" max-width="1200px" transition="dialog-bottom-transition" light>
			<v-card class="base lighten-2">
				<v-card-title>
					<h2>Save your Action</h2>
				</v-card-title>
				<v-card-text class="base lighten-3">
					<v-row>
						<v-col>
							<v-form ref="form">
								<v-text-field label="Title" v-model="title" prepend-icon="mdi-subtitles" :rules="inputRules"></v-text-field>
							</v-form>
						</v-col>
						<v-col>
							<v-select
								v-model="actionTagsValue"
								:items="actionTags"
								item-text="name"
								:menu-props="{ bottom: true, offsetY: true }"
								small-chips
								label="Tags"
								multiple
								hint="Select action tags"
								return-object
								persistent-hint>
								<template #selection="{ item }">
									<v-chip :color="item.color" :class="`${item.textColor}--text`">{{ item.name }}</v-chip>
								</template>
							</v-select>
						</v-col>
					</v-row>
					<TipTap v-model='content'/>
					<v-row justify="space-between" class="ma-1">
						<v-btn text class="error mt-3" @click="cancel">Close</v-btn>
						<v-btn text class="success mt-3" @click="save" :loading="loading">Save Action</v-btn>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
	</nav>
</template>

<script>
import TipTap from '@/components/formatting/TipTap';
import CustomSnackbar from '../misc/CustomSnackbar.vue';

export default {
	name: 'SaveAction',
	components: {
		TipTap,
		CustomSnackbar,
	},
	data(){
		return {
			dialog: false,
			inputRules: [
				v => !!v || 'Title is required',
				v => v.length < 100 || 'Title must be less than 100 characters',
				v => v.length > 2 || 'Title must be at least 3 characters',
			],
			title: '',
			loading: false,
			content: '',
			id: null,
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
			actionTagsValue: [],
		}
	},
	methods: {
		cancel() {
			this.dialog = false;
		},
		save() {
			if (this.$refs.form.validate()) {
				this.$emit('submit', {
					title: this.title,
					content: this.content,
					tags: this.getTags(),
				});
				this.dialog = false;
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
			this.actionTagsValue = this.actionTags.filter(tag => post.tags.includes(tag.name));
		},
		setId(id) {
			this.id = id;
		},
		copyId() {
			navigator.clipboard.writeText(this.id);
			this.$refs.snackbar.show('Copied ID to clipboard!', 'success');
			this.$refs.snackbar.timeout = 2000;
		},
		getTags() {
			return this.actionTagsValue.map(tag => tag.name);
		},
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