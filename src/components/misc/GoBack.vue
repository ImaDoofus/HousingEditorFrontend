<template>
	<v-btn @click="goBack" icon>
		<v-icon color="black">mdi-arrow-left</v-icon>
	</v-btn>
</template>

<script>
export default {
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	}
}
</script>