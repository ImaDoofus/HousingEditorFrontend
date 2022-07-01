import Blockly from 'blockly/core';

Blockly.Blocks['right_click_action'] = {
	init: function() {
		this.setColour(0);
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("On item right click  ", "on_activation_block_text"))
			.appendField(new Blockly.FieldImage("/assets/cursor-154478.svg", 32, 32, "*"))
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setNextStatement(true, 'action');
		this.setDeletable(false);
		// this.setMovable(false);
		this.setEditable(false);
		this.setTooltip("Any code connected to this will be run when an action is triggered." + "<br>" + "When a player steps on an action pad, clicks an action button, etc.");
	}
}