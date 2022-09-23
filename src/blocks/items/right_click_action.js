import Blockly from 'blockly/core';

Blockly.Blocks['right_click_action'] = {
	init: function() {
		this.setColour(0);
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("On item right click  ", "block_header"))
			.appendField(new Blockly.FieldImage("/assets/cursor-154478.svg", 32, 32, "*"))
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setNextStatement(true, 'action');
		this.setDeletable(false);
		// this.setMovable(false);
		this.setEditable(false);
		this.setTooltip("The code connected to this block will run when the item is right clicked.");
	}
}