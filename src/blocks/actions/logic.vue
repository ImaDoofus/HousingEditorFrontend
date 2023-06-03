<template>
  <category name="Logic" categorystyle="logic_category">
    <block v-if="!isItem" type="conditional"></block>
    <block type="trigger_function"></block>
    <block v-if="!isItem" type="exit"></block>
    <block v-if="!isItem" type="change_player_stat"></block>
    <block v-if="!isItem" type="change_global_stat"></block>
    <block v-if="!isItem" type="cancel_event"></block>
  </category>
</template>

<script>
import Blockly from "blockly/core";

export default {
  name: "LogicBlocks",
  components: {},
  data() {
    return {};
  },
  props: {
    isItem: {
      type: Boolean,
    },
  },
  methods: {
    getImagePath(type, meta, extra = false) {
      if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
      return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
    },
  },
  mounted() {
    const component = this;

    Blockly.Blocks["trigger_function"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(157, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Trigger Function    ", "block_header"));
        this.appendDummyInput().appendField("Function Name").appendField(new Blockly.FieldTextInput("name"), "FUNCTION");
        this.appendDummyInput().appendField("Trigger for All Players").appendField(new Blockly.FieldCheckbox(false), "TRIGGER_FOR_ALL_PLAYERS");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(250);
        this.setTooltip("Triggers a function.");
        this.setHelpUrl("");
      },
    };
    Blockly.Blocks["exit"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(7, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Exit    ", "block_header"));
        this.setPreviousStatement(true, "action");
        this.setColour(45);
        this.setTooltip("Stops running actions after this block.");
        this.setHelpUrl("");
      },
    };
    Blockly.Blocks["conditional"] = {
      init: function () {
        this.inputCount_ = 1;

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(331, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Conditional  ", "block_header"));

        this.appendDummyInput().appendField("Match Any Condition").appendField(new Blockly.FieldCheckbox(false), "MATCH_ANY_CONDITION");

        this.appendValueInput("CONDITIONINPUT1").setCheck("Condition");
        this.appendStatementInput("IF").appendField("if");
        this.appendStatementInput("ELSE").appendField("else");

        this.setColour(0);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
      onchange: function (event) {
        if (!((event.newInputName && event.newInputName.includes("CONDITIONINPUT")) || (event.oldInputName && event.oldInputName.includes("CONDITIONINPUT"))))
          return; // make sure we are dealing with input blocks, not blocks in IF or ELSE
        if (event.newParentId === this.id) this.addInput_(); // if we are adding a condition block, add another input
        if (event.oldParentId === this.id) this.removeInput_(event.oldInputName); // if we are removing a condition block, remove the next input.
      },
      saveExtraState: function () {
        return {
          inputCount: this.inputCount_,
        };
      },

      loadExtraState: function (state) {
        this.inputCount_ = state["inputCount"];
        this.updateShape_();
      },

      updateShape_: function () {
        // start at 2 because we already have a CONDITIONINPUT1
        for (let i = 2; i < this.inputCount_ + 1; i++) {
          this.appendValueInput("CONDITIONINPUT" + i).setCheck("Condition");
          let last = this.inputList.length - 1;
          let element = this.inputList[last]; // get last input in list
          this.inputList.splice(last, 1); // remove last input from list
          this.inputList.splice(last - 2, 0, element); // -2 will move the appended input before the if and else inputs
        }
      },

      addInput_: function () {
        let empty = 0;
        this.inputList.forEach((element) => {
          if (element.name.includes("CONDITIONINPUT") && !element.connection.targetConnection) empty++;
        });

        if (empty > 0) return; // if there more than 1 empty inputs, don't add another

        for (let i = 1; i < this.inputList.length - 3; i++) {
          // rename the inputs
          this.inputList[i + 1].name = "CONDITIONINPUT" + i; // + 1 to account for the first inputs
        }

        this.inputCount_++;
        this.appendValueInput("CONDITIONINPUT" + this.inputCount_).setCheck("Condition");

        // move the appended input before the if and else inputs
        let last = this.inputList.length - 1;
        let element = this.inputList[last]; // get last input in list
        this.inputList.splice(last, 1); // remove last input from list
        this.inputList.splice(last - 2, 0, element); // -2 will move the appended input before the if and else inputs
        if (this.rendered) this.render(); // rerender with the moved input
      },

      removeInput_: function (name) {
        let nextInputName = name.slice(0, -1) + (parseInt(name.slice(-1)) + 1); // get the next input name
        let nextInput = this.getInput(nextInputName);
        if (nextInput) {
          if (nextInput.connection.isConnected()) return; // if the next input is connected, don't remove it;
          this.removeInput(nextInputName);
          this.inputCount_--;
          this.render();
        }
      },
    };
    Blockly.Blocks["change_player_stat"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(288, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Change Player Stat   ", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Add", "increment"],
          ["Subtract", "decrement"],
          ["Set", "set"],
          ["Multiply", "multiply"],
          ["Divide", "divide"],
        ]);

        this.appendDummyInput().appendField("Stat").appendField(new Blockly.FieldTextInput("name"), "STAT");
        this.appendDummyInput()
          .appendField("Operation")
          .appendField(dropdown, "MODE")
          .appendField(
            new Blockly.FieldTextInput("1", function (newValue) {
              if (!isNaN(newValue)) {
                if (newValue < -9223372036854775807) return null;
                if (newValue > 9223372036854775807) return null;
                return newValue;
              }
              return newValue;
            }),
            "VALUE"
          );

        this.setColour(60);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
    Blockly.Blocks["change_global_stat"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath("global_stat", 0, true), 20, 20))
          .appendField(new Blockly.FieldLabel("Change Global Stat   ", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Add", "increment"],
          ["Subtract", "decrement"],
          ["Set", "set"],
          ["Multiply", "multiply"],
          ["Divide", "divide"],
        ]);

        this.appendDummyInput().appendField("Stat").appendField(new Blockly.FieldTextInput("name"), "STAT");
        this.appendDummyInput()
          .appendField("Operation")
          .appendField(dropdown, "MODE")
          .appendField(
            new Blockly.FieldTextInput("1", function (newValue) {
              if (!isNaN(newValue)) {
                if (newValue < -9223372036854775808) return null;
                if (newValue > 9223372036854775807) return null;
                return newValue;
              }
              return newValue;
            }),
            "VALUE"
          );

        this.setColour(150);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
    Blockly.Blocks["cancel_event"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(46, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Cancel Event  ", "block_header"));

        this.setColour(150);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Cancels the event that triggered this action.");
      },
    };
  },
};
</script>
