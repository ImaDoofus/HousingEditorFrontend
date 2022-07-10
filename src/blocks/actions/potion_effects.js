import Blockly from 'blockly/core';

Blockly.Blocks['apply_potion_effect'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel('Apply Potion Effect', 'block_header'))
		this.appendDummyInput('POTION_EFFECT')
			.appendField('Potion Effect')
			.appendField(new Blockly.FieldDropdown([
				['Speed', 'speed'],
				['Slowness', 'slowness'],
				['Haste', 'haste'],
				['Mining Fatigue', 'mining_fatigue'],
				['Strength', 'strength'],
				['Instant Health', 'instant_health'],
				['Instant Damage', 'instant_damage'],
				['Jump Boost', 'jump_boost'],
				['Nausea', 'nausea'],
				['Regeneration', 'regeneration'],
				['Resistance', 'resistance'],
				['Fire Resistance', 'fire_resistance'],
				['Water Breathing', 'water_breathing'],
				['Invisibility', 'invisibility'],
				['Blindness', 'blindness'],
				['Night Vision', 'night_vision'],
				['Hunger', 'hunger'],
				['Weakness', 'weakness'],
				['Poison', 'poison'],
				['Wither', 'wither'],
				['Health Boost', 'health_boost'],
				['Absorption', 'absorption'],
			]), 'POTION_EFFECT')
		this.appendDummyInput('DURATION')
			.appendField('Duration')
			.appendField(new Blockly.FieldNumber(60, 1, 3600, 1), 'DURATION')
		this.appendDummyInput('AMPLIFIER')
			.appendField('Amplifier')
			.appendField(new Blockly.FieldNumber(1, 1, 10, 1), 'AMPLIFIER')
		this.appendDummyInput('OVERRIDE_EXISTING_EFFECTS')
			.appendField('Override Existing Effects')
			.appendField(new Blockly.FieldCheckbox('FALSE'), 'OVERRIDE_EXISTING_EFFECTS')

		this.setInputsInline(false);
		this.setColour(120)
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip('<h3>Applies a potion effect to the player</h3>' + '<br>' +
		'<b>Potion Effect: </b>' + 'The potion effect to apply' + '<br>' +
		'<b>Duration: </b>' + 'The duration of the potion effect in seconds, 3600 = Infinite' + '<br>' +
		'<b>Amplifier: </b>' + 'The amplifier of the potion effect, max level of 10' + '<br>' +
		'<b>Override Existing Effects: </b>' + 'If true, any existing potion effects of the same type will be overridden' + '<br>' +
		'e.g. If the player is already slowness, and this block is set to slowness, the existing slowness will be overridden');
	}
}

Blockly.Blocks['clear_all_potion_effects'] = {
	init: function() {
		this.setColour(80);
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Clear potion effects  ", "block_header"))
		
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		this.setTooltip("Clear all potion effects from the player.");
	}
}