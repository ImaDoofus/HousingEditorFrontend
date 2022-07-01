import Blockly from 'blockly';

Blockly.Blocks['text_join'] = {
	init: function() {
		this.inputCount_ = 1;

		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel("Join Text", "block_header"))

		this.appendValueInput("TEXTINPUT1")
			.setCheck("TextComponent")
		this.appendValueInput("TEXTINPUT2")
			.setCheck("TextComponent")

		this.setColour(10)
		this.setColour(10)
		this.setInputsInline(true);
		this.setOutput(true, "TextJoin");
	},
	onchange: function(event) {
		// if ((event.newInputName && event.newInputName.includes('CONDITIONINPUT')) || (event.oldInputName && event.oldInputName.includes('CONDITIONINPUT'))) { // check if we addding of removing a condition input
		// 	if (event.oldParentId == this.id) { // check if we are removing a condition input
		// 		var input = event.oldInputName
		// 		var num = parseInt(input[input.length - 1]) - 1;
		// 		var block = Blockly.Workspace.getById(event.workspaceId).getBlockById(event.blockId);
		// 		console.log(this.getChildren(true)[num], block.id, num, input)
		// 		console.log(input,event)
		// 		this.removePart_(input);
		// 		// console.log(Blockly.mainWorkspace.getBlockById(event.blockId).outputConnection.targetConnection)
		// 	}
		// 	if (event.newParentId === this.id) {
		// 		this.addPart_();
		// 	}
		if (Blockly.Events.BLOCK_MOVE === event.type) {
			if (event.newParentId === this.id) {
				console.log(this.getChildren().length, this.inputList.length)
				if (this.getChildren().length >= this.inputList.length - 1) this.addInput_(); // check if needs another input before adding one
			}
			// if (event.oldParentId === this.id) {
			// 	this.removeInput_();
			// }
			if (event.oldParentId === this.id) {
				console.log(this.getChildren().length, this.inputList.length,event)
				// if (this.getChildren().filter().length < this.inputList.length - 3) { // check if there is an extra input before removing one.
				this.removeInput_(event.oldInputName);
				// }
			}
		}
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
		this.appendValueInput('TEXTINPUT' + this.inputCount_)
			.setCheck('TextComponent');
		for (let i = 1; i < this.inputList.length; i++) { // rename the inputs
			this.inputList[i].name = 'TEXTINPUT' + i;
		}
		console.log(this.getChildren(), this.inputList)
		this.inputCount_++;
	},

	removeInput_: function(name) {
		if (this.getInput(name)) {
			this.removeInput(name);
			this.inputCount_--;
		}
	}
}

Blockly.Blocks['text_component'] = {
	init: function() {
		this.isOpened_ = false;
		this.options_ = {};

		this.appendDummyInput()
			.appendField(new Blockly.FieldLabel('Text', 'block_header'))
			.appendField(new Blockly.FieldTextInput('Hello World'), 'TEXT')
			.appendField(new Blockly.FieldImage("/assets/settings_black_24dp.svg", 25, 25, "*", function () {
				// on open
				const parent = this.getSourceBlock();
				if (parent.isOpened_) parent.close_();
				else parent.open_();
				parent.isOpened_ = !parent.isOpened_;

			}))

		this.setOutput(true, 'TextComponent');
		this.setColour(210);
	},
	
	/**
	 * Returns the state of this block as a JSON serializable object.
	 * @return {{isOpened: boolean, options: object}} The state of this block
	 */
	saveExtraState: function() {
		return {
			'isOpened': this.isOpened_,
			'options': this.options_,
		};
	},

	// onchange: function(event) {
	// 	console.log('change', event)
	// },
	
	/**
	 * Applies the given state to this block.
	 * @param {*} state The state to apply to this block
	 */
	loadExtraState: function(state) {
		this.updateShape_(state['isOpened'], state['options']);
	},
	
	/**
	 * 
	 * @param {boolean} isOpened If block is opened or not.
	 * @this {Blockly.Block}
	 * @private
	 */
	updateShape_: function(isOpened, options) {
		this.options_ = options;
		console.log(options, this)
		// if (!this.options) this.options = options;
		this.isOpened_ = isOpened;
		if (isOpened) this.open_();
	},

	open_: function() {
		console.log("openOptions_", this.options_,this.options_['BOLD']);
		this.setInputsInline(false);

		var colorField = new Blockly.FieldColour(this.options_['COLOR']);
		colorField.setColours(
			['#AA0000', '#FF5555', '#FFAA00', '#FFFF55', '#00AA00', '#55FF55', '#55FFFF', '#00AAAA', '#0000AA', '#5555FF', '#FF55FF', '#AA00AA', '#FFFFFF', '#AAAAAA', '#555555', '#000000'],
			['Dark Red', 'Red', 'Gold', 'Yellow', 'Dark Green', 'Green', 'Aqua', 'Dark Aqua', 'Dark Blue', 'Blue', 'Light Purple', 'Dark Purple', 'White', 'Gray', 'Dark Gray', 'Black']
		);
		colorField.setColumns(4);
		colorField.setValidator(this.optionChangeListener_)
		console.log(this.id)
		this.appendDummyInput('COLOR')
			.appendField('color:')
			.appendField(colorField, 'COLOR');
		this.appendDummyInput('BOLD')
			.appendField('bold:')
			.appendField(new Blockly.FieldCheckbox(this.options_['BOLD'], this.optionChangeListener_), 'BOLD')
		this.appendDummyInput('ITALIC')
			.appendField('italic:')
			.appendField(new Blockly.FieldCheckbox(this.options_['ITALIC'], this.optionChangeListener_), 'ITALIC')
		this.appendDummyInput('UNDERLINED')
			.appendField('underline:')
			.appendField(new Blockly.FieldCheckbox(this.options_['UNDERLINED'], this.optionChangeListener_), 'UNDERLINED')
		this.appendDummyInput('STRIKETHROUGH')
			.appendField('strikethrough:')
			.appendField(new Blockly.FieldCheckbox(this.options_['STRIKETHROUGH'], this.optionChangeListener_), 'STRIKETHROUGH')
		this.appendDummyInput('OBFUSCATED')
			.appendField('obfuscated:')
			.appendField(new Blockly.FieldCheckbox(this.options_['OBFUSCATED'], this.optionChangeListener_), 'OBFUSCATED')
		this.appendDummyInput('FANCYFONT')
			.appendField('fancy font:')
			.appendField(new Blockly.FieldCheckbox(this.options_['FANCYFONT'], this.optionChangeListener_), 'FANCYFONT')

	},

	close_: function() {
		this.setInputsInline(true);
		if (this.getInput('COLOR')) this.removeInput('COLOR');
		if (this.getInput('BOLD')) this.removeInput('BOLD');
		if (this.getInput('ITALIC')) this.removeInput('ITALIC');
		if (this.getInput('UNDERLINED')) this.removeInput('UNDERLINED');
		if (this.getInput('STRIKETHROUGH')) this.removeInput('STRIKETHROUGH');
		if (this.getInput('OBFUSCATED')) this.removeInput('OBFUSCATED');
		if (this.getInput('FANCYFONT')) this.removeInput('FANCYFONT');
	},

	optionChangeListener_: function(newValue) {
		const newOptions = { ...this.sourceBlock_.options_ };
		newOptions[this.name] = newValue;
		this.getSourceBlock().options_ = newOptions;
	}

}
