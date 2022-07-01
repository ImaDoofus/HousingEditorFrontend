<template>
	<div>
		<EditItemNav @submit='itemSave'/>
		<EditItemWorkspace ref='workspace'/>
	</div>
</template>

<script>
import EditItemWorkspace from '@/components/items/EditItemWorkspace.vue'
import EditItemNav from '@/components/items/EditItemNav.vue'

export default {
	name: 'EditItem',
	components: {
		EditItemWorkspace,
		EditItemNav,
	},
	methods: {
		itemSave() {
			console.log(this.$refs.workspace.save())
		},
	},
	beforeRouteLeave (to, from, next) {
		const answer = window.confirm('You have unsaved changes.\nAre you sure you want to leave?');
		if (answer) next();
	},
}
</script>

<!-- <style scoped>
.item-preview {
	width: 100%;
	height: 100%;
	position: relative;
}
</style> -->