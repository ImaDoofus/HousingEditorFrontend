import Blockly from 'blockly';

class CustomCategory extends Blockly.ToolboxCategory {
	/**
	 * Constructor for a custom category.
	 * @override
	 */
	constructor(categoryDef, toolbox, opt_parent) {
		super(categoryDef, toolbox, opt_parent);
	}
	
	/**
	 * Adds the colour to the toolbox.
	 * This is called on category creation and whenever the theme changes.
	 * @override
	 */
	addColourBorder_(colour){
		this.rowDiv_.style.backgroundColor = colour;
	}
	
	/**
	 * Sets the style for the category when it is selected or deselected.
	 * @param {boolean} isSelected True if the category has been selected,
	 *		 false otherwise.
	 * @override
	 */
	setSelected(isSelected){
		// We do not store the label span on the category, so use getElementsByClassName.
		var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
		if (isSelected) {
			// Change the background color of the div to white.
			this.rowDiv_.style.backgroundColor = 'white';
			// Set the text to black.
			labelDom.style.color = 'black';
		} else {
			// Set the background back to the original colour.
			this.rowDiv_.style.backgroundColor = this.colour_;
			// Set the text back to white.
			labelDom.style.color = 'white';
		}
		// This is used for accessibility purposes.
		Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
			Blockly.utils.aria.State.SELECTED, isSelected);
	}
}
	
Blockly.registry.register(
	Blockly.registry.Type.TOOLBOX_ITEM,
	Blockly.ToolboxCategory.registrationName,
	CustomCategory, true);