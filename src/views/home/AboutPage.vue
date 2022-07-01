<template>
	<v-theme-provider dark>
		<!-- @wheel.prevent @touchmove.prevent @scroll.prevent -->
		<div class="about" @wheel.prevent @touchmove.prevent @scroll.prevent> 
			<v-sheet height="100vh"></v-sheet>
			<v-sheet height="100vh">
				<v-img src="@/assets/about/earth-1365995_1920.jpg" height="100vh">
					<v-card height="60vh" width="75vw" class="d-flex flex-column transparent" align="center" elevation="0">
						<v-spacer></v-spacer>
						<router-link to="dashboard" style="text-decoration: none; color: inherit;">
							<h1 class="font-weight-light h1" style="font-size: 4vw;">Housing Editor</h1>
						</router-link>
						<vue-typer :text="typewriterData[1].currentText" :repeat="0" :type-delay="50" :pre-type-delay='1000' :erase-on-complete='true' @completed="finishedTyping(1)"></vue-typer>
					</v-card>
				</v-img>
			</v-sheet>
			<v-sheet height="6vh" elevation="10"></v-sheet>
			<v-row class="pa-5 ma-5">
				<v-col cols="12" align="center">
					<vue-typer :text="typewriterData[2].currentText" :repeat="0" :type-delay="70" style="font-size: 4vw;"></vue-typer>
					<v-icon size="100" class="pb-5 mb-5 pl-5">mdi-castle</v-icon>
				</v-col>
			</v-row>
			<v-divider v-for="i in [1,2,3,4,5,6,7,8,9,10,11]" :key="'line'+i" v-rellax="{ speed: -i/4 + 1/4 }">{{i}}</v-divider>
			<v-row v-if="showStars()">
				<v-col v-rellax="{ speed: [1.1,-2.8,1.5,-2.6,0.6,-3.1,0.4,-2.8,1.4,-3,1,-3][i] }" v-for="i in [0,1,2,3,4,5,6,7,8,9,10]" :key="'star'+i">
					<v-icon
					:style="`transform: rotate(${Math.cos(i) * 30}deg);`"
					:size="`${Math.abs(Math.cos(i)) * 50 + 50}`"
					color="yellow lighten-2">
						mdi-star
					</v-icon>
				</v-col>
			</v-row>
			<v-sheet v-else height="50"></v-sheet>
			<v-row class="pa-5">
				<v-col cols="1"></v-col>
				<v-col cols="5">
					<v-card v-rellax="{ speed: 1.2 }" align="center" class="pa-5" width="600">
						<p class="pb-1">Build actions with blocks</p>
						<VideoParallax1 />
					</v-card>

					<v-card v-rellax="{ speed: 0.8 }" align="center" class="pa-5" width="600">
						<vue-typer :text="typewriterData[3].currentText" :repeat="0" :type-delay="50" style="font-size: 1.25vw;"></vue-typer>
					</v-card>
				</v-col>
				<v-col cols="6">
					<v-card v-rellax="{ speed: 0.7 }" align="center" class="pa-5" width="600">
						<vue-typer :text="typewriterData[4].currentText" :repeat="0" :type-delay="50" :erase-on-complete='true' style="font-size: 1vw;" @completed="finishedTyping(4)"></vue-typer>
					</v-card>
					<v-card v-rellax="{ speed: 0.5 }" align="center" class="pa-5" width="600">
						<p class="pb-1">Save and edit later</p>
						<VideoParallax2 />
					</v-card>
				</v-col>
			</v-row>

			<v-row class="pa-5 ma-5">
				<v-col cols="12" align="center">
					<span style="font-size: 5vw">Easy and fast input</span>
				</v-col>
			</v-row>

			<v-sheet color="red">
				<v-row class="pa-5 ma-5" v-rellax="{ speed: -3.5 }" no-gutters>
					<v-col cols="8">
						<v-row>
							<v-col cols="12" align="center" style="height: 80vh;">
								<v-card align="center" class="pa-5" width="800">
									<vue-typer :text="typewriterData[5].currentText" :repeat="0" :type-delay="80" :pre-type-delay='1000' :erase-on-complete='true' style="font-size: 1.5vw;" @completed="finishedTyping(5)"></vue-typer>
								</v-card>
							</v-col>
							<v-col cols="12" align="center" style="height: 80vh;">
								<v-card align="center" class="pa-5" width="800">
									<vue-typer :text="typewriterData[6].currentText" :repeat="0" :type-delay="80" :pre-type-delay='1000' :erase-on-complete='true' style="font-size: 1.5vw;" @completed="finishedTyping(6)"></vue-typer>
								</v-card>
							</v-col>
							<v-col cols="12" align="center" style="height: 80vh;">
								<v-card align="center" class="pa-5" width="800">
									<vue-typer :text="typewriterData[7].currentText" :repeat="0" :type-delay="80" :pre-type-delay='1000' :erase-on-complete='true' style="font-size: 1.5vw;" @completed="finishedTyping(7)"></vue-typer>
								</v-card>
							</v-col>
							<v-col cols="12" align="center">
								<v-card align="center" class="pa-5" width="600">
									<p class="pb-1">One button to load in an action!</p>
									<VideoParallax3 />
								</v-card>
							</v-col>
						</v-row>
					</v-col>
					<v-col cols="4">
						<v-row v-rellax="{ speed: -1 }" v-if="showMinecraftIcons()">
							<v-col v-rellax="{ speed: Math.max(-2.5, (Math.sin(i) * 2) - 1.5) }" v-for="i in [0,1,2,3,4,5,6,7,8,9,10]" :key="'shape1'+i">
								<v-icon
								:style="`transform: rotate(${Math.cos(i) * 360}deg);`"
								:size="`${Math.abs(Math.cos(i)) * 50 + 50}`"
								color="grey darken-4">
									mdi-minecraft
								</v-icon>
							</v-col>
							<v-col v-rellax="{ speed: Math.max(-2.5, (Math.sin(i) * 2) - 1.5) }" v-for="i in [0,1,2,3,4,5,6,7,8,9,10]" :key="'shape2'+i">
								<v-icon
								:style="`transform: rotate(${Math.cos(i) * 360}deg);`"
								:size="`${Math.abs(Math.cos(i)) * 50 + 50}`"
								color="black">
									mdi-minecraft
								</v-icon>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-sheet>

			<!-- <v-row no-gutters>
				<v-col cols="6">
					<ThreeJSParallax1/>
				</v-col>
			</v-row> -->

			<v-row class="pa-5 ma-5" v-rellax="{ speed: -1.5 }">
				<v-col align="center">
					<v-btn @click="done()" height="30vh" width="50vw" class="green">
						<h1 style="font-size: 4vw">Get started</h1>
						<v-icon right size="100" class="pl-5 ml-5">mdi-check</v-icon>
					</v-btn>
				</v-col>
			</v-row>

			<v-dialog v-model="dialog" transition="dialog-top-transition" persistent content-class="elevation-0" width="300" class="d-flex justify-center">
				<v-card height="90vh" class="d-flex flex-column transparent">
					<v-card-actions class="d-flex justify-space-evenly" style="background-color: rgba(0,0,0,0.5);">
						<v-btn :disabled='prevDisabled()' v-if='prevShown()' @click="back" class="pa-5 red lighten-3">
							Back
							<v-icon>mdi-arrow-left</v-icon>
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn :disabled='nextDisabled()' v-if='nextShown()' @click="next" class="pa-5 green lighten-3" ref="next">
							Next
							<v-icon>mdi-arrow-right</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-sheet height="10000"></v-sheet>
		</div>
	</v-theme-provider>
</template>

<script>
// import ThreeJSParallax1 from '@/components/about/ThreeJSParallax1.vue'
import VideoParallax1 from '@/components/about/VideoParallax1.vue';
import VideoParallax2 from '../../components/about/VideoParallax2.vue';
import VideoParallax3 from '../../components/about/VideoParallax3.vue';

export default {
	name: 'AboutView',
	components: {
    // ThreeJSParallax1,
    VideoParallax1,
    VideoParallax2,
	VideoParallax3,
},
	data() {
		return {
			scroll: 0,
			scrollSpeed: 1,
			prevTimestamp: undefined,
			paused: false,
			dialog: false,
			location: 1,
			pauseLocations: [ // array of the locations to pause at and the corresponding speed
				[0, 1],
				[window.innerHeight, 1],

				// actions page
				[window.innerHeight * 2, 0.4],
				[window.innerHeight * 2, 1],
				[window.innerHeight * 2, 1],

				// actions demonstration page
				[window.innerHeight * 3, 0.4],
				[window.innerHeight * 4, 0.5],
				[window.innerHeight * 5, 0.5],
				[window.innerHeight * 6, 0.5],
				[window.innerHeight * 7, 1],

			],
			nextButtonText: 'Next',
			randomStars: Array.from({ length: 12 }, () => Math.random() * 360),

			typewriterData: [
				{ targetText: ' ', currentText: ' ' },
				{ targetText: ['Take your housing to the next level','The #1 tool for making housings...'], currentText: ' ' },
				{ targetText: 'Actions', currentText: ' ' },
				{ targetText: 'No more navigating the confusing GUI', currentText: ' ' },
				{ targetText: ['Share your actions with the community!','Comment 💬 and Like 👍 other actions.','#I<3HousingEditor'], currentText: ' ' },
				{ targetText: 'But, how do you load in an action?', currentText: ' ' },
				{ targetText: 'You can do it with one button!', currentText: ' ' },
				{ targetText: 'Just watch this...', currentText: ' ' },
				{ targetText: ' ', currentText: ' ' },
				{ targetText: ' ', currentText: ' ' },
			],

			autoMoveLocations: [1,4,5,6,7]
		}
	},
	methods: {
		done() {
			this.$router.push('/dashboard');
		},
		showStars() {
			return this.location > 1 && this.location < 5
		},
		showMinecraftIcons() {
			return this.location > 4 && this.location < 9
		},
		prevDisabled() {
			return this.location === 1
		},
		nextDisabled() {
			if (this.autoMoveLocations.indexOf(this.location) > -1) { // automatically goes to next in those locations
				return true
			}
			if (this.location === this.pauseLocations.length - 1) {
				return true
			}
			return false;
		},
		prevShown() {
			if (this.autoMoveLocations.indexOf(this.location) > -1) { // automatically goes to next in those locations
				return false
			}
			return true;
		},
		nextShown() {
			if (this.autoMoveLocations.indexOf(this.location) > -1) { // automatically goes to next in those locations
				return false
			}
			return true;
		},

		finishedTyping(location) {
			if (this.location === location) {
				this.next()
			}
			// if (this.autoMoveLocations.indexOf(this.location) > -1) {
			// 	if (this.typewriterData[this.location].currentText === this.typewriterData[this.location].targetText) {
			// 		console.log('finished typing')
			// 		this.next();
			// 	}
			// }
		},

		back() {
			this.dialog = false;
			this.location--;
			this.typewriterData[this.location].currentText = ' ';
			this.scroll = this.pauseLocations[this.location][0];
			this.paused = false;
			console.log(this.location, this.pauseLocations[this.location][0], this.scroll, this.paused);
		},
		next() {
			this.dialog = false;
			this.scroll = this.pauseLocations[this.location][0];
			if (this.location < this.pauseLocations.length - 1) this.location++;
			this.paused = false;
			this.scrollSpeed = this.pauseLocations[this.location][1];
			console.log(this.location, this.pauseLocations[this.location[0]], this.scroll, this.paused);
		},
		scrollLoop(timestamp) {
			if (this.prevTimestamp === undefined) this.prevTimestamp = timestamp;

			const delta = timestamp - this.prevTimestamp;
			this.prevTimestamp = timestamp;
			if (!this.paused) {
				this.scroll += this.scrollSpeed * delta;
				if (this.scroll >= this.pauseLocations[this.location][0]) {
					this.paused = true;
					if (this.autoMoveLocations.indexOf(this.location) === -1) {
						if (this.location < this.pauseLocations.length - 1) this.dialog = true;	
					}
					const text = this.typewriterData[this.location];
					text.currentText = text.targetText; // activate typewriter animation
				}
				window.scroll(0, this.scroll);
			}
			requestAnimationFrame(this.scrollLoop)
		}
	},
	mounted() {
		var b=[],d=Date.now();(function e(){var a=Date.now(),c=a-d;if(c){d=a;a=1/(c/1E3);10<=b.length&&b.shift();b.push(a);for(c=a=0;c<b.length;c++)a+=b[c];a/=b.length;document.title="FPS: "+Math.round(a)}requestAnimationFrame(e)})();
		this.$vuetify.theme.dark = true;
		requestAnimationFrame(this.scrollLoop)
	},
	destroyed() {
		cancelAnimationFrame(this.scrollLoop)
	},
}
</script>

<style>
.about {
	font-family: 'Minecraft' !important;
}

body {
	overflow: hidden !important;
}

.v-overlay__scrim {
	background-color: transparent !important;
}

body::-webkit-scrollbar {
  display: none !important;
}

body {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

.vue-typer .custom.char.typed {
  color: inherit;
}

.actions {
  color: yellow !important;
  text-decoration: line-through !important;
}
</style>