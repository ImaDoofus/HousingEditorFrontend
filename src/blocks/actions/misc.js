import Blockly from 'blockly';
import sounds from '@/assets/sounds/soundHousingList.json';
import soundMap from '@/assets/sounds/soundMap.json';

Blockly.Blocks['set_gamemode'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Gamemode", "block_header"))
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Survival", "survival"], ["Creative", "creative"], ["Adventure", "adventure"]]), "GAMEMODE");
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setColour(230);
		this.setTooltip("Sets the gamemode of the player");
		this.setHelpUrl("");
	}
}

Blockly.Blocks['give_experience_levels'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Give Experience Levels", "block_header"))
		this.appendDummyInput()
			.appendField(new Blockly.FieldNumber(1, 1, 2147483647, 1), "EXPERIENCE_LEVELS");
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setColour(100);
		this.setInputsInline(true);
		this.setTooltip("Gives the player experience levels");
		this.setHelpUrl("");
	}
}

Blockly.Blocks['change_player_group'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Change Player Group", "block_header"))
		this.appendDummyInput()
			.appendField('Group Name')
			.appendField(new Blockly.FieldTextInput('name', (newValue) => {
				if (newValue.length > 16) return null;
			}), "GROUP");
		this.appendDummyInput()
			.appendField('Demotion Protection')
			.appendField(new Blockly.FieldCheckbox(false), "DEMOTION_PROTECTION")
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setColour(40);
		this.setTooltip("Changes the player group");
		this.setHelpUrl("");
	}
}