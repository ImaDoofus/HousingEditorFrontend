import Blockly from 'blockly/core';

Blockly.Blocks['send_a_chat_message'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel('Send A Chat Message', 'block_header'))
		this.appendValueInput('TEXT')
			.setCheck(['TextComponent', 'TextJoin']);

		this.setColour(140)
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip('Sends a chat message to the player.' + '<br>'
						+ '<b>Inputs: </b>' + 'Text Block, Join Text Block');
		this.setInputsInline(true);
	}
}

Blockly.Blocks['display_action_bar'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel('Display Action Bar', 'block_header'))
		this.appendValueInput('TEXT')
			.setCheck(['TextComponent', 'TextJoin']);

		this.setColour(250)
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip('Displays an action bar (text just above the players hotbar)' + '<br>'
						+ '<b>Inputs: </b>' + 'Text Block, Join Text Block');
		this.setInputsInline(true);
	}
}

Blockly.Blocks['display_title'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel('Display Title', 'block_header'))
		this.appendValueInput('TITLE')
			.appendField('Title:')
			.setCheck(['TextComponent', 'TextJoin']);
		this.appendValueInput('SUBTITLE')
			.appendField('Subtitle:')
			.setCheck(['TextComponent', 'TextJoin']);
		this.appendDummyInput('STAY')
			.appendField('Stay:')
			.appendField(new Blockly.FieldNumber(1))
		this.appendDummyInput('FADEIN')
			.appendField('Fadein:')
			.appendField(new Blockly.FieldNumber(1))
		this.appendDummyInput('FADEOUT')
			.appendField('Fadeout:')
			.appendField(new Blockly.FieldNumber(1))

		this.setColour(300)
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip('Displays a title (big text in the center of the players screen)' + '<br>'
						+ '<b>Title: </b>' + 'Text Block, Join Text Block' + '<br>'
						+ '<b>Subtitle: </b>' + 'Text Block, Join Text Block' + '<br>'
						+ '<b>Stay: </b>' + 'The time the title stays on screen (seconds)' + '<br>'
						+ '<b>Fadein: </b>' + 'The time it takes the title to transition in (seconds)' + '<br>'
						+ '<b>Fadeout: </b>' + 'The time it takes to transition out');
	}
}

