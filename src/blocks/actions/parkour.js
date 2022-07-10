import Blockly from 'blockly/core';

Blockly.Blocks['parkour_checkpoint'] = {
	init: function() {
		this.setColour(180);
		this.appendDummyInput()
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