<template>
	<v-img :src="randomBackground" id="background"></v-img>
</template>

<script>
export default {
	data() {
		return {
			randomBackground: require(`@/assets/login/backgrounds/${Math.floor(Math.random() * 10)}.png`),
		}
	}
}
</script>

<style scoped>
#background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>