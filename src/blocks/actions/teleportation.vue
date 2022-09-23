<template>
	<category name="Teleportation" categorystyle="teleportation_category">
		<block type="teleport_player"></block>
		<block type="go_to_house_spawn"></block>
		<block type="send_to_lobby"></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';

export default {
	name: "TeleportationBlocks",
	components: {
	},
	data() {
		return {
		};
	},
	methods: {
		getImagePath(type, meta, extra = false) {
			if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		},
	},
	mounted() {
		const component = this;

		Blockly.Blocks['teleport_player'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(368, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Teleport Player", "block_header"))

				const dropdown = new Blockly.FieldDropdown([
					['Custom Coordinates', 'custom_coordinates'],
					['Housing Spawn', 'house_spawn'],
					['Current Location', 'current_location'],
				]);
				dropdown.setValidator((newValue) => {
					if (this.getInput('COORDINATES')) this.removeInput('COORDINATES');
					if (this.getInput('ROTATION')) this.removeInput('ROTATION');
					if (newValue === 'custom_coordinates') {
						this.appendDummyInput('COORDINATES')
							.appendField('X:')
							.appendField(new Blockly.FieldNumber(0, -80, 80, 0.1), 'X')
							.appendField('Y:')
							.appendField(new Blockly.FieldNumber(0, 0, 255, 0.1), 'Y')
							.appendField('Z:')
							.appendField(new Blockly.FieldNumber(0, -80, 80, 0.1), 'Z')
						this.appendDummyInput()
							.appendField('Include Rotation:')
							.appendField(new Blockly.FieldCheckbox('FALSE', (newValue) => {
								if (newValue === 'TRUE') {
									this.appendDummyInput('ROTATION_INFO')
										.appendField('do')
										.appendField(new Blockly.FieldLabel("/loc", "block_header"))
										.appendField('in-game to get your current rotation')
									this.appendDummyInput('YAW')
										.appendField('Yaw:')
										.appendField(new Blockly.FieldNumber(0, -180, 180, 0.01), 'YAW')
									this.appendDummyInput('PITCH')
										.appendField('Pitch:')
										.appendField(new Blockly.FieldNumber(0, -90, 90, 0.01), 'PITCH');
								} else {
									if (this.getInput('YAW')) this.removeInput('YAW');
									if (this.getInput('PITCH')) this.removeInput('PITCH');
									if (this.getInput('ROTATION_INFO')) this.removeInput('ROTATION_INFO');
								}
							}), 'INCLUDE_ROTATION')
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
					.appendField(new Blockly.FieldImage(component.getImagePath(47, 0), 20, 20))
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
						['Smash Heroes', 'Smash Heroes'],
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
					]), 'LOBBY')

				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Send player to the specified lobby.");

				this.setColour(180);
			}
		}

		Blockly.Blocks['go_to_house_spawn'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(2, 0), 20, 20))
					.appendField(new Blockly.FieldLabel("Go to House Spawn  ", "block_header"))
				
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip("Teleport player to the house spawn.");

				this.setColour(140);
			}
		}
	},
}
</script>