import Blockly from 'blockly/core';
// import {parse, stringify} from 'flatted';

/**
 * Returns the state of condition block as a JSON serializable object.
 * @return {{isOpened: boolean, options: object, condition: string}} The state of this block
 */
 const saveExtraState = function() {
	return {
		'isOpened': this.isOpened_,
		'options': this.options_,
		'condition': this.condition_,
	}
}

/**
 * Applies the given state to a condition block.
 * @param {*} state The state to apply to this block
 */
const loadExtraState = function(state) {
	this.updateShape_(state['isOpened'], state['options'], state['condition']);
}

/**
 * 
 * @param {boolean} isOpened If block is opened or not.
 * @this {Blockly.Block}
 * @private
 */
const updateShape_ = function(isOpened, options, condition) {
	this.isOpened_ = isOpened;
	this.options_ = options;
	this.condition_ = condition;
	if (isOpened) this.open_();
	else this.close_();
}

const close_ = function() {
	if (this.getInput('DATA')) this.removeInput('DATA');
}

const dataChangeListener = function(newValue) {
	const newOptions = { ...this.sourceBlock_.options_ };
	newOptions[this.name] = newValue;
	this.getSourceBlock().options_ = newOptions;
}

const getOpenIcon = function() {
	return new Blockly.FieldImage("/assets/settings_black_24dp.svg", 20, 20, "*", function () {
		if (this.getSourceBlock().isOpened_) this.getSourceBlock().close_();
		else this.getSourceBlock().open_();
		this.getSourceBlock().isOpened_ = !this.getSourceBlock().isOpened_;
	})
};

Blockly.Blocks['conditional'] = {
	init: function() {
		this.inputCount_ = 1;

		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Conditional  ", "block_header"))

		this.appendValueInput("CONDITIONINPUT1")
			.setCheck("Condition")

		this.appendStatementInput("IF")
			.appendField('if')

		this.appendStatementInput("ELSE")
			.appendField('else')

		this.setColour(0)
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
		// this.setInputsInline(true);
	},
	onchange: function(event) {
		if (!Blockly.Events.BLOCK_MOVE === event.type) return; // make sure we are moving a block
		if (!(event.newInputName && event.newInputName.includes('CONDITIONINPUT') || (event.oldInputName && event.oldInputName.includes('CONDITIONINPUT')))) return; // make sure we are dealing with input blocks, not blocks in IF or ELSE

		if (event.newParentId === this.id) this.addInput_(); // if we are adding a condition block, add another input
		if (event.oldParentId === this.id) this.removeInput_(event.oldInputName); // if we are removing a condition block, remove the input
	},
	/**
	 * Returns the state of this block as a JSON serializable object.
	 * @return {{inputCount: number}} The state of this block, ie the item count.
	 */
	saveExtraState: function() {
		return {
			'inputCount': this.inputCount_,
		};
	},

	// /**
	//  * Applies the given state to this block.
	//  * @param {*} state The state to apply to this block, ie the item count.
	//  */
	loadExtraState: function(state) {
		this.updateShape_(state['inputCount']);
	},

	// /**
	//  * Adds inputs to the block until the block reaches the target input count.
	//  * @param {number} targetCount The number of inputs the block should have.
	//  * @this {Blockly.Block}
	//  * @private
	//  */
	updateShape_: function(targetCount) {
		while (this.inputCount_ < targetCount) {
			this.addInput_();
		}
		// while (this.inputCount > targetCount) {
			// this.removeInput_();
		// }
		this.inputCount_ = targetCount;
	},

	addInput_: function() {
		for (let i = 1; i < this.inputList.length - 2; i++) { // rename the inputs
			this.inputList[i].name = 'CONDITIONINPUT' + i;
		}

		this.inputCount_++;
		this.appendValueInput('CONDITIONINPUT' + this.inputCount_)
			.setCheck('Condition');
		
		// move the appended input before the if and else inputs
		var last = this.inputList.length - 1;
		var element = this.inputList[last]; // get last input in list
		this.inputList.splice(last, 1);
		this.inputList.splice(last - 2, 0, element); // -2 will move the appended input before the if and else inputs
		if (this.rendered) this.render(); // rerender with the moved input
	},

	removeInput_: function(name) {
		if (this.getInput(name)) {
			this.removeInput(name);
			this.inputCount_--;
			this.render()
		}
	}

}

Blockly.Blocks['change_stat'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Change Stat", "block_header"))
		
		const dropdown = new Blockly.FieldDropdown([
			['Add', 'increment'],
			['Subtract', 'decrement'],
			['Set', 'set'],
		]);

		this.appendDummyInput()
			.appendField('Stat')
			.appendField(new Blockly.FieldTextInput('name'), 'STAT')
		this.appendDummyInput()
			.appendField('Operation')
			.appendField(dropdown, 'MODE')
			.appendField(new Blockly.FieldNumber(1, 0, 2147483647, 1), 'VALUE')

		this.setColour(60);
		this.setPreviousStatement(true, 'action');
		this.setNextStatement(true, 'action');
	},
}

Blockly.Blocks['condition_doing_parkour'] = {
	init: function() {
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Doing Parkour  ", "block_header"))

		this.setColour(80)
		this.setOutput(true, 'Condition');
	}
}

Blockly.Blocks['condition_has_potion_effect'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'POTION_EFFECT': 'Speed' };
		this.condition_ = 'condition_has_potion_effect';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Has Potion Effect  ", "block_header"))
			.appendField(getOpenIcon())

		this.setColour(120)
		this.setOutput(true, 'Condition');
		this.setTooltip('Returns true if the player has the specified potion effect.');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		const dropdown = new Blockly.FieldDropdown([
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
		]);
		dropdown.setValue(this.options_['POTION_EFFECT']);

		this.appendDummyInput('DATA')
			.appendField('Potion Effect:')
			.appendField(dropdown, 'POTION_EFFECT')

		dropdown.setValidator(dataChangeListener) // dataChangeListener requires the getSourceBlock()
	},
	close_
}

Blockly.Blocks['condition_has_item'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'CHECK_METADATA': 'FALSE', 'WHERE_TO_CHECK': 'ANYWHERE', 'REQUIRE_AMOUNT_CHECKBOX': 'FALSE', 'REQUIRE_AMOUNT': 1 };
		this.condition_ = 'condition_has_item';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Has Item", "block_header"))
			.appendField(getOpenIcon())

		this.appendValueInput('ITEM')
			.setCheck(['CustomItem', 'HousingEditorItem'])
			.appendField('Item:')

		this.setColour(160)
		this.setOutput(true, 'Condition');

		this.setTooltip('<h3>Returns true if the player has the specified item.</h3>' + '<br>' + 
			'<b>Item ID</b> You can get an item ID from this website' + '<br>' + 
			'<b>Check Metadata</b> If true, the item must have the specified metadata' + '<br>' + 
			'e.g check for the same enchantment and name' + '<br>' + 
			'<b>Where to Check</b> The item will be checked in the specified slot' + '<br>' + 
			'<b>Require Amount</b> If true, the item must have the specified amount');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		this.appendDummyInput('CHECK_METADATA')
			.appendField('Check Metadata:')
			.appendField(new Blockly.FieldCheckbox(this.options_['CHECK_METADATA'], dataChangeListener), 'CHECK_METADATA')

		const dropdown = new Blockly.FieldDropdown([
			['Anywhere', 'Anywhere'], // default
			['Hand', 'Hand'],
			['Armor', 'Armor'],
			['Hotbar', 'Hotbar'],
			['Inventory', 'Inventory'],
		])
		dropdown.setValue(this.options_['WHERE_TO_CHECK']);
		
		this.appendDummyInput('WHERE_TO_CHECK')
			.appendField('Where to Check:')
			.appendField(dropdown, 'WHERE_TO_CHECK')

		dropdown.setValidator(dataChangeListener) // dataChangeListener requires the getSourceBlock()

		this.appendDummyInput('REQUIRE_AMOUNT')
			.appendField('Require Amount')
			.appendField(new Blockly.FieldCheckbox(this.options_['REQUIRE_AMOUNT_CHECKBOX'], this.requiredAmountListener_), 'REQUIRE_AMOUNT_CHECKBOX')
		
		if (this.options_['REQUIRE_AMOUNT_CHECKBOX'] == 'TRUE') {
				this.inputList[4].appendField(new Blockly.FieldTextInput(this.options_['REQUIRE_AMOUNT'], dataChangeListener), 'REQUIRE_AMOUNT')
		}
	},
	close_: function() {
		if (this.getInput('CHECK_METADATA')) this.removeInput('CHECK_METADATA');
		if (this.getInput('WHERE_TO_CHECK')) this.removeInput('WHERE_TO_CHECK');
		if (this.getInput('REQUIRE_AMOUNT')) this.removeInput('REQUIRE_AMOUNT');
	},
	requiredAmountListener_: function(newValue) {
		this.getSourceBlock().options_['REQUIRE_AMOUNT_CHECKBOX'] = newValue;
		if (newValue === 'TRUE') {
			this.getSourceBlock().inputList[4].appendField(new Blockly.FieldTextInput(this.getSourceBlock().options_['REQUIRE_AMOUNT'], dataChangeListener), 'REQUIRE_AMOUNT');
		} else {
			if (this.getSourceBlock().inputList[4].fieldRow.length === 3) this.getSourceBlock().inputList[4].removeField('REQUIRE_AMOUNT');
		}
	}
}

Blockly.Blocks['condition_within_region'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'REGION_NAME': 'Region Name' };
		this.condition_ = 'condition_within_region';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Within Region ", "block_header"))
			.appendField(getOpenIcon())

		this.setColour(200)
		this.setOutput(true, 'Condition');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		this.appendDummyInput('DATA')
			.appendField('Region Name:')
			.appendField(new Blockly.FieldTextInput(this.options_['REGION_NAME'], dataChangeListener), 'REGION_NAME')
	},
	close_
}

Blockly.Blocks['condition_required_permission'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'PERMISSION': 'Fly' };
		this.condition_ = 'condition_required_permission';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Required Permission  ", "block_header"))
			.appendField(getOpenIcon())

		this.setColour(240)
		this.setOutput(true, 'Condition');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		const dropdown = new Blockly.FieldDropdown([
			['Fly', 'Fly'],
			['Wood Door', 'Wood Door'],
			['Iron Door', 'Iron Door'],
			['Wood Trap Door', 'Wood Trap Door'],
			['Iron Trap Door', 'Iron Trap Door'],
			['Fence Gate', 'Fence Gate'],
			['Button', 'Button'],
			['Slime', 'Slime'],
			['/tp', '/tp'],
			['Tp Others', 'Tp Others'],
			['Jukebox', 'Jukebox'],
			['Kick', 'Kick'],
			['Ban', 'Ban'],
			['Mute', 'Mute'],
			['Pet Spawning', 'Pet Spawning'],
			['Build', 'Build'],
			['Fluid', 'Fluid'],
			['Pro Tools', 'Pro Tools'],
			['Use Chests', 'Use Chests'],
			['Item Editor', 'Item Editor'],
			['Switch Game Mode', 'Switch Game Mode'],
			['Edit Stats', 'Edit Stats'],
			['Change Player Group', 'Change Player Group'],
		]);
		dropdown.setValue(this.options_['PERMISSION']);

		this.appendDummyInput('DATA')
			.appendField('Permission:')
			.appendField(dropdown, 'PERMISSION')

		dropdown.setValidator(dataChangeListener) // dataChangeListener requires the getSourceBlock()
	},
	close_
}

Blockly.Blocks['condition_stat_requirement'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'STAT': 'stat', 'COMPARATOR': 'equal_to', 'VALUE': '0' };
		this.condition_ = 'condition_stat_requirement';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Stat Requirement ", "block_header"))
			.appendField(getOpenIcon())

		this.setColour(280);
		this.setOutput(true, 'Condition');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		const dropdown = new Blockly.FieldDropdown([
				['Equal To =', 'equal_to'], // default
				['Less Than <', 'less_than'],
				['Less Than or Equal To <=', 'less_than_or_equal_to'],
				['Greater Than or Equal To >=', 'greater_than_or_equal_to'],
				['Greater Than >', 'greater_than'],
			])
		dropdown.setValue(this.options_['COMPARATOR']);

		const value = new Blockly.FieldTextInput(this.options_['VALUE']);

		this.appendDummyInput('DATA')
			.appendField('Stat:')
			.appendField(new Blockly.FieldTextInput(this.options_['STAT'], dataChangeListener), 'STAT')
			.appendField('Comparison:')
			.appendField(dropdown, 'COMPARATOR')
			.appendField('Value:')
			.appendField(value, 'VALUE')
		
		dropdown.setValidator(dataChangeListener) // dataChangeListener requires the getSourceBlock()
		value.setValidator(dataChangeListener) // dataChangeListener requires the getSourceBlock()
	},
	close_
}

Blockly.Blocks['condition_required_group'] = {
	init: function() {
		this.isOpened_ = true;
		this.options_ = { 'GROUP': 'group name', 'INCLUDE_HIGHER_GROUPS': 'TRUE' };
		this.condition_ = 'condition_required_group';
		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Required Group ", "block_header"))
			.appendField(getOpenIcon())

		this.setColour(320)
		this.setOutput(true, 'Condition');
	},
	saveExtraState,
	loadExtraState,
	updateShape_,
	open_: function() {
		this.appendDummyInput('DATA')
			.appendField('Group:')
			.appendField(new Blockly.FieldTextInput(this.options_['GROUP'], dataChangeListener), 'GROUP')
			.appendField('Include Higher Groups:')
			.appendField(new Blockly.FieldCheckbox(this.options_['INCLUDE_HIGHER_GROUPS'], dataChangeListener), 'INCLUDE_HIGHER_GROUPS')
	},
	close_
}