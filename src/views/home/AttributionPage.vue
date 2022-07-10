<template>
	<div>
		<NavigationBar />
		<v-container class="d-flex justify-center">
			<v-card elevation="0" max-width="800">
				<v-card-title class="justify-center">
					<span class="text-h2">Attribution</span>
				</v-card-title>
				<v-divider></v-divider>
				<br>
				<span>Thanks to everybody who helped with the website!</span>
				<br>
				<span>And most importantly the users. &#10084;&#65039;</span>
				<br>
				<v-list>
					<v-list-item><router-link to='/profile/62c74640d7c32facae4047bf'>@Wuxule</router-link><span class="ml-1">- Came up with housing limitations list, lots of suggestions & tester.</span></v-list-item>
					<v-list-item><router-link to='/profile/62c6c63cf1c2150f44d87f21'>@Arisings</router-link><span class="ml-1">- Helped set up the discord server, helped code part of the mod, and suggested lots of features.</span></v-list-item>
					<v-list-item><router-link to='/profile/62c6ed01d7c32facae4041e6'>@DeNether</router-link><span class="ml-1">- Made discord server logo & suggested lots of features.</span></v-list-item>
					<v-list-item><router-link to='/profile/62c767ebd7c32facae404985'>@Game_Freeze</router-link><span class="ml-1">- Made the website favicon.</span></v-list-item>
					<v-list-item>@beep boop#5599 (chop)<span class="ml-1">- Helped with part of the mod (/location command).</span></v-list-item>
				</v-list>
				<v-card-title class="justify-center">
					<span class="text-h4">Website assets</span>
				</v-card-title>
				<span>
					<b class="mr-1">Minecraft Font:</b>
					<a href="https://fontstruct.com/fontstructions/show/1655227/minecraftio" target="_blank">"Minecraftio"</a> by <a href="https://fontstruct.com/fontstructors/1664236/bwm" target="_blank">Bryndan W Meyerholt</a> is licensed under <a href="http://creativecommons.org/licenses/by-nd/3.0" target="_blank">CC BY-ND 3.0</a>
				</span>
				<br>
				<span>
					<b class="mr-1">Minecraft items & block textures:</b>
					<a href="https://minecraft-ids.grahamedgecombe.com/api" target="_blank">"Minecraft ID List"</a>
				</span>
				<br>
				<span>
					<b class="mr-1">Website backgrounds:</b>
					<a href="https://pixabay.com/users/chakkree_chantakad-15107399" target="_blank">"@Chakkree_Chantakad"</a><span class="mx-1">and</span><a href="https://pixabay.com/users/garzapaloelhermano-25204685" target="_blank">"@garzapaloelhermano"</a>
				</span>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import NavigationBar from '@/components/misc/NavigationBar.vue'

export default {
	name: 'AttributionPage',
	metaInfo() {
		return {
			title: 'Attribution',
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