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
				this.$refs.snackbar.color = 'warning';
				// this.$refs.snackbar.text = 'You cant nest conditionals, yet...';
				this.$refs.snackbar.text = 'You cant nest conditionals!';
				// this.$refs.snackbar.buttonText = 'Vote for a new feature!';
				// this.$refs.snackbar.buttonAction = () => {
				// 	window.open('https://hypixel.net/threads/conditionals-could-have-been-implemented-differently-from-a-programmers-standpoint.4951381/', '_blank');
				// 	this.$refs.snackbar.shown = false;
				// }
				// window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
			}
		}
	},
	beforeDestroy() {
		if (this.workspace) this.workspace.removeChangeListener(this.changeListener);
	}
}
</script>