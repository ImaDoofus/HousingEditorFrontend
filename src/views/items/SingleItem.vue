<template>
	<div>
		<NavigationBar />
		<v-row class="d-flex justify-center pt-5">
			<v-col cols="6">
				<ItemCard :item="item" />
			</v-col>
		</v-row>
	</div>

</template>

<script>
import NavigationBar from "@/components/misc/NavigationBar.vue";
import ItemCard from "@/components/items/ItemCard.vue";
import MCTextParser from "@/utils/MinecraftTextParser";

export default {
	name: 'SingleItem',
	metaInfo() {
		return {
			title: this.getTitle(),
			titleTemplate: '%s | Item',
		}
	},
	components: {
		ItemCard,
		NavigationBar,
	},
	data() {
		return {
			item: null,
			id: '',
		}
	},
	methods: {
		getItem() {
			fetch(`${this.$apiHostname}/api/items/${this.id}`, {
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
			}).then(res => {
				return res.json();
			}).then(json => {
				this.item = json;
			});
		},
		getTitle() {
			return MCTextParser.removeFormatting(this.item?.itemData?.customName || this.item?.itemData?.item?.name || 'Loading...');
		}
	},
	mounted() {
		this.id = this.$route.params.id;
		if (this.id) {
			this.getItem();
		} else {
			this.$router.push('/');
		}
	}
}
</script>