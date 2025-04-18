<template>
  <category name="TP & Velocity" categorystyle="teleportation_category">
    <block type="teleport_player"></block>
    <block type="go_to_house_spawn"></block>
    <block type="send_to_lobby"></block>
    <block type="change_velocity"></block>
    <block type="launch_to_target"></block>
  </category>
</template>

<script>
import Blockly, {Block} from "blockly/core";

export default {
  name: "TeleportationBlocks",
  components: {},
  data() {
    return {};
  },
  methods: {
    getImagePath(type, meta, extra = false) {
      if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
      return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
    },
  },
  mounted() {
    const component = this;

    function coordinateInputValidatorXZ(newValue) {
      if (newValue.startsWith("~") || newValue.startsWith("^")) newValue = newValue.substring(1);
      const number = parseFloat(newValue);
      if (isNaN(number) || number < -190 || number > 190) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    function directionInputValidator(newValue) {
      const number = parseFloat(newValue);
      if (isNaN(number) || number < -50 || number > 50) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    function strengthInputValidator(newValue) {
      const number = parseFloat(newValue);
      if (isNaN(number) || number < 0 || number > 20) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    function coordinateInputValidatorY(newValue) {
      if (newValue.startsWith("~") || newValue.startsWith("^")) newValue = newValue.substring(1);
      const number = parseFloat(newValue);
      if (isNaN(number) || number < -50 || number > 300) return null;

      const coordinateRegex = /^-?\d+(?:\.\d{1,2})?$/;
      if (!coordinateRegex.test(newValue)) return null;
    }

    Blockly.Blocks["teleport_player"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(368, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Teleport Player", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Current Location", "current_location"],
          ["Invokers Location", "invokers_location"],
          ["Custom Coordinates", "custom_coordinates"],
          ["Housing Spawn", "house_spawn"],
        ]);
        dropdown.setValidator((newValue) => {
          if (this.getInput("COORDINATES")) this.removeInput("COORDINATES");
          if (this.getInput("ROTATION")) this.removeInput("ROTATION");
          if (this.getInput("YAW")) this.removeInput("YAW");
          if (this.getInput("PITCH")) this.removeInput("PITCH");
          if (newValue === "custom_coordinates") {
            this.appendDummyInput("COORDINATES")
              .appendField("X:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "X")
              .appendField("Y:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorY), "Y")
              .appendField("Z:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "Z");
            this.appendDummyInput("ROTATION")
              .appendField("Include Rotation:")
              .appendField(
                new Blockly.FieldCheckbox("FALSE", (newValue) => {
                  if (newValue === "TRUE") {
                    this.appendDummyInput("YAW").appendField("Yaw:").appendField(new Blockly.FieldNumber(0, -180, 180, 0.01), "YAW");
                    this.appendDummyInput("PITCH").appendField("Pitch:").appendField(new Blockly.FieldNumber(0, -90, 90, 0.01), "PITCH");
                  } else {
                    if (this.getInput("YAW")) this.removeInput("YAW");
                    if (this.getInput("PITCH")) this.removeInput("PITCH");
                  }
                }),
                "INCLUDE_ROTATION"
              );
          }
        });
        this.appendDummyInput().appendField("Location:").appendField(dropdown, "LOCATION");

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Teleport the player to a location.");

        this.setColour(250);
      },
    };

    Blockly.Blocks["send_to_lobby"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(47, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Send to Lobby", "block_header"));

        this.appendDummyInput()
          .appendField("Lobby:")
          .appendField(
            new Blockly.FieldDropdown([
              ["Main Lobby", "Main Lobby"],
              ["Tournament Hall", "Tournament Hall"],
              ["Blitz SG", "Blitz SG"],
              ["The TNT Games", "The TNT Games"],
              ["Mega Walls", "Mega Walls"],
              ["Arcade Games", "Arcade Games"],
              ["Cops and Crims", "Cops and Crims"],
              ["UHC Champions", "UHC Champions"],
              ["Warlords", "Warlords"],
              ["Smash Heroes", "Smash Heroes"],
              ["Housing", "Housing"],
              ["SkyWars", "SkyWars"],
              ["Speed UHC", "Speed UHC"],
              ["Classic Games", "Classic Games"],
              ["Prototype", "Prototype"],
              ["Bed Wars", "Bed Wars"],
              ["Murder Mystery", "Murder Mystery"],
              ["Build Battle", "Build Battle"],
              ["Duels", "Duels"],
              ["Wool Wars", "Wool Wars"],
            ]),
            "LOBBY"
          );

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Send player to the specified lobby.");

        this.setColour(180);
      },
    };

    Blockly.Blocks["go_to_house_spawn"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(2, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Go to House Spawn  ", "block_header"));

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Teleport player to the house spawn.");

        this.setColour(140);
      },
    };

    Blockly.Blocks["change_velocity"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(165, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Change Velocity  ", "block_header"));

        this.appendDummyInput().appendField("X Direction:")
          .appendField(new Blockly.FieldTextInput("10", directionInputValidator), "X")

        this.appendDummyInput().appendField("Y Direction:")
          .appendField(new Blockly.FieldTextInput("10", directionInputValidator), "Y")

        this.appendDummyInput().appendField("Z Direction:")
          .appendField(new Blockly.FieldTextInput("10", directionInputValidator), "Z")

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Change the velocity direction of the player.");

        this.setColour(110);
      },
    };

    Blockly.Blocks["launch_to_target"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(341, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Launch to Target  ", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Housing Spawn", "house_spawn"],
          ["Invokers Location", "invokers_location"],
          ["Current Location", "current_location"],
          ["Custom Coordinates", "custom_coordinates"]
        ]);
        dropdown.setValidator((newValue) => {
          if (this.getInput("COORDINATES")) this.removeInput("COORDINATES");
          if (this.getInput("YAW")) this.removeInput("YAW");
          if (this.getInput("PITCH")) this.removeInput("PITCH");
          if (this.getInput("STRENGTH")) this.removeInput("STRENGTH");
          if (newValue === "custom_coordinates") {
            this.appendDummyInput("COORDINATES")
              .appendField("X:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "X")
              .appendField("Y:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorY), "Y")
              .appendField("Z:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "Z");
          }

          this.appendDummyInput("STRENGTH").appendField("Strength:")
            .appendField(new Blockly.FieldTextInput("2", directionInputValidator), "STRENGTH")

        });
        this.appendDummyInput().appendField("Location:").appendField(dropdown, "LOCATION");

        this.appendDummyInput("STRENGTH").appendField("Strength:")
          .appendField(new Blockly.FieldTextInput("2", directionInputValidator), "STRENGTH")

        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Change the velocity direction of the player.");

        this.setColour(120);
      },
    }
  },
};
</script>
