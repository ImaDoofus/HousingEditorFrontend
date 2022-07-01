<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<EditActionNav ref='nav' @submit='save'/>
		<EditActionWorkspace ref='workspace'/>
	</div>
</template>

<script>
import EditActionWorkspace from '@/components/actions/EditActionWorkspace.vue';
import EditActionNav from '@/components/actions/EditActionNav.vue';
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';

export default {
	name: 'EditAction',
	components: {
		EditActionNav,
		EditActionWorkspace,
		CustomSnackbar
	},
	data() {
		return {
			id: null,
		}
	},
	methods: {
		async save(data) {
			const nav = this.$refs.nav;
			const snackbar = this.$refs.snackbar;
			const workspace = this.$refs.workspace.save();
			console.log(JSON.stringify(workspace))
			const maxWorkspaceSize = 10; // KB
			const maxDescriptionSize = 1; // KB

			const workspaceSize = Math.ceil(JSON.stringify(workspace).length / 1024 * 100) / 100; // KB rounded up to nearest hundredth
			const descriptionSize = Math.ceil(data.content.length / 1024 * 100) / 100; // KB rounded up to nearest hundredth
			console.log(workspaceSize, descriptionSize);
			if (workspaceSize > maxWorkspaceSize || descriptionSize > maxDescriptionSize) {
				if (workspaceSize > maxWorkspaceSize) {
					snackbar.text = `Your code is too large ${workspaceSize}/${maxWorkspaceSize}KB!`;
				}
				if (descriptionSize > maxDescriptionSize) {
					snackbar.text = `Your description is too large ${descriptionSize}/${maxDescriptionSize}KB!`;
				}
				snackbar.shown = true;
				snackbar.color = 'warning';
				snackbar.buttonText = 'Learn More';
				snackbar.timeout = 4000;
				snackbar.buttonAction = () => {
					window.open(`${this.$hostname}/about/size-limits`, '_blank');
					snackbar.shown = false;
					snackbar.buttonText = 'Close';
					snackbar.resetSnackbar();
				};
				return;
			}

			const payload = {
				title: data.title,
				content: data.content,
				workspace: workspace,
			}

			if (this.id) {
				payload.id = this.id;
			}
			const payloadString = JSON.stringify(payload);

			nav.loading = true;
			snackbar.color = 'error';

			try {
				let response
				if (this.id) {
					response = await fetch(`${this.$apiHostname}/api/actions/${this.id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + localStorage.getItem('token')
						},
						body: payloadString
					});
				} else {
					response = await fetch(`${this.$apiHostname}/api/actions/`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + localStorage.getItem('token')
						},
						body: payloadString
					});
				}
				
				snackbar.shown = true;
				nav.loading = false;
			
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.indexOf('application/json') === -1) {
					return snackbar.text = 'Error: ' + response.statusText;
				}

				const json = await response.json();

				if (!response.ok) {
					return snackbar.text = `Error ${response.status}: ${json.message}`;
				}

				nav.dialog = false;
				snackbar.text = json.message;
				snackbar.color = 'success';
				snackbar.timeout = 3000;
				snackbar.buttonText = 'View';
				snackbar.buttonAction = () => {
					window.open(`${this.$hostname}/actions/?sort=Date (Newest to Oldest)`, '_blank');
					snackbar.resetSnackbar();
				};
				this.id = json.id;
			} catch (e) {
				console.log(e)
				nav.loading = false;
				snackbar.shown = true;
				snackbar.text = 'Error: ' + e.message;
			}
		},
		isCopy() {
			return this.$route.params.copy;
		}
	},
	beforeRouteLeave (to, from, next) {
		const answer = window.confirm('You have unsaved changes.\nAre you sure you want to leave?');
		if (answer) next();
	},
	mounted() {
		console.log(this.$route.params)
		if (!this.$route.params.id) return this.$refs.workspace.loading = false;
		// if (!localStorage.getItem('token')) return;
		this.id = this.$route.params.id;

		const response = fetch(`${this.$apiHostname}/api/actions/${this.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			}
		}).then(res => {
			res.json().then(json => {
				if (this.isCopy()) json.post.title += ' (Remix)';
				this.$refs.nav.set(json.post);
				this.$refs.workspace.load(json.workspace);
			});
		});

		if (this.isCopy()) {
			this.id = null;
		}
	}
}
</script>