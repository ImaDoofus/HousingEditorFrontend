import Blockly from 'blockly/core';


Blockly.Blocks['teleport_player'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Teleport Player", "block_header"))

		const dropdown = new Blockly.FieldDropdown([
			['Custom Coordinates', 'custom_coordinates'],
			['Housing Spawn', 'housing_spawn'],
			['Current Location', 'current_location'],
		]);
		dropdown.setValidator((newValue) => {
			if (newValue === 'custom_coordinates') {
				this.appendDummyInput('COORDINATES')
					.appendField('X:')
					.appendField(new Blockly.FieldNumber(0, -100, 100, 1), 'X')
					.appendField('Y:')
					.appendField(new Blockly.FieldNumber(0, -100, 100, 1), 'Y')
					.appendField('Z:')
					.appendField(new Blockly.FieldNumber(0, -100, 100, 1), 'Z');
			} else {
				if (this.getInput('COORDINATES')) this.removeInput('COORDINATES');
			}
		})
		this.appendDummyInput()
			.appendField('Location:')
			.appendField(dropdown, 'LOCATION');

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Teleport the player to a location.");

		this.setColour(250);
	}
}

Blockly.Blocks['send_to_lobby'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Send to Lobby", "block_header"))

		this.appendDummyInput()
			.appendField('Lobby:')
			.appendField(new Blockly.FieldDropdown([
				['Main Lobby', 'Main Lobby'],
				['Tournament Hall', 'Tournament Hall'],
				['Blitz SG', 'Blitz SG'],
				['The TNT Games', 'The TNT Games'],
				['Mega Walls', 'Mega Walls'],
				['Arcade Games', 'Arcade Games'],
				['Cops and Crims', 'Cops and Crims'],
				['UHC Champions', 'UHC Champions'],
				['Warlords', 'Warlords'],
				['Smash Heros', 'Smash Heros'],
				['Housing', 'Housing'],
				['SkyWars', 'SkyWars'],
				['Speed UHC', 'Speed UHC'],
				['Classic Games', 'Classic Games'],
				['Prototype', 'Prototype'],
				['Bed Wars', 'Bed Wars'],
				['Murder Mystery', 'Murder Mystery'],
				['Build Battle', 'Build Battle'],
				['Duels', 'Duels'],
				['Wool Wars', 'Wool Wars'],
			]))

		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Send player to the specified lobby.");

		this.setColour(180);
	}
}

Blockly.Blocks['go_to_house_spawn'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Go to House Spawn", "block_header"))
		
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Teleport player to the house spawn.");

		this.setColour(140);
	}
}