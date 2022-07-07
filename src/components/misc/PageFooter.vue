<template>
	<v-container>
		<v-row>
			<v-col col="12">
				<v-footer padless class="background justify-center ">
					<v-card flat tile class="background text-center">
						<v-card-text>
							<v-btn v-for="icon in icons" :key="icon[0]" class="mx-4" icon @click="openIcon(icon[1])">
								<v-icon size="24px">{{ icon[0] }}</v-icon>
							</v-btn>
						</v-card-text>
						<v-card-text class="pt-0">
							<!-- Housing Editor is the ultimate tool to customize your housing. -->
							<!-- <br> -->
							<router-link v-for="link in links" :key="link[1]" :to="link[0]" style="text-decoration: none; color: inherit;" class="mx-1">{{ link[1] }}</router-link>
						</v-card-text>
						<v-divider></v-divider>
						<v-card-text>
							©
							{{ new Date().getFullYear() }}
							<strong>Housing Editor.</strong>
							All Rights Reserved
						</v-card-text>
					</v-card>
				</v-footer>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "PageFooter",
	data() {
		return {
			icons: [
				["mdi-youtube", 'https://www.youtube.com/channel/UC8y_L97-1oCLhJPt9vGW_xw'],
				["mdi-github", 'https://github.com/ImaDoofus/HousingEditor'],
			],
			links: [
				['/about', 'About'],
				['/contact', 'Contact'],
				['/privacy-policy', 'Privacy'],
			]
		}
	},
	methods: {
		openIcon(url) {
			window.open(url, '_blank')
		}
	}
};
</script>