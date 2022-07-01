import Blockly from 'blockly';

Blockly.Blocks['set_name'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Item Name", "block_header"))

		this.appendValueInput('NAME')
			.setCheck(['TextComponent', 'TextJoin'])
			.appendField('Lore:');

		this.setPreviousStatement(true, 'item');
		this.setNextStatement(true, 'item');
		this.setColour(30);
		this.setTooltip("Sets the item name");
	}
}