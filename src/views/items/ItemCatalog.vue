<template>
	<div>
		<NavigationBar/>
		<CustomSnackbar ref='snackbar'/>
		<v-main class="ma-5">
			<v-row class="pt-5">
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
				<v-col cols="12" sm="12" md="10" lg="10">
					<v-select :items="sortOptions" prepend-icon="mdi-sort" label="SORT BY" v-model='sortBy' dense style="max-width: 250px;" @change="getPage(0)"></v-select>
				</v-col>
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="0" sm="0" md="1" lg="1">
				</v-col>
				<v-col cols="12" sm="12" md="10" lg="10">
					<v-row>
						<v-col cols="12" sm="6" md="6" lg="4" v-for="(item, index) in items" :key="`item-${index}`">
							<ItemCard :item="item" />
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
import ItemCard from '../../components/items/ItemCard.vue';
import requestItemPage from '@/utils/requestItemPage.js';

export default {
	name: 'ItemCatalog',
	metaInfo() {
		return {
			title: 'Items',
		}
	},
	components: {
		NavigationBar,
		CustomSnackbar,
		ItemCard,
	},
	data() {
		return {
			displayNum: 6,
			items: [],
			loading: false,
			page: 1,
			totalPages: 1,
			sortBy: 'Likes (Most to Least)',
			sortOptions: ['Likes (Most to Least)', 'Likes (Least to Most)', 'Name (A-Z)', 'Name (Z-A)', 'Item (A-Z)', 'Item (Z-A)', 'Date (Newest to Oldest)', 'Date (Oldest to Newest)']
		}
	},
	methods: {
		async getPage(pageNum) {
			if (this.loading) return;
			this.loading = true;
			this.items = new Array(this.displayNum).fill({})
			const json = await requestItemPage(this.$apiHostname, pageNum, this.displayNum, this.sortBy);
			if (!json) return this.$refs.snackbar.show('Error loading items', 'error');
			this.totalPages = json.totalPages;
			this.items = json.docs;
			this.loading = false;
		}
	},
	mounted() {
		this.url = new URL(window.location);
		this.sortBy = this.url.searchParams.get('sort') || 'Likes (Most to Least)';
		this.page = parseInt(this.url.searchParams.get('page')) || 1;
		this.getPage(this.page);
	}
}
</script>