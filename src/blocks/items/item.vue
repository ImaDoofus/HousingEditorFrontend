<template>
	<SelectItem ref='selectItem' @itemSelected='itemSelected($event)'/>
</template>

<script>
import Blockly from 'blockly/core';
import SelectItem from '@/components/items/SelectItem.vue';

export default {
	name: "InventoryBlocks",
	components: {
		SelectItem,
	},
	data() {
		return {
			
		};
	},
	methods: {
		getItemPath(type, meta) {
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		}
	},
	mounted() {
		const component = this;

		Blockly.Blocks["item"] = {
			init: function () {
				const block = this
				const imageField = new Blockly.FieldImage(component.getItemPath(1, 0), 32, 32, "*", function () {
					component.$refs.selectItem.dialog = true;
					component.itemSelected = function (item) {
						const imageField = block.inputList[0].fieldRow[1];
						imageField.setValue(component.getItemPath(item.type, item.meta));
						component.$emit('itemSelected', item);
					};
				});

				// Blockly.utils.dom.addClass(this.getSvgRoot(), 'custom_item_block');
				this.setDeletable(false);
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Item", "block_header"))
					.appendField(imageField);

				this.setNextStatement(true, 'item');
				this.setTooltip("Create a custom item.");
				this.setColour(120);
			}
		};
	},
}
</script>

<style>
/* .custom_item_block {
	image-rendering: pixelated;
} */
</style>