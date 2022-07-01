<template>
	<v-img :src="randomBanner" id="banner"></v-img>
</template>

<script>
export default {
	data() {
		return {
			randomBanner: require(`@/assets/profile/banner${Math.floor(Math.random() * 2)}-min.png`),
		}
	}
}
</script>

<style scoped>
#banner {
	width: 100%;
	height: 100%;
}
</style>