<template>
	<div>
		<NavigationBar />
		<v-container class="d-flex justify-center">
			<v-card elevation="0" max-width="800">
				<v-card-title class="justify-center">
					<span class="text-h2">Housing Limitations Guide</span>
				</v-card-title>
				<v-divider></v-divider>
				<br>
				<span>Here is a guide to the max amount of everything in housing, really helpful! &#128064;</span>
				<br>
				<br>
				<span>Thank you, <router-link to="/profile/">@wuxule</router-link> for finding these limits!</span>
				<br>
				<span>If you spot any mistakes please <router-link to="/contact">Contact me</router-link></span>
				<br>
				<br>
				<div v-for="i in [0,1,2]" :key="i">
					<p class="text-h3 text-center">{{ headers[i][0].text }}</p>
					<v-data-table 
						:headers="headers[i]"
						:items="categories[i]"
						class="elevation-1"
						disable-pagination
						disable-sort
						hide-default-footer
					>
						<template #[`item.name`]="{ item }">
							<v-chip
								:color="item.color"
								dark
							>
								{{ item.name }}
							</v-chip>
						</template>
					</v-data-table>
					<br>
					<br>
					<br>
				</div>
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
			title: 'Housing Limits',
		}
	},
	components: {
		NavigationBar,
	},
	data() {
		return {
			headers: [
				[
					{
						text: 'Plot Size Limits',
						align: 'start',
						value: 'name',
					},
					{ text: '51x51x51 Plot Size or Smaller', value: '51' },
					{ text: '101x101x101 Plot Size', value: '101' },
				],
				[
					{
						text: 'Rank Limits',
						align: 'start',
						value: 'name',
					},
					{ text: 'No Rank', value: 'noRank' },
					{ text: 'Vip or greater', value: 'rank' },
				],
				[
					{
						text: 'Constant Limits',
						align: 'start',
						value: 'name',
					},
					{ text: 'Constant', value: 'constant' },
				],
			],
			categories: [
				[

					{
						name: 'Holograms',
						color: 'red',
						51: '30',
						101: '60',
					},
					{
						name: 'Regions',
						color: 'orange',
						51: '30',
						101: '60',
					},
					{
						name: 'NPCs',
						color: 'green',
						51: '20',
						101: '40',
					},
					{
						name: 'Parkour Leaderboards',
						color: 'blue',
						51: '10',
						101: '20',
					},
					{
						name: 'Stat Leaderboards',
						color: 'purple',
						51: '10',
						101: '20',
					}
				],
				[
					{
						name: 'Mailboxes',
						color: 'blue',
						noRank: '0',
						rank: '5',
					},
					{
						name: 'Social Heads',
						color: 'green',
						noRank: '0',
						rank: '1 Each',
					}
				],
				[
					{
						name: 'Tile Entities (Chests, Action Pads, etc)',
						color: 'deep-orange',
						constant: '9999',
					},
					{
						name: 'Item Frames & Paintings',
						color: 'amber',
						constant: '200',
					},
					{
						name: 'Minecarts',
						color: 'light-green',
						constant: '200',
					},
					{
						name: 'Furniture',
						color: 'cyan',
						constant: '50',
					},
					{
						name: 'TNT Minecarts',
						color: 'indigo',
						constant: '50',
					},
					{
						name: 'Parkour Plates',
						color: 'deep-purple',
						constant: '22 (20 Checkpoints)',
					},
					{
						name: 'Trashcans',
						color: 'purple',
						constant: '20',
					},
					{
						name: 'Teleport Pads',
						color: 'pink',
						constant: '12',
					},
				]
			]

		}
	},
	mounted() {
		
	}
}
</script>