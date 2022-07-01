<template>
	<v-card>
		<video disablePictureInPicture oncontextmenu="return false;" muted webkit-playsinline playsinline ref="video">
			<source src="@/assets/about/2022-06-22 01-28-53.mp4" type="video/mp4">
			<p>Your user agent does not support the HTML5 Video element.</p>
		</video>
	</v-card>
</template>

<script>
export default {
	name: 'VideoParallax1',
	data() {
		return {
		}
	},
	mounted() {
		const video = this.$refs.video;
		video.loop = true;
		video.playBackspeed = 2;
		video.play();
	}
}
</script>

<style scoped>
video {
	width: 100%;
	height: 100%;
}
video::-webkit-media-controls {
  display: none;
}
</style>