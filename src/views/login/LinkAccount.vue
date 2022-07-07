<template>
	<v-container fill-height>
		<RandomBackground/>
		<CustomSnackbar ref='snackbar'/>
		<v-row align="center" justify="center" id="signup-wrapper">
			<v-card align="center" class="pa-5" id="frosted">
				<v-card-title id="card-title" class="pb-5">Link your Minecraft Account</v-card-title>
				<span class="text-center">Paste this command in-game</span>
				<v-card-text class="text-center mb-0 pb-0">
					<v-chip color="black darken-1" text-color="white" class="font-weight-bold">
						<span class="inv-text">/link-account {{ code }}</span>
						<v-divider
								class="mx-4"
								vertical
								color="white"
						></v-divider>
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<span @click="copyCode" @mouseout="reset" style="cursor: pointer;" v-bind="attrs" v-on="on">Copy</span>
							</template>
							<span>{{ copyText }}</span>
						</v-tooltip>
					</v-chip>
				</v-card-text>
				<v-card-actions class="justify-center mt-5">
					<v-btn @click="$router.push('/')">Link my account later</v-btn>
				</v-card-actions>
			</v-card>
		</v-row>
	</v-container>

</template>

<script>
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';
import RandomBackground from '@/components/login/RandomBackground.vue';

export default {
	name: 'LinkAccount',
	data() {
		return {
			expired: false,
			code: "",
			copyText: "Click to copy",
		}
	},
	components: {
		CustomSnackbar,
		RandomBackground
	},
	methods: {
		async copyCode() {
			if (this.expired) return; // Don't allow copying if the invitation has expired
			await navigator.clipboard.writeText('/link-account ' + this.code);
			this.copyText = "Copied!"
		},
		reset() {
			if (this.expired) return this.copyText = "Code expired"; // If code has expired	set the text to say.
			this.copyText = "Click to copy"
		},
	},
	async mounted() {
		const snackbar = this.$refs.snackbar;

		const response = await fetch(`${this.$apiHostname}/api/users/create-link-code`, {
			method: 'POST',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		});
		const reader = response.body.getReader();


		while (reader) {
			const { value, done } = await reader.read();
			if (done) break;
			let decoded = new TextDecoder().decode(value);
			if (decoded === 'expired') {
				snackbar.shown = true;
				snackbar.text = 'Your code has expired!';
				snackbar.color = 'red';
				snackbar.buttonText = 'Refresh Code';
				snackbar.buttonAction = () => {
					this.$router.go() // refresh page
				}
				this.expired = true;
				break;
			} else if (decoded === 'success') {
				snackbar.shown = true;
				snackbar.text = 'Successfully linked your account!';
				snackbar.color = 'success';
				snackbar.buttonText = 'Continue';
				snackbar.buttonAction = () => {
					this.$router.push('/')
				}
				break;
			} else if (decoded === 'error') {
				snackbar.shown = true;
				snackbar.text = 'An error occured. :(';
				snackbar.color = 'red';
				snackbar.buttonText = 'Reload';
				snackbar.buttonAction = () => {
					this.$router.go() // refresh page
				}
				this.expired = true;
			} else {
				this.code = decoded;
			}
		}

	}
}
</script>

<style scoped>
	#frosted {
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		font-family: 'Minecraft';
	}

	#card-title {
		font-size: 32px;
		word-break: break-word;
	}
</style>
