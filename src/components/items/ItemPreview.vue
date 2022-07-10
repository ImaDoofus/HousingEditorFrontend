<template>
	<div class="pa-1 wrapper1">
		<div class="d-flex flex-column px-1 wrapper2">
			<div class="d-flex align-center">
				<div class="white--text" v-if='nameArr.length > 0'>
					<span v-for="(nameLine, index) in nameArr" :key="`text-${index}`"
						:style="`
						color: ${nameLine.color};
						text-decoration: ${nameLine.underlined ? 'underline' : ''} ${nameLine.strikethrough ? 'line-through' : ''};
						${nameLine.bold ? 'text-shadow: 1px 0px;' : ''}
						${nameLine.italic ? 'font-style: italic;' : ''}
						`"
						class="minecraft-text">{{ nameLine.text }}</span>
				</div>
				<span v-else class="white--text">{{ this.item.name }}</span>
				<v-spacer></v-spacer>
				<img :src="this.getItemIcon()" class="ml-5">
			</div>
			<div>
				<span v-for="(loreLine, index) in loreArr" :key="`lore-${index}`"
					:style="`
					color: ${loreLine.color ? loreLine.color : '#AA00AA'};
					${loreLine.color ? '' : 'font-style: italic;'}
					text-decoration: ${loreLine.underlined ? 'underline' : ''} ${loreLine.strikethrough ? 'line-through' : ''};
					${loreLine.bold ? 'text-shadow: 1px 0px;' : ''}
					${loreLine.italic ? 'font-style: italic;' : ''}
					`"
					class="minecraft-text">{{ loreLine.text }}<br v-if="loreLine.break"></span>
			</div>
			<span class="grey--text text--darken-2">minecraft:{{ this.item.text_type }}</span>
		</div>
	</div>
</template>

<script>
import fontWidths from '@/assets/fonts/fontWidths.json'
import MCTextParser from '@/utils/MinecraftTextParser'

export default {
	name: 'ItemPreview',
	data() {
		return {
			nameArr: [],
			loreArr: [],

			widths: {
				'2': fontWidths.filter(char => { return char.width === 2 }),
				'3': fontWidths.filter(char => { return char.width === 3 }),
				'4': fontWidths.filter(char => { return char.width === 4 }),
				'5': fontWidths.filter(char => { return char.width === 5 }),
				'6': fontWidths.filter(char => { return char.width === 6 }),
				'7': fontWidths.filter(char => { return char.width === 7 }),
				'8': fontWidths.filter(char => { return char.width === 8 }),
			},
		}
	},
	props: ['item', 'name', 'lore'],
	methods: {
		getItemIcon() {
			return require('@/assets/minecraft-items/items/' + this.item.type + '-' + this.item.meta + '.png');
		},
	},
	mounted() {
		if (this.name) this.nameArr = MCTextParser.parseText([this.name]);
		this.loreArr = MCTextParser.parseText(this.lore);
		this.interval = setInterval(() => {
			this.loreArr = MCTextParser.randomizeObfuscated(this.loreArr);
			this.nameArr = MCTextParser.randomizeObfuscated(this.nameArr);
		}, 50)
	},
	destroyed() {
		clearInterval(this.interval)
	},
	watch: {
		name: {
			handler() {
				this.nameArr = MCTextParser.parseText([this.name]);
			},
			deep: true,
		},
		lore: {
			handler() {
				this.loreArr = MCTextParser.parseText(this.lore);
			},
			deep: true,
		},
	},
}
</script>

<style scoped>
.wrapper1 {
	font-size: 16px;
	font-family: 'Minecraft';
	width: fit-content;
	background: #000;
	border-radius: 5px;
}
.wrapper2 {
	/* icon positioning */
	position: relative;
	white-space: pre-wrap;
	border: 3px solid #27055a;
}
.minecraft-text {
	text-decoration-thickness: 2px !important;
}
</style>