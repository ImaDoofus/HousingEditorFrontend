import Blockly from 'blockly';

Blockly.Blocks['add_lore'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Add Lore", "block_header"))

		this.appendValueInput('LORE')
			.setCheck(['TextComponent', 'TextJoin'])
			.appendField('Lore:');

		this.setPreviousStatement(true, 'item');
		this.setNextStatement(true, 'item');
		this.setColour(230);
		this.setTooltip("Adds lore to the item");
	}
}