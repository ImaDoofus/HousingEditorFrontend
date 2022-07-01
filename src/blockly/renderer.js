import Blockly from 'blockly/core';

const CustomRenderer = function(name) {
	CustomRenderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(CustomRenderer, Blockly.blockRendering.Renderer);

const CustomConstantsProvider = function() {
	// Set up all of the constants from the base provider.
	CustomConstantsProvider.superClass_.constructor.call(this);

	// Override a few properties.
	/**
	 * The width of the notch used for previous and next connections.
	 * @type {number}
	 * @override
	 */
	this.NOTCH_WIDTH = 20;

	/**
	 * The height of the notch used for previous and next connections.
	 * @type {number}
	 * @override
	 */
	this.NOTCH_HEIGHT = 5;

	/**
	 * Rounded corner radius.
	 * @type {number}
	 * @override
	 */
	this.CORNER_RADIUS = 5;
	/**
	 * The height of the puzzle tab used for input and output connections.
	 * @type {number}
	 * @override
	 */
	this.TAB_HEIGHT = 16;
	/**
	 * The width of the puzzle tab used for previous and next connections.
	 * @type {number}
	 * @override
	 */
	this.TAB_WIDTH = 12;

	/**
	 * Enable hats on starting blocks.
	 */
	this.ADD_START_HATS = true;

	/**
	 * The font size of text fields.
	 * @type {number}
	 * @override
	 */
	this.FIELD_TEXT_FONTSIZE = 11;
};
Blockly.utils.object.inherits(CustomConstantsProvider, Blockly.blockRendering.ConstantProvider);

CustomRenderer.prototype.makeConstants_ = function() {
	return new CustomConstantsProvider();
};

Blockly.blockRendering.register('custom_renderer', CustomRenderer);