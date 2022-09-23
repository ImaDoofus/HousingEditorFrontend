<template>
	<category name="Health & Hunger" categorystyle="health_category">
		<block type="full_heal"></block>
		<block type="kill_player"></block>
		<block type="change_health"></block>
		<block type="set_max_health"></block>
		<block type="set_hunger_level"></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';

export default {
	name: "HealthBlocks",
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

		Blockly.Blocks['full_heal'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(322, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Fully Heal Player  ", "block_header"))

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Fully heal the player to their max health.");

				this.setColour(140);
			}
		}
		Blockly.Blocks['kill_player'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(101, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Kill Player  ", "block_header"))

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Kill the player.");

				this.setColour(10);
			}
		}
		Blockly.Blocks['change_health'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(260, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Change Health ", "block_header"))

				this.appendDummyInput()
					.appendField('Health:')
					.appendField(new Blockly.FieldNumber(20, 1, 100, 1), 'HEALTH');

				this.appendDummyInput()
					.appendField('Mode:')
					.appendField(new Blockly.FieldDropdown([
						['Add', 'increment'],
						['Subtract', 'decrement'],
						['Set', 'set'],
					]), 'MODE');

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Change the player's health.");

				this.setColour(30);
			}
		}
		Blockly.Blocks['set_max_health'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(37, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Set Max Health  ", "block_header"))

				this.appendDummyInput()
					.appendField('Health:')
					.appendField(new Blockly.FieldNumber(20, 1, 100, 1), 'HEALTH');

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Set the player's max health.");

				this.setColour(220);
			}
		}
		Blockly.Blocks['set_hunger_level'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(364, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Set Hunger Level  ", "block_header"))

				this.appendDummyInput()
					.appendField('Hunger:')
					.appendField(new Blockly.FieldNumber(20, 0, 20, 1), 'LEVEL');

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Set the player's hunger level.");

				this.setColour(170);
			}
		}
	},
}
</script>