<template>
	<CustomSnackbar ref="snackbar"></CustomSnackbar>
</template>

<script>
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue'
import EventUtil from '@/utils/EventUtil';

export default {
	name: 'WorkspaceChange',
	components: {
		CustomSnackbar,
	},
	data() {
		return {
			workspace: null
		}
	},
	methods: {
		setWorkspace(workspace) {
			this.workspace = workspace
			this.workspace.addChangeListener(this.changeListener)
		},
		changeListener(event) {
			const eventIsValid = EventUtil.isBlockMoveValid(event);
			if (!eventIsValid.isValid) {
				this.workspace.undo();
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.color = 'error';
				this.$refs.snackbar.text = eventIsValid.message;
				this.$refs.snackbar.timeout = 6000;
			}
			if (eventIsValid.message === 'easter_egg') {
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.timeout = 10000;
				this.$refs.snackbar.color = 'success';
				this.$refs.snackbar.text = 'You cant nest conditionals!';
			}
		}
	},
	beforeDestroy() {
		if (this.workspace) this.workspace.removeChangeListener(this.changeListener);
	}
}
</script>