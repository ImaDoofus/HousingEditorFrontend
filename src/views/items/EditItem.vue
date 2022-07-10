<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<EditItemNav ref='nav' @submit='save'/>
		<EditItemWorkspace ref='workspace' @change='onWorkspaceChange()'/>
	</div>
</template>

<script>
import EditItemWorkspace from '@/components/items/EditItemWorkspace.vue';
import EditItemNav from '@/components/items/EditItemNav.vue';
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';
import UploadContent from '@/utils/UploadContent';

export default {
	name: 'EditItem',
	metaInfo() {
		return {
			title: this.getTitle(),
		}
	},
	components: {
		EditItemNav,
		EditItemWorkspace,
		CustomSnackbar
	},
	data() {
		return {
			id: null,
			workspaceChanged: false,
		}
	},
	methods: {
		async save() {
			this.workspaceChanged = false;
			this.$refs.nav.setSaveEnabled(false);
			const user = {
				token: localStorage.getItem('token'),
				rank: localStorage.getItem('rank'),
			}
			const uploadResult = await UploadContent.uploadItem(this.$refs.workspace.save(), user, this.id, this.$apiHostname)
			if (uploadResult.success) {
				this.$refs.snackbar.show(uploadResult.message, 'success');
				this.$refs.snackbar.setButton('View', 'white', () => {
					let routeData = this.$router.resolve({ name: 'item', params: { id: uploadResult.id } });
					window.open(routeData.href, '_blank');
				});
				this.$refs.snackbar.timeout = 3000;
				this.id = uploadResult.id;
				this.$refs.nav.setId(this.id);
			}
			else this.$refs.snackbar.show(uploadResult.message, 'error');
		},
		isCopy() {
			return this.$route.params.copy;
		},
		onWorkspaceChange() {
			this.workspaceChanged = true;
			this.$refs.nav.setSaveEnabled(true);
		},
		getTitle() {
			return this.isCopy() ? 'Edit Item' : 'New Item';
		}
	},
	beforeRouteLeave (to, from, next) {
		if (!this.workspaceChanged) return next();
		const answer = window.confirm('You have unsaved changes.\nAre you sure you want to leave?');
		if (answer) next();
	},
	mounted() {
		if (!this.$route.params.id) return;
		this.id = this.$route.params.id;
		if (!this.isCopy()) this.$refs.nav.setId(this.id);

		const response = fetch(`${this.$apiHostname}/items/${this.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then(res => {
			res.json().then(json => {
				this.$refs.workspace.load(json.workspace);
			});
		});

		if (this.isCopy()) {
			this.id = null;
		}
	}
}
</script>