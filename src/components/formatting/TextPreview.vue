<template>
	<div :class="`${backgroundToggle ? 'style1' : 'style3'} wrapper pa-1 d-flex`">
		<div :class="`${backgroundToggle ? 'style2' : 'style4'} px-1`">
			<div class="white--text d-flex">
				<span v-for="(textLine, index) in textArray" :key="`text-${index}`"
					:style="`
					color: ${textLine.color};
					text-decoration: ${textLine.underlined ? 'underline' : ''} ${textLine.strikethrough ? 'line-through' : ''};
					${textLine.bold ? 'text-shadow: 1px 0px;' : ''}
					${textLine.italic ? 'font-style: italic;' : ''}
					`"
					class="minecraft-text">{{ textLine.text }}</span>
			</div>
		</div>
		<div v-if="text.length <= maxTextLength" class="wrapper2 px-1 ml-5 green white--text">
			{{ text.length }}/{{ maxTextLength }}
		</div>
		<div v-else class="wrapper2 px-1 ml-5 red white--text">
			{{ text.length }}/{{ maxTextLength }}
		</div>
		<v-switch v-model="backgroundToggle" flat hide-details class="my-0 pl-3">
			<v-icon>mdi-pencil</v-icon>
		</v-switch>
	</div>
</template>

<script>
import MCTextParser from '@/utils/MinecraftTextParser'

export default {
	name: 'ItemPreview',
	data() {
		return {
			textArray: [],
			text: '',
			maxTextLength: 0,
			backgroundToggle: false,
		}
	},
	mounted() {
		this.interval = setInterval(() => {
			this.textArray = MCTextParser.randomizeObfuscated(this.textArray);
		}, 50)
	},
	destroyed() {
		clearInterval(this.interval)
	},
	methods: {
		setText(text) {
			this.text = text
			this.textArray = MCTextParser.parseText([text]);
		},
		setMaxTextLength(maxTextLength) {
			this.maxTextLength = maxTextLength;
		}
	}
}
</script>

<style scoped>
.wrapper {
	font-size: 16px;
	font-family: 'Minecraft';
	width: fit-content;
	border-radius: 5px;
	white-space: pre-wrap;
}
.style1 {
	background: #000;
}
.style2 {
	/* icon positioning */
	border: 3px solid #27055a;
}
.style3 {
	background: #78A7FF;
}
.style4 {
	/* padding to counter border in dark styble */
	padding: 3px; 
	background: rgba(0, 0, 0, 0.3);
}

.minecraft-text {
	text-decoration-thickness: 2px !important;
}
</style>