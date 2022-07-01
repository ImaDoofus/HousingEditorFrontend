<template>
	<div class="pa-1 wrapper1">
		<div class="d-flex flex-column px-1 wrapper2">
			<div class="d-flex align-center">
				<div class="white--text">
				<span v-for="(nameLine, index) in name" :key="`text-${index}`"
					:style="`
					color: ${nameLine.color};
					text-decoration: ${nameLine.underlined ? 'underline' : ''} ${nameLine.strikethrough ? 'line-through' : ''};
					${nameLine.bold ? 'text-shadow: 1px 0px;' : ''}
					${nameLine.italic ? 'font-style: italic;' : ''}
					`"
					class="minecraft-text">{{ nameLine.text }}</span>
				</div>
				<v-spacer></v-spacer>
				<img :src="this.setItemIcon()" class="ml-5">
			</div>
			<div class="white--text">
				<span v-for="(loreLine, index) in lore" :key="`lore-${index}`"
					:style="`
					color: ${loreLine.color};
					text-decoration: ${loreLine.underlined ? 'underline' : ''} ${loreLine.strikethrough ? 'line-through' : ''};
					${loreLine.bold ? 'text-shadow: 1px 0px;' : ''}
					${loreLine.italic ? 'font-style: italic;' : ''}
					`"
					class="minecraft-text">{{ loreLine.text }}<br v-if="loreLine.break"></span>
			</div>
			<span class="grey--text text--darken-2">minecraft:{{ text_type }}</span>
		</div>
	</div>
</template>

<script>
import items from '@/assets/minecraft-items/items.json'
import fontWidths from '@/assets/fonts/fontWidths.json'
import MCTextParser from '@/assets/utils/MinecraftTextParser'

export default {
	name: 'ItemPreview',
	data() {
		return {
			name: [],
			lore: [],
			type: 0,
			meta: 0,
			text_type: '',

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
	methods: {
		setFromItem(item) {
			this.meta = item.meta;
			this.type = item.type;
			this.setTextType();
			this.setName(item.name);
		},
		setItemIcon() {
			return require('@/assets/minecraft-items/items/' + this.type + '-' + this.meta + '.png');
		},
		setTextType() {
			const found = items.find((item) => {
				return this.type === item.type && this.meta === item.meta;
			})
			if (found) this.text_type = found.text_type;
			else this.text_type = 'Unknown';
		},
		setLore(lore) {
			this.lore = MCTextParser.parseText(lore)
		},
		setName(name) {
			this.name = MCTextParser.parseText([name])
		},
	},
	mounted() {
		this.setFromItem(items[1])
		this.interval = setInterval(() => {
			this.name = MCTextParser.randomizeObfuscated(this.name);
			this.lore = MCTextParser.randomizeObfuscated(this.lore);
		}, 50)
	},
	destroyed() {
		clearInterval(this.interval)
	}
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