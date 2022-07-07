<template>
	<nav>
		<CustomSnackbar ref='snackbar'/>
		<v-app-bar flat app class="primary">
			<v-toolbar-title class="text-uppercase gray-text" style="cursor: pointer">
				<router-link to="/" style="text-decoration: none; color: inherit;">
					<!-- <span class="font-weight-light">Housing</span>
					<span>Editor</span> -->
					<v-img src="@/assets/logo/logo.svg" width="150" height="40"></v-img>
				</router-link>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn @click="saveItem">
				<v-icon>mdi-file-outline</v-icon>
				<span>Save</span>
			</v-btn>
		</v-app-bar>

		<v-dialog>

		</v-dialog>
	</nav>
</template>

<script>
import CustomSnackbar from '../misc/CustomSnackbar.vue'

export default {
	name: 'SaveItem',
	components: {
		CustomSnackbar,
	},
	data() {
		return {
			buttonEnabled: true,
		}
	},
	methods: {
		saveItem() {
			if (!this.buttonEnabled) {
				this.$refs.snackbar.show('You haven\'t made any changes yet!')
				this.$refs.snackbar.color = 'blue';
				this.$refs.snackbar.timeout = 1000;
			} else {
				this.$emit('submit');
				this.buttonEnabled = false;
			}
		},
		ctrlSHandler(e) {
			if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				this.saveItem();
			}
		},
		setSaveEnabled(enabled) {
			this.buttonEnabled = enabled;
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