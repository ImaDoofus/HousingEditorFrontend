<template>
	<div>
		<NavigationBar/>
		<CustomSnackbar ref='snackbar'/>
		<v-main class="ma-5">
			<v-row class="pt-5">
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
				<v-col cols="3" sm="12" md="3" lg="3">
					<v-select :items="sortOptions" prepend-icon="mdi-sort" label="SORT BY" v-model='sortBy' @change="getPage(0)"></v-select>
				</v-col>
				<v-col cols="3" sm="12" md="6" lg="6">
					<v-select
						v-model="actionTagsValue"
						:items="actionTags"
						item-text="name"
						:menu-props="{ bottom: true, offsetY: true }"
						small-chips
						label="Tags"
						multiple
						hint="Select action tags"
						return-object
						persistent-hint>
						<template #selection="{ item }">
							<v-chip :color="item.color" :class="`${item.textColor}--text`">{{ item.name }}</v-chip>
						</template>
					</v-select>
				</v-col>
				<v-col>
					<v-btn text class="primary mt-4" @click="getPage(0)">Search</v-btn>
				</v-col>
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
				<v-col cols="12" sm="12" md="10" lg="10">
					<v-row>
						<v-col cols="12" sm="6" md="6" lg="4" v-for="(action, index) in actions" :key="`action-${index}`">
							<ActionCard :action="action" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-pagination v-model="page" :length="totalPages" :total-visible='7' circle @input="getPage(page)" class="mt-3"></v-pagination>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
			</v-row>

		</v-main>
	</div>
</template>

<script>
import NavigationBar from '@/components/misc/NavigationBar.vue';
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';
import ActionCard from '../../components/actions/ActionCard.vue';
import requestActionPage from "@/utils/requestActionPage.js";

export default {
	name: 'ActionCatalog',
	metaInfo() {
		return {
			title: 'Actions',
		}
	},
	components: {
		NavigationBar,
		CustomSnackbar,
		ActionCard,
	},
	data() {
		return {
			displayNum: 6,
			actions: [],
			loading: false,
			page: 1,
			totalPages: 1,
			sortBy: 'Date (Newest to Oldest)',
			sortOptions: ['Date (Newest to Oldest)', 'Date (Oldest to Newest)', 'Likes (Most to Least)', 'Likes (Least to Most)', 'Name (A-Z)', 'Name (Z-A)'],
			actionTags: [
				{ name: 'Action Pad', color: 'red', textColor: 'black' },
				{ name: 'Action Button', color: 'pink', textColor: 'black' },
				{ name: 'NPC', color: 'purple', textColor: 'white' },
				{ name: 'Region', color: 'deep-purple', textColor: 'white' },
				{ name: 'Command', color: 'indigo', textColor: 'white' },
				{ name: 'Event', color: 'blue', textColor: 'black' },
				{ name: 'Utility', color: 'light-blue', textColor: 'black' },
				{ name: 'Shop', color: 'cyan', textColor: 'black' },
				{ name: 'Crafting', color: 'teal', textColor: 'black' },
				{ name: 'Parkour', color: 'green', textColor: 'black' },
				{ name: 'Template', color: 'light-green', textColor: 'black' },
				{ name: 'PVP', color: 'lime', textColor: 'black' },
				{ name: 'Conditionals', color: 'yellow', textColor: 'black' },
				{ name: 'Random Action', color: 'amber', textColor: 'black' },
				{ name: 'Complex', color: 'orange', textColor: 'black' },
				{ name: 'Simple', color: 'deep-orange', textColor: 'black' },
				{ name: 'Quest', color: 'brown', textColor: 'white' },
				{ name: 'Fishing', color: 'blue-grey', textColor: 'white' },
			],
			actionTagsValue: [],
		}
	},
	methods: {
		async getPage(pageNum) {
			if (this.loading) return;
			this.loading = true;
			this.actions = new Array(this.displayNum).fill({})
			const json = await requestActionPage(this.$apiHostname, pageNum, this.displayNum, this.sortBy, null, this.filterTags());
			if (!json) return this.$refs.snackbar.show('Error loading actions', 'error');
			this.loading = false;
			this.totalPages = json.totalPages;
			this.actions = json.docs;
			this.url.searchParams.set('page', this.page);
			this.url.searchParams.set('sort', this.sortBy);
			window.history.pushState({}, '', this.url);
		},
		filterTags() {
			if (this.actionTagsValue.length === 18) this.$refs.snackbar.show('Seriously! You are looking for actions with every tag? &#128514;', 'green');
			return this.actionTagsValue.map(tag => tag.name);
		},
	},
	mounted() {
		this.url = new URL(window.location);
		if (this.url.searchParams.get('sort')) this.sortBy = this.url.searchParams.get('sort');
		this.page = parseInt(this.url.searchParams.get('page')) || 1;
		this.getPage(this.page);
	}
}
</script>