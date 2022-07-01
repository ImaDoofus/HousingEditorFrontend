import Blockly from 'blockly/core';

Blockly.Blocks['full_heal'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Fully Heal Player", "block_header"))

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Fully heal the player to their max health.");

		this.setColour(140);
	}
}

Blockly.Blocks['kill_player'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Kill Player", "block_header"))

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Kill the player.");

		this.setColour(10);
	}
}

Blockly.Blocks['set_health'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Health", "block_header"))

		this.appendDummyInput('HEALTH')
			.appendField('Health:')
			.appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'HEALTH');

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Set the player's health.");

		this.setColour(30);
	}
}

Blockly.Blocks['set_max_health'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Max Health", "block_header"))

		this.appendDummyInput('HEALTH')
			.appendField('Health:')
			.appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'HEALTH');

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Set the player's max health.");

		this.setColour(70);
	}
}

Blockly.Blocks['set_hunger_level'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Hunger Level", "block_header"))

		this.appendDummyInput('HUNGER')
			.appendField('Hunger:')
			.appendField(new Blockly.FieldNumber(0, 0, 100, 1), 'HUNGER');

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Set the player's hunger level.");

		this.setColour(160);
	}
}