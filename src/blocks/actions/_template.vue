<template>
	<category name="" categorystyle="_category">
		<block type=""></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';

export default {
	name: "TemplateBlocks",
	components: {
	},
	data() {
		return {
		};
	},
	methods: {
		getImagePath(type, meta, extra = false) {
			if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		},
	},
	mounted() {
		const component = this;

	},
}
</script>