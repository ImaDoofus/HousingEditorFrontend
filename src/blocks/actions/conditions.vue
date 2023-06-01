<template>
  <category name="Conditions" categorystyle="conditions_category">
    <block v-if="!isItem" type="condition_doing_parkour"></block>
    <block v-if="!isItem" type="condition_has_potion_effect"></block>
    <block v-if="!isItem" type="condition_has_item"></block>
    <block v-if="!isItem" type="condition_within_region"></block>
    <block v-if="!isItem" type="condition_required_permission"></block>
    <block v-if="!isItem" type="condition_player_stat_requirement"></block>
    <block v-if="!isItem" type="condition_global_stat_requirement"></block>
    <block v-if="!isItem" type="condition_required_group"></block>
    <block v-if="!isItem" type="condition_damage_cause"></block>
    <block v-if="!isItem" type="condition_portal_type"></block>
    <block v-if="!isItem" type="condition_block_type"></block>
    <block v-if="!isItem" type="condition_fishing_environment"></block>
    <block v-if="!isItem" type="condition_player_sneaking"></block>
  </category>
</template>

<script>
import Blockly from "blockly/core";
import { saveExtraState, loadExtraState, updateShape_, close_, getOpenIcon, dataChangeListener } from "../utils/open_and_close.js";

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

    Blockly.Blocks["condition_required_group"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { GROUP: "group name", INCLUDE_HIGHER_GROUPS: "TRUE" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(397, 3), 20, 20))
          .appendField(new Blockly.FieldLabel("Required Group  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(320);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        this.appendDummyInput("DATA")
          .appendField("Group:")
          .appendField(new Blockly.FieldTextInput(this.options_["GROUP"], dataChangeListener), "GROUP")
          .appendField("Include Higher Groups:")
          .appendField(new Blockly.FieldCheckbox(this.options_["INCLUDE_HIGHER_GROUPS"], dataChangeListener), "INCLUDE_HIGHER_GROUPS");
      },
      close_,
    };
    Blockly.Blocks["condition_global_stat_requirement"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { STAT: "stat", COMPARATOR: "equal_to", VALUE: "0" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath("global_stat", 0, true), 20, 20))
          .appendField(new Blockly.FieldLabel("Global Stat Requirement  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(340);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Equal To =", "equal_to"], // default
          ["Less Than <", "less_than"],
          ["Less Than or Equal To <=", "less_than_or_equal_to"],
          ["Greater Than or Equal To >=", "greater_than_or_equal_to"],
          ["Greater Than >", "greater_than"],
        ]);
        dropdown.setValue(this.options_["COMPARATOR"]);

        const value = new Blockly.FieldTextInput(this.options_["VALUE"]);

        this.appendDummyInput("DATA")
          .appendField("Stat:")
          .appendField(new Blockly.FieldTextInput(this.options_["STAT"], dataChangeListener), "STAT")
          .appendField("Comparison:")
          .appendField(dropdown, "COMPARATOR")
          .appendField("Value:")
          .appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_player_stat_requirement"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { STAT: "stat", COMPARATOR: "equal_to", VALUE: "0" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(288, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Stat Requirement  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(280);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Equal To =", "equal_to"], // default
          ["Less Than <", "less_than"],
          ["Less Than or Equal To <=", "less_than_or_equal_to"],
          ["Greater Than or Equal To >=", "greater_than_or_equal_to"],
          ["Greater Than >", "greater_than"],
        ]);
        dropdown.setValue(this.options_["COMPARATOR"]);

        const value = new Blockly.FieldTextInput(this.options_["VALUE"]);

        this.appendDummyInput("DATA")
          .appendField("Stat:")
          .appendField(new Blockly.FieldTextInput(this.options_["STAT"], dataChangeListener), "STAT")
          .appendField("Comparison:")
          .appendField(dropdown, "COMPARATOR")
          .appendField("Value:")
          .appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_required_permission"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { PERMISSION: "Fly" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(358, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Required Permission  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(240);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Fly", "Fly"],
          ["Wood Door", "Wood Door"],
          ["Iron Door", "Iron Door"],
          ["Wood Trap Door", "Wood Trap Door"],
          ["Iron Trap Door", "Iron Trap Door"],
          ["Fence Gate", "Fence Gate"],
          ["Button", "Button"],
          ["Slime", "Slime"],
          ["/tp", "/tp"],
          ["Tp Others", "Tp Others"],
          ["Jukebox", "Jukebox"],
          ["Kick", "Kick"],
          ["Ban", "Ban"],
          ["Mute", "Mute"],
          ["Pet Spawning", "Pet Spawning"],
          ["Build", "Build"],
          ["Fluid", "Fluid"],
          ["Pro Tools", "Pro Tools"],
          ["Use Chests", "Use Chests"],
          ["Item Editor", "Item Editor"],
          ["Switch Game Mode", "Switch Game Mode"],
          ["Edit Stats", "Edit Stats"],
          ["Change Player Group", "Change Player Group"],
          ["Change Gamerules", "Change Gamerules"],
        ]);
        dropdown.setValue(this.options_["PERMISSION"]);

        this.appendDummyInput("DATA").appendField("Permission:").appendField(dropdown, "PERMISSION");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_within_region"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { REGION_NAME: "Region Name" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(2, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Within Region  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(200);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        this.appendDummyInput("DATA")
          .appendField("Region Name:")
          .appendField(new Blockly.FieldTextInput(this.options_["REGION_NAME"], dataChangeListener), "REGION_NAME");
      },
      close_,
    };
    Blockly.Blocks["condition_has_item"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { CHECK_METADATA: "FALSE", WHERE_TO_CHECK: "ANYWHERE", REQUIRE_AMOUNT: "FALSE" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Has Item  ", "block_header"))
          .appendField(getOpenIcon());

        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");

        this.setColour(160);
        this.setOutput(true, "Condition");

        this.setTooltip(
          "<h3>Returns true if the player has the specified item.</h3>" +
            "<br>" +
            "<b>Item ID</b> You can get an item ID from this website" +
            "<br>" +
            "<b>Check Metadata</b> If true, the item must have the specified metadata" +
            "<br>" +
            "e.g check for the same enchantment and name" +
            "<br>" +
            "<b>Where to Check</b> The item will be checked in the specified slot" +
            "<br>" +
            "<b>Require Amount</b> If true, the item must have the specified amount"
        );
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        this.appendDummyInput("CHECK_METADATA")
          .appendField("Check Metadata:")
          .appendField(new Blockly.FieldCheckbox(this.options_["CHECK_METADATA"], dataChangeListener), "CHECK_METADATA");

        const dropdown = new Blockly.FieldDropdown([
          ["Anywhere", "Anywhere"], // default
          ["Hand", "Hand"],
          ["Armor", "Armor"],
          ["Hotbar", "Hotbar"],
          ["Inventory", "Inventory"],
        ]);
        dropdown.setValue(this.options_["WHERE_TO_CHECK"]);

        this.appendDummyInput("WHERE_TO_CHECK").appendField("Where to Check:").appendField(dropdown, "WHERE_TO_CHECK");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()

        this.appendDummyInput("REQUIRE_AMOUNT")
          .appendField("Equal To or Greater Amount")
          .appendField(new Blockly.FieldCheckbox(this.options_["REQUIRE_AMOUNT"], dataChangeListener), "REQUIRE_AMOUNT");
      },
      close_: function () {
        if (this.getInput("CHECK_METADATA")) this.removeInput("CHECK_METADATA");
        if (this.getInput("WHERE_TO_CHECK")) this.removeInput("WHERE_TO_CHECK");
        if (this.getInput("REQUIRE_AMOUNT")) this.removeInput("REQUIRE_AMOUNT");
      },
    };
    Blockly.Blocks["condition_has_potion_effect"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { POTION_EFFECT: "Speed" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(373, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Has Potion Effect  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(120);
        this.setOutput(true, "Condition");
        this.setTooltip("Returns true if the player has the specified potion effect.");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Speed", "speed"],
          ["Slowness", "slowness"],
          ["Haste", "haste"],
          ["Mining Fatigue", "mining_fatigue"],
          ["Strength", "strength"],
          ["Instant Health", "instant_health"],
          ["Instant Damage", "instant_damage"],
          ["Jump Boost", "jump_boost"],
          ["Nausea", "nausea"],
          ["Regeneration", "regeneration"],
          ["Resistance", "resistance"],
          ["Fire Resistance", "fire_resistance"],
          ["Water Breathing", "water_breathing"],
          ["Invisibility", "invisibility"],
          ["Blindness", "blindness"],
          ["Night Vision", "night_vision"],
          ["Hunger", "hunger"],
          ["Weakness", "weakness"],
          ["Poison", "poison"],
          ["Wither", "wither"],
          ["Health Boost", "health_boost"],
          ["Absorption", "absorption"],
        ]);
        dropdown.setValue(this.options_["POTION_EFFECT"]);

        this.appendDummyInput("DATA").appendField("Potion Effect:").appendField(dropdown, "POTION_EFFECT");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_doing_parkour"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(147, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Doing Parkour  ", "block_header"));

        this.setColour(80);
        this.setOutput(true, "Condition");
      },
    };
    Blockly.Blocks["condition_damage_cause"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { CAUSE: "Entity Attack" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(276, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Damage Cause  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(70);
        this.setOutput(true, "Condition");
        this.setTooltip("Returns true if the Damage Event was caused by the selected cause.");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Entity Attack", "Entity Attack"],
          ["Projectile", "Projectile"],
          ["Suffocation", "Suffocation"],
          ["Fall", "Fall"],
          ["Lava", "Lava"],
          ["Fire", "Fire"],
          ["Fire Tick", "Fire Tick"],
          ["Drowning", "Drowning"],
          ["Starvation", "Starvation"],
          ["Poison", "Poison"],
          ["Thorns", "Thorns"],
        ]);
        dropdown.setValue(this.options_["DAMAGE_CAUSE"]);

        this.appendDummyInput("DATA").appendField("Damage Cause:").appendField(dropdown, "DAMAGE_CAUSE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_portal_type"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { PORTAL_TYPE: "Nether Portal" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(120, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Portal Type  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(120);
        this.setOutput(true, "Condition");
        this.setTooltip("Returns true if the portal entered was the portal specified");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Nether Portal", "Nether Portal"],
          ["End Portal", "End Portal"],
        ]);
        dropdown.setValue(this.options_["PORTAL_TYPE"]);

        this.appendDummyInput("DATA").appendField("Portal Type:").appendField(dropdown, "PORTAL_TYPE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_block_type"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(2, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Block Type  ", "block_header"));

        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Block:");

        this.setColour(180);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the block mined was the block specified");
      },
    };

    Blockly.Blocks["condition_fishing_environment"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { ENVIRONMENT: "WATER" };

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(326, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Fishing Environment  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(10);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the fishing environment is the specified environment");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Water", "WATER"],
          ["Lava", "LAVA"],
        ]);
        dropdown.setValue(this.options_["ENVIRONMENT"]);

        this.appendDummyInput("DATA").appendField("Environment:").appendField(dropdown, "ENVIRONMENT");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };

    Blockly.Blocks["condition_player_sneaking"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(170, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Sneaking  ", "block_header"));

        this.setColour(60);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the player is sneaking");
      },
    };
  },
};
</script>
