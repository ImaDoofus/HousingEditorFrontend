<template>
	<category name="Inventory" categorystyle="inventory_category">
		<SelectItem v-if="!isItem" ref='selectItem' @itemSelected='itemSelected($event)'/>
		<block v-if="!isItem" type="give_item"></block>
		<block v-if="!isItem" type="remove_item"></block>
		<block type="reset_inventory"></block>
		<block v-if="!isItem" type="custom_item" class="custom_item_block" disabled="true"></block>
		<block v-if="!isItem" type="housing_editor_item" disabled="true"></block>
		<block v-if="isItem" type="use_remove_held_item"></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';
import SelectItem from '@/components/items/SelectItem.vue';

export default {
	name: "InventoryBlocks",
	components: {
		SelectItem,
	},
	props: {
		isItem: {
			type: Boolean,
		},
	},
	data() {
		return {
			itemSelected() {}
		};
	},
	methods: {
		getItemPath(type, meta) {
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		}
	},
	mounted() {
		const component = this;

		Blockly.Blocks["give_item"] = {
			init: function () {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Give Item", "block_header"));
				this.appendValueInput("ITEM")
					.setCheck(["CustomItem", "HousingEditorItem"])
					.appendField("Item:");
				this.appendDummyInput()
					.appendField("Amount:")
					.appendField(new Blockly.FieldNumber(1, 1, 64, 1), "AMOUNT");
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Give the player an item.");
				this.setColour(30);
				this.setInputsInline(false)
			}
		};
		Blockly.Blocks["remove_item"] = {
			init: function () {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Remove Item", "block_header"));
				this.appendValueInput("ITEM")
					.setCheck(["CustomItem", "HousingEditorItem"])
					.appendField("Item:");
				this.appendDummyInput()
					.appendField("Amount:")
					.appendField(new Blockly.FieldNumber(1, 1, 64, 1), "AMOUNT");
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Remove an item from the player.");
				this.setColour(230);
				this.setInputsInline(false)
			}
		};
		Blockly.Blocks["reset_inventory"] = {
			init: function () {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Reset Inventory", "block_header"));
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Reset the player's inventory.");
				this.setColour(300);
			}
		};
		Blockly.Blocks["housing_editor_item"] = {
			init: function () {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Housing Editor Item", "block_header"));
				this.appendDummyInput()
					.appendField(new Blockly.FieldTextInput("Item ID"), "ID");
				this.setOutput(true, "HousingEditorItem");
				this.setTooltip("Custom made item from housing editor.");
				this.setInputsInline(true);
				this.setColour(70);
			}
		};
		Blockly.Blocks["custom_item"] = {
			init: function () {
				const block = this
				const imageField = new Blockly.FieldImage(component.getItemPath(1, 0), 32, 32, "*", function () {
					component.$refs.selectItem.dialog = true;
					component.itemSelected = function (item) {
						const imageField = block.inputList[0].fieldRow[1];
						imageField.setValue(component.getItemPath(item.type, item.meta));
					};
				});

				// Blockly.utils.dom.addClass(this.getSvgRoot(), 'custom_item_block');

				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Custom Item", "block_header"))
					.appendField(imageField);

				this.setOutput(true, "CustomItem");
				this.setTooltip("Create a custom item.");
				this.setColour(120);
			}
		};
		Blockly.Blocks["use_remove_held_item"] = {
			init: function () {
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel("Use/Remove Held Item", "block_header"));
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Use or remove the player's held item.");
				this.setColour(230);
			}
		}
	},
}
</script>

<style>
/* .custom_item_block {
	image-rendering: pixelated;
} */
</style>