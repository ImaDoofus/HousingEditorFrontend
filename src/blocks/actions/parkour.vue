<template>
	<category name="Parkour" categorystyle="parkour_category">
		<block type="parkour_checkpoint"></block>
		<block type="fail_parkour"></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';

export default {
	name: "ParkourBlocks",
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

		Blockly.Blocks['parkour_checkpoint'] = {
			init: function() {
				this.setColour(180);
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(147, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Send to Parkour Checkpoint    ", "block_header"))

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Send player to their last parkour checkpoint");
			}
		}

		Blockly.Blocks['fail_parkour'] = {
			init: function() {

				this.setColour(110);
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(147, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Fail Parkour  ", "block_header"))

				this.appendValueInput('REASON')
					.appendField('Reason:')
					.setCheck(['TextComponent']);
				
				this.setInputsInline(true);
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Cause the player to fail the parkour with provided message.");
			}
		}
	},
}
</script>