<template>
	<v-dialog v-model="dialog" max-width="300">
		<v-card class="pa-5">
			<v-card-title class="justify-center">
				Select an Item
			</v-card-title>
			<v-autocomplete :items="items" item-text="name" label="Item" return-object v-model="selection">
				<template v-slot:selection="{ item }">
					{{ item.name }}<img :src="require(`@/assets/minecraft-items/items/${item.type}-${item.meta}.png`)">
				</template>
				<template v-slot:item="{ item }">
					{{ item.name }}
					<v-spacer></v-spacer>
					<img :src="require(`@/assets/minecraft-items/items/${item.type}-${item.meta}.png`)">
				</template>
			</v-autocomplete>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="dialog = false">Cancel</v-btn>
				<v-btn color="primary" @click="selectItem">OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import itemsJSON from '@/assets/minecraft-items/items.json';

export default {
	name: 'SelectItem',
	data() {
		return {
			dialog: false,
			items: itemsJSON,
			selection: null,
		}
	},
	methods: {
		selectItem() {
			console.log(this.selection);
			this.dialog = false;
			this.$emit('itemSelected', this.selection);
		},
	}
}
</script>