import Blockly from 'blockly';
import sounds from '@/assets/sounds/soundHousingList.json';
import soundMap from '@/assets/sounds/soundMap.json';

Blockly.Blocks['set_gamemode'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Gamemode ", "block_header"))
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown([["Adventure", "adventure"], ["Survival", "survival"], ["Creative", "creative"]]), "GAMEMODE");
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
			.appendField(new Blockly.FieldLabel("Give Experience Levels  ", "block_header"))
		this.appendDummyInput()
			.appendField(new Blockly.FieldNumber(1, 1, 2147483647, 1), "LEVELS");
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
			.appendField(new Blockly.FieldLabel("Change Player Group ", "block_header"))
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

Blockly.Blocks['random_action'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Random Action   ", "block_header"))
		this.appendStatementInput('ACTIONS')
			.setCheck('action')
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setColour(10);
		this.setTooltip("Randomly executes one of the actions inside this block.");
		this.setHelpUrl("");
	}
}

Blockly.Blocks['set_compass_target'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Set Compass Target", "block_header"))

		const dropdown = new Blockly.FieldDropdown([
			['Custom Coordinates', 'custom_coordinates'],
			['Housing Spawn', 'house_spawn'],
			['Current Location', 'current_location'],
		]);
		dropdown.setValidator((newValue) => {
			if (this.getInput('COORDINATES')) this.removeInput('COORDINATES');
			if (newValue === 'custom_coordinates') {
				this.appendDummyInput('COORDINATES')
					.appendField('X:')
					.appendField(new Blockly.FieldNumber(0, -80, 80, 0.1), 'X')
					.appendField('Y:')
					.appendField(new Blockly.FieldNumber(0, 0, 255, 0.1), 'Y')
					.appendField('Z:')
					.appendField(new Blockly.FieldNumber(0, -80, 80, 0.1), 'Z');
			}
		})
		this.appendDummyInput()
			.appendField('Location:')
			.appendField(dropdown, 'LOCATION');

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Set the players compass to a location.");

		this.setColour(250);
	}
}

