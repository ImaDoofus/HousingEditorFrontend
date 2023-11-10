<template>
  <category name="Miscellaneous" categorystyle="miscellaneous_category">
    <block v-if="!isItem" type="random_action"></block>
    <block type="give_experience_levels"></block>
    <block v-if="!isItem" type="change_player_group"></block>
    <block type="set_player_team"></block>
    <block type="play_sound"></block>
    <block type="set_gamemode"></block>
    <block type="set_compass_target"></block>
    <block type="balance_player_team"></block>
  </category>
</template>

<script>
import Blockly from "blockly/core";

export default {
  name: "MiscellaneousBlocks",
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

    Blockly.Blocks["set_gamemode"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(151, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Set Gamemode ", "block_header"));
        this.appendDummyInput().appendField(
          new Blockly.FieldDropdown([
            ["Adventure", "adventure"],
            ["Survival", "survival"],
            ["Creative", "creative"],
          ]),
          "GAMEMODE"
        );
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(230);
        this.setTooltip("Sets the gamemode of the player");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["give_experience_levels"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(384, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Give Experience Levels  ", "block_header"));
        this.appendDummyInput().appendField(new Blockly.FieldNumber(1, 1, 2147483647, 1), "LEVELS");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(100);
        this.setInputsInline(true);
        this.setTooltip("Gives the player experience levels");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["change_player_group"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(397, 3), 20, 20))
          .appendField(new Blockly.FieldLabel("Change Player Group ", "block_header"));
        this.appendDummyInput()
          .appendField("Group Name")
          .appendField(
            new Blockly.FieldTextInput("name", (newValue) => {
              if (newValue.length > 16) return null;
            }),
            "GROUP"
          );
        this.appendDummyInput().appendField("Demotion Protection").appendField(new Blockly.FieldCheckbox(false), "DEMOTION_PROTECTION");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(40);
        this.setTooltip("Changes the player group");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["random_action"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(130, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Random Action   ", "block_header"));
        this.appendStatementInput("ACTIONS").setCheck("action");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(10);
        this.setTooltip("Randomly executes one of the actions inside this block.");
        this.setHelpUrl("");
      },
    };

    function coordinateInputValidatorXZ(newValue) {
      if (newValue.startsWith("~")) newValue = newValue.substring(1);
      const number = parseFloat(newValue);
      if (isNaN(number) || number < -190 || number > 190) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    function coordinateInputValidatorY(newValue) {
      if (newValue.startsWith("~")) newValue = newValue.substring(1);
      const number = parseFloat(newValue);
      if (isNaN(number) || number < -50 || number > 300) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    Blockly.Blocks["set_compass_target"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(345, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Set Compass Target", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Custom Coordinates", "custom_coordinates"],          
          ["Housing Spawn", "house_spawn"],
					["Invokers Location", "invokers_location"],
          ["Current Location", "current_location"],
        ]);
        dropdown.setValidator((newValue) => {
          if (this.getInput("COORDINATES")) this.removeInput("COORDINATES");
          if (newValue === "custom_coordinates") {
            this.appendDummyInput("COORDINATES")
              .appendField("X:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "X")
              .appendField("Y:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorY), "Y")
              .appendField("Z:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "Z");
          }
        });
        this.appendDummyInput().appendField("Location:").appendField(dropdown, "LOCATION");

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Set the players compass to a location.");

        this.setColour(250);
      },
    };
    Blockly.Blocks["set_player_team"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath("team_stat", 0, true), 20, 20))
          .appendField(new Blockly.FieldLabel("Set Player Team   ", "block_header"));

        this.appendDummyInput().appendField("Team").appendField(new Blockly.FieldTextInput("name"), "TEAM");
        
        this.setColour(360);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
    Blockly.Blocks["balance_player_team"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(356, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Balance Player Team   ", "block_header"));

        this.setColour(330);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
  },
};
</script>
