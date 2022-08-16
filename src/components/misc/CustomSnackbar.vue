<template>
	<v-snackbar v-model="shown" :timeout="timeout" top :color="color" multi-line :elevation="elevation">
		<span v-html="text"></span>
		<template v-slot:action="{ attrs }">
			<v-btn align='right' text :color="buttonColor" v-bind="attrs" @click="buttonAction">{{ buttonText }}</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
export default {
	name: 'SnackbarLogin',
	data() {
		return {
			shown: false,
			text: 'Snackbar',
			elevation: 100,
			color: 'red',
			buttonText: 'Close',
			buttonColor: 'white',
			timeout: -1,
			buttonAction: () => {
				this.shown = false;
			},

		}
	},
	methods: {
		reset() {
			this.shown = false;
			setTimeout(() => {
				this.text = 'Snackbar';
				this.elevation = 100;
				this.color = 'red';
				this.buttonText = 'Close';
				this.buttonColor = 'white';
				this.timeout = -1;
				this.buttonAction = () => {
					this.shown = false;
				};
			}, 100);
		},
		setButton(text, color, action) {
			this.buttonText = text;
			this.buttonColor = color;
			this.buttonAction = action;
		},
		show(message, color) {
			this.shown = true;
			this.text = message;
			this.color = color;
		}
	},
	watch: {
		shown(val) {
			if (!val) this.reset();
		}
	},
}
</script>

<style>
.v-snack {
	z-index: 10000000 !important;
}
</style>>
