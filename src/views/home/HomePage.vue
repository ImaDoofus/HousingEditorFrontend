<template>
	<div>
		<NavigationBar />
		<p class="text-h1 text-center pt-5">Housing Editor</p>
		<p class="text-h2 text-center">The best tool for making housings is finally here! &#127881;</p>

		<v-container>
			<v-card class="mt-5 pa-5">
				<v-card-title>
					<span class="text-h3">HousingEditor Update!</span>
				</v-card-title>
				<v-row class="ml-5 py-0">
					<div>
						<span>Support for the NEW Teams + GUIs Update!</span>
					</div>
				</v-row>
				<v-row class="ml-5">
					<span class="overline grey--text">By
						<router-link to="/profile/Alex">Alex</router-link>
					</span>
					<v-divider vertical class="mx-2"></v-divider>
					<span class="overline grey--text">Posted • November 10th 2023</span>
				</v-row>
				<br>
				<v-divider></v-divider>
				<v-card-text>
					<v-list dense>
						<v-list-item-group>
							<v-list-item>
								<span>Housing has updated to include new Teams and GUIs. HousingEditor now supports them allowing you to utilize the new actions in the editor.</span>
							</v-list-item>
							<v-list-item>
								<span>Make sure to install the latest version on the <a href="https://github.com/ImaDoofus/HousingEditor" target="_blank">GitHub</a>.</span>
							</v-list-item>
							<v-list-item>
								<span>Enjoy.</span>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-card-text>
			</v-card>
		</v-container>
		<v-container>
			<v-card class="mt-5 pa-5">
				<v-card-title>
					<span class="text-h3">Housing Music Maker</span>
				</v-card-title>
				<v-row class="ml-5 py-0">
					<div>
						<span>Create, Share, and Remix songs that you can play in your housing! &#128513;</span>
						<br>
						<span>Releasing October 28-31.</span>
					</div>
				</v-row>
				<v-row class="ml-5">
					<span class="overline grey--text">By
						<router-link to="/profile/62c6871f53cc93e40cd459b2">ImaDoofus</router-link>
					</span>
					<v-divider vertical class="mx-2"></v-divider>
					<span class="overline grey--text">Posted • October 17th 2022</span>
				</v-row>
				<br>
				<v-divider></v-divider>
				<v-card-text>
					<v-list dense>
						<v-list-item-group>
							<v-list-item>
								<span>I am working on a music editor that will allow you to import songs into your housing. There will be support for loading in <code>.nbs</code> files!</span>
							</v-list-item>
							<v-list-item>
								<span>It will be available both online and through an app.</span>
							</v-list-item>
							<v-list-item>
								<span>You will be able to choose a tick speed of 5, 10, 15, or 20 for your song and use any sound supported in housing.</span>
							</v-list-item>
							<v-list-item>
								<span>Most importantly you will be able to share your song with other people and view a catalog of songs.</span>
							</v-list-item>
							<v-list-item>
								<span>The planned release will be within the next few weeks.</span>
							</v-list-item>
						</v-list-item-group>
					</v-list>
					<span>Here are some leaked images:</span>
					<v-col class="d-flex align-center justify-center">
						<v-carousel>
							<v-carousel-item>
								<v-img src="/assets/post2/screenshot1.jpeg" max-width="1000"></v-img>
							</v-carousel-item>
							<v-carousel-item>
								<v-img src="/assets/post2/screenshot2.jpeg" max-width="400"></v-img>
							</v-carousel-item>
						</v-carousel>
					</v-col>
				</v-card-text>
			</v-card>
		</v-container>
		<v-container>
			<v-card class="mt-5 pa-5">
				<v-card-title>
					<span class="text-h3">Housing Editor is released</span>
				</v-card-title>
				<v-row class="ml-5">
					<span class="font-weight-bold mr-1">{{ totalUsers }}</span>
					<span>users worldwide and counting...</span>
				</v-row>
				<v-row class="ml-5">
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
										<v-list-item-subtitle>Thanks to everyone who helped&#10084;&#65039;<router-link to="attribution">See here</router-link></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>Release Video &#127909;</v-list-item-title>
										<v-list-item-subtitle>There is a great release <a href="" target="_blank">video</a></v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>Join the Discord <v-icon>mdi-discord</v-icon></v-list-item-title>
										<v-list-item-subtitle><a href="https://discord.gg/jX53YqUShu" target="_blank">https://discord.gg/jX53YqUShu</a></v-list-item-subtitle>
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

<style>
.frosted {
	background: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(5px);
	-webkit-backdrop-filter: blur(5px);
	font-family: 'Minecraft';
}
</style>