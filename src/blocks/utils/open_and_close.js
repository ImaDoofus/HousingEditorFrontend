import Blockly from "blockly/core";

export function getOpenIcon() {
  return new Blockly.FieldImage("/assets/settings_black_24dp.svg", 20, 20, "*", function () {
    if (this.getSourceBlock().isOpened_) this.getSourceBlock().close_();
    else this.getSourceBlock().open_();
    this.getSourceBlock().isOpened_ = !this.getSourceBlock().isOpened_;
  });
}

export function saveExtraState() {
  return {
    isOpened: this.isOpened_,
    options: this.options_,
    condition: this.condition_,
  };
}

export function loadExtraState(state) {
  this.updateShape_(state["isOpened"], state["options"], state["condition"]);
}

export function updateShape_(isOpened, options, condition) {
  this.isOpened_ = isOpened;
  this.options_ = options;
  this.condition_ = condition;
  if (isOpened) this.open_();
  else this.close_();
}

export function close_() {
  if (this.getInput("DATA")) this.removeInput("DATA");
}

export function dataChangeListener(newValue) {
  const newOptions = { ...this.sourceBlock_.options_ };
  newOptions[this.name] = newValue;
  this.getSourceBlock().options_ = newOptions;
}
