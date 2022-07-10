<template>
	<div>
		<NavigationBar />
		<v-container class="d-flex justify-center">
			<v-card elevation="0" max-width="800" class="pa-5">
				<v-card-title class="justify-center">
					<span class="text-h2">Housing Limitations Guide</span>
				</v-card-title>
				<v-divider></v-divider>
				<br>
				<span>Here is a guide to the max amount of everything in housing, really helpful! &#128064;</span>
				<br>
				<br>
				<span>Thank you, <router-link to="/profile/62c74640d7c32facae4047bf">@Wuxule</router-link> for finding these limits!</span>
				<br>
				<span>If you spot any mistakes please <router-link to="/contact">Contact me</router-link></span>
				<br>
				<br>
				<div v-for="i in [0,1,2,3]" :key="i">
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
				[
					{
						text: 'Action Pad Limits',
						align: 'start',
						value: 'name',
					},
					{ text: 'Max Amount', value: 'max' },
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
				],
				[
					{
						name: 'Teleport Player',
						color: 'red',
						max: '1',
					},
					{
						name: 'Fail Parkour',
						color: 'pink',
						max: '1',
					},
					{
						name: 'Play Sound',
						color: 'purple',
						max: '1',
					},
					{
						name: 'Set Compass Target',
						color: 'deep-purple',
						max: '1',
					},
					{
						name: 'Set Gamemode',
						color: 'indigo',
						max: '1',
					},
					{
						name: 'Set Health',
						color: 'blue',
						max: '1',
					},
					{
						name: 'Set Hunger Level',
						color: 'light-blue',
						max: '1',
					},
					{
						name: 'Clear All Potion Effects',
						color: 'cyan',
						max: '1',
					},
					{
						name: 'Give Experience Levels',
						color: 'teal',
						max: '1',
					},
					{
						name: 'Send to Lobby',
						color: 'green',
						max: '1',
					},
					{
						name: 'Change Player Group',
						color: 'light-green  darken-1',
						max: '1',
					},
					{
						name: 'Kill Player',
						color: 'lime darken-2',
						max: '1',
					},
					{
						name: 'Full Heal',
						color: 'yellow darken-2',
						max: '1',
					},
					{
						name: 'Go to House Spawn',
						color: 'amber darken-2',
						max: '1',
					},
					{
						name: 'Display Title',
						color: 'orange  darken-1',
						max: '1',
					},
					{
						name: 'Display Action Bar',
						color: 'deep-orange',
						max: '1',
					},
					{
						name: 'Reset Inventory',
						color: 'red',
						max: '1',
					},
					{
						name: 'Set Max Health',
						color: 'pink',
						max: '1',
					},
					{
						name: 'Parkour Checkpoint',
						color: 'purple',
						max: '1',
					},
					{
						name: 'Change Stat',
						color: 'deep-purple',
						max: '5',
					},
					{
						name: 'Random Action',
						color: 'indigo',
						max: '5',
					},
					{
						name: 'Send a Chat Message',
						color: 'blue',
						max: '5',
					},
					{
						name: 'Conditional',
						color: 'light-blue',
						max: '15',
					},
					{
						name: 'Give Item',
						color: 'cyan',
						max: '20',
					},
					{
						name: 'Remove Item',
						color: 'teal',
						max: '20',
					},
					{
						name: 'Apply Potion Effect',
						color: 'green',
						max: '22 (one per effect)',
					},
				]
			]

		}
	},
	mounted() {
		
	}
}
</script>