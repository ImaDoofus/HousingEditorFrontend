<template>
	<div>
		<NavigationBar />
		<v-container class="d-flex justify-center">
			<v-card elevation="0" max-width="800">
				<v-card-title class="justify-center">
					<span class="text-h2">Contact</span>
				</v-card-title>
				<v-divider></v-divider>
				<br>
				<span>Please feel free to reach out to me for any questions or concerns. You can also submit ideas for the website.</span>
				<br>
				<span class="caption">(but please don't ask me to add housing features because I am not a housing admin) &#128512;</span>
				<v-list>
					<v-list-item>• Discord (fastest): <b class="ml-1">ImaDoofus#0033</b></v-list-item>
					<v-list-item>• Email (slowest): <b class="ml-1">imadoofusyt@gmail.com</b></v-list-item>
				</v-list>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import NavigationBar from '@/components/misc/NavigationBar.vue'

export default {
	name: 'ContactPage',
	metaInfo() {
		return {
			title: 'Contact',
		}
	},
	components: {
		NavigationBar,
	},
	data() {
		return {
			
		}
	},
	methods: {
		
	},
	mounted() {
		
	}
}
</script>