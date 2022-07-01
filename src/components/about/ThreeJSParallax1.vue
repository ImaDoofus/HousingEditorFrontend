<template>
	<div id="container"></div>
</template>

<script>
import * as Three from 'three'

export default {
	name: 'ThreeJSParallax1',
	data() {
	return {
		camera: null,
		scene: null,
		renderer: null,
		mesh: null
	}
	},
	methods: {
		init: function() {
			this.container = document.getElementById('container');

			this.camera = new Three.PerspectiveCamera(70, this.container.clientWidth/ this.container.clientHeight, 0.01, 10);
			this.camera.position.z = 1;

			this.scene = new Three.Scene();

			let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
			let material = new Three.MeshNormalMaterial();

			this.mesh = new Three.Mesh(geometry, material);
			this.scene.add(this.mesh);

			this.renderer = new Three.WebGLRenderer({antialias: true});
			this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
			this.container.appendChild(this.renderer.domElement);

		},
		animate: function() {
			requestAnimationFrame(this.animate);
			this.renderer.render(this.scene, this.camera);
		},
		resizeHandler() {
			this.camera.aspect = this.container.clientWidth / this.container.clientHeight
			this.camera.updateProjectionMatrix()
			this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
		},
		onScroll(e) {
			const speed = 0.001;

			this.mesh.rotation.y = window.scrollY * speed;
		}
	},
	mounted() {
		this.init();
		this.animate();
		window.addEventListener('resize', this.resizeHandler);
		window.addEventListener('scroll', this.onScroll);
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeHandler);
		window.removeEventListener('scroll', this.onScroll);
	}
}
</script>

<style scoped>
#container {
	width: 100%;
	height: 100%;
}
</style>