<template>
	<div>
		<NavigationBar />
		<v-container>
			<v-card class="mt-5 pa-5">
				<v-row class="justify-center mt-1">
					<span class="text-h2">Housing Editor is finally here! &#127881;</span>
				</v-row>
				<v-row class="justify-center">
					<span class="font-weight-bold mr-1">{{ totalUsers }}</span>
					<span>users worldwide and counting...</span>
				</v-row>
				<v-row class="justify-end mr-0">
					<span class="overline grey--text">By
						<router-link to="/profile/62c6871f53cc93e40cd459b2">ImaDoofus</router-link>
					</span>
					<v-divider vertical class="mx-2"></v-divider>
					<span class="overline grey--text">Posted • July 4th 2022</span>
				</v-row>
				<br>
				<v-divider></v-divider>
				<v-card-text>
					<span>Thank you to all the people who helped out with this project! I am really happy with how it's coming along. Check out the 
						<a href="https://hypixel.net" target="_blank">Hypixel Forums</a>
						to find the annoucement thread.</span>
					<br>
					<v-row>
						<v-col>
							<v-list>
								<span class="text-h5">More Information</span>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>Get the Mod &#10024;</v-list-item-title>
										<v-list-item-subtitle>Check out the <a href="https://github.com/ImaDoofus/HousingEditor" target="_blank">Tutorial</a></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>Attributions</v-list-item-title>
										<v-list-item-subtitle>Thanks to everyone who helped&#10084;&#65039;<a href="">See here</a></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>Release Video &#127909;</v-list-item-title>
										<v-list-item-subtitle>There is a great release <a href="" target="_blank">video</a></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-col>
						<v-col class="d-flex align-center justify-center">
							<v-img src="@/assets/logo/logo_dark.svg" max-width="400"></v-img>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import NavigationBar from "@/components/misc/NavigationBar.vue";
import moment from "moment";

export default {
	name: "HomePage",
	metaInfo() {
		return {
			title: 'Home',
		}
	},
	components: {
		NavigationBar,
	},
	data() {
		return {
			totalUsers: 0,
		}
	},
	mounted() {
		fetch(`${this.$apiHostname}/users/count`, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
		}).then(res => {
			return res.json();
		}).then(json => {
			this.totalUsers = json.count;
		});
	}
}
</script>
