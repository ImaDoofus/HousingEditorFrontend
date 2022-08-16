<template>
	<v-container fill-height>
		<RandomBackground/>
		<CustomSnackbar ref='snackbar'/>
		<v-row align="center" justify="center" id="signup-wrapper">
			<v-card align="center" class="pa-5" id="frosted">
				<v-card-title style="word-break: break-word; font: 48px 'Minecraft'" class="pb-5">Login / Make Account</v-card-title>
				<div class='justify-center pt-5' id="signin_button"></div>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';
import RandomBackground from '@/components/login/RandomBackground.vue';

export default {
	components: {
		CustomSnackbar,
		RandomBackground,
	},
	data() {
		return {
		}
	},
	methods: {
		async handleCredentialResponse(response) {
			console.log(response)
			try {
				const postResponse = await fetch(`${this.$apiHostname}/users/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + response.credential
					},
				});
				const postResponseJson = await postResponse.json();
				if (postResponse.ok) {
					localStorage.setItem('token', postResponseJson.token);
					localStorage.setItem('userId', postResponseJson.userId);
					if (!postResponseJson.linked) { // If user has not linked to their minecraft account
						this.$router.push('/link-account');
					} else {
						this.$router.push('/');
					}
				} else {
					this.$refs.snackbar.text = `Error ${postResponse.status}: ${postResponseJson.message}`;
					this.$refs.snackbar.shown = true;
				}
			} catch (error) {
				console.log(error);
				this.$refs.snackbar.text = 'Error logging in';
				this.$refs.snackbar.shown = true;
			}
		},
	},
	mounted() {
		window.google.accounts.id.initialize({
			client_id: "708339058508-3ecqvdk1glefi99g7t8kro4pqjrgh56c.apps.googleusercontent.com",
			callback: this.handleCredentialResponse,
			ux_mode: 'popup',
		});
		// window.google.accounts.id.prompt();
		window.google.accounts.id.renderButton(
			document.getElementById("signin_button"),
			{ theme: "filled_blue", size: "large" }  // customization attributes
		);
	}

}
</script>

<style scoped>
	#background {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 0;
		left: 0;
	}

	#frosted {
		background: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
