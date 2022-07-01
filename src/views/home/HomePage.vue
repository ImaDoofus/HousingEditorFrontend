<template>
	<div>
		<NavigationBar />
		<h1>Welcome to Housing Editor!</h1>
	</div>
</template>

<script>
import NavigationBar from "@/components/misc/NavigationBar.vue";

export default {
	name: "HomePage",
	components: {
		NavigationBar,
	},
	data() {
		return {

		}
	},
}
</script>
