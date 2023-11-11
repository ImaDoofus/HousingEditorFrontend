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
					<v-btn @click="$router.push('/')">Done</v-btn>
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
			code: "",
			copyText: "Click to copy",
		}
	},
	components: {
		CustomSnackbar,
		RandomBackground
	},
	methods: {
		copyCode() {
			navigator.clipboard.writeText(`/link-account ${this.code}`);
			this.copyText = "Copied!"
		},
	},
	async mounted() {
		const snackbar = this.$refs.snackbar;

		const response = await fetch(`${this.$apiHostname}/users/create-link-code`, {
			headers: {
				'authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		});
		
		if (response.ok) {
			const json = await response.json();
			this.code = json.code;
		} else {
			snackbar.show("Failed to create link code", "error");
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
