import Blockly from "blockly/core";

class CustomRenderer extends Blockly.blockRendering.Renderer {
  constructor() {
    super();
  }

  makeConstants_() {
    return new CustomConstantsProvider();
  }
}

Blockly.blockRendering.register("custom_renderer", CustomRenderer);

class CustomConstantsProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    super();

    this.NOTCH_WIDTH = 20;
    this.NOTCH_HEIGHT = 6;
    this.CORNER_RADIUS = 5;
    this.TAB_HEIGHT = 16;
    this.TAB_WIDTH = 12;
    this.ADD_START_HATS = true;
    this.FIELD_TEXT_FONTSIZE = 11;
    this.TAB_OFFSET_FROM_TOP = 7;
  }
}
