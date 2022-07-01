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

export default {
	name: 'ActionCatalog',
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
			sortBy: 'Likes (Most to Least)',
			sortOptions: ['Likes (Most to Least)', 'Likes (Least to Most)', 'Name (A-Z)', 'Name (Z-A)', 'Date (Newest to Oldest)', 'Date (Oldest to Newest)']
		}
	},
	methods: {
		async getPage(pageNum) {
			if (this.loading) return;
			this.loading = true;
			this.actions = new Array(this.displayNum).fill({});
			try {
				const response = await fetch(`${this.$apiHostname}/api/actions/page/${pageNum}?sort=${this.sortBy}`);
				const json = await response.json();
				if (this.page !== json.page) {
					return this.getPage(this.page);
				}
				this.totalPages = json.totalPages;
				console.log(json)
				this.actions = json.docs;
				this.loading = false;
				console.log(this.urlParams)
				this.url.searchParams.set('page', this.page);
				this.url.searchParams.set('sort', this.sortBy);
				window.history.pushState({}, '', this.url);
			} catch (e) {
				console.log(e);
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.text = 'Error getting actions';
			}
		}
	},
	mounted() {
		console.log(window.location)

		this.url = new URL(window.location);
		console.log(this.url.href)
		this.sortBy = this.url.searchParams.get('sort') || 'Likes (Most to Least)';
		this.page = parseInt(this.url.searchParams.get('page')) || 1;
		console.log(this.page, this.sort)
		this.getPage(this.page);
	}
}
</script>