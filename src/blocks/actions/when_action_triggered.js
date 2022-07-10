import Blockly from 'blockly/core';

Blockly.Blocks['when_action_triggered'] = {
	init: function() {
		this.setColour(50);
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel(" When Action ", "block_header"))
			.appendField(new Blockly.FieldImage("/assets/start_flag.svg", 32, 32, "*"))
			.appendField(new Blockly.FieldLabel("is Triggered    ", "block_header"))
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setNextStatement(true, 'action');
		this.setDeletable(false);
		// this.setMovable(false);
		this.setEditable(false);
		this.setTooltip("Any code connected to this will be run when an action is triggered." + "<br>" + "When a player steps on an action pad, clicks an action button, etc.");
	}
}