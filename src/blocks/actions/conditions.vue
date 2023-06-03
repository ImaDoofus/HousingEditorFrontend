<template>
  <category name="Conditions" categorystyle="conditions_category">
    <block v-if="!isItem" type="condition_player_stat_requirement"></block>
    <block v-if="!isItem" type="condition_global_stat_requirement"></block>

    <block v-if="!isItem" type="condition_block_type"></block>
    <block v-if="!isItem" type="condition_damage_amount"></block>
    <block v-if="!isItem" type="condition_damage_cause"></block>
    <block v-if="!isItem" type="condition_doing_parkour"></block>
    <block v-if="!isItem" type="condition_fishing_environment"></block>
    <block v-if="!isItem" type="condition_has_item"></block>
    <block v-if="!isItem" type="condition_has_potion_effect"></block>
    <block v-if="!isItem" type="condition_placeholder_number_requirement"></block>
    <block v-if="!isItem" type="condition_player_health"></block>
    <block v-if="!isItem" type="condition_player_hunger"></block>
    <block v-if="!isItem" type="condition_player_max_health"></block>
    <block v-if="!isItem" type="condition_player_sneaking"></block>
    <block v-if="!isItem" type="condition_portal_type"></block>
    <block v-if="!isItem" type="condition_pvp_enabled"></block>
    <block v-if="!isItem" type="condition_required_gamemode"></block>
    <block v-if="!isItem" type="condition_required_group"></block>
    <block v-if="!isItem" type="condition_required_permission"></block>
    <block v-if="!isItem" type="condition_within_region"></block>
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

    let color = 0;
    function getColor() {
      return color++ % 2 == 0 ? "#FFD180" : "#FFAB40";
    }
    let colorLookup = {
      // medium gray
      condition_player_stat_requirement: "#e5c0ec",
      // darkish earthy blue
      condition_global_stat_requirement: "#90CAF9",
      // minecraft dirt block color
      condition_block_type: "#85c458",
      // minecraft gold sword color
      condition_damage_amount: "#f2ed78",
      // minecraft diamond sword color
      condition_damage_cause: "#2CC7AA",
      // minecraft gold color
      condition_doing_parkour: "#f3f148",
      // minecraft water color
      condition_fishing_environment: "#577dea",
      // minecraft chest color
      condition_has_item: "#d59339",
      // minecraft potion color
      condition_has_potion_effect: "#3955a1",
      // minecraft sign color
      condition_placeholder_number_requirement: "#c6a560",
      condition_player_health: "#f23441",
      condition_player_hunger: "#906C22",
      condition_player_max_health: "#EAEE57",
      condition_player_sneaking: "#C6A50D",
      condition_portal_type: "#217b51",
      condition_pvp_enabled: "#e5e5e5",
      condition_required_gamemode: "#D1C1AB",
      condition_required_group: "#4fd2d2",
      condition_required_permission: "#D6D696",
      condition_within_region: "#85c458",
    };

    Blockly.Blocks["condition_player_stat_requirement"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { STAT: "stat", COMPARATOR: "equal_to", VALUE: "0" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(288, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Stat Requirement  ", "block_header"))
          .appendField(getOpenIcon());
        this.setColour(colorLookup[this.type]);
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
          .appendField("is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
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

        this.setColour(colorLookup[this.type]);
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
          .appendField("is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };

    Blockly.Blocks["condition_block_type"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { MATCH_TYPE_ONLY: false };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(2, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Block Type  ", "block_header"))
          .appendField(getOpenIcon());

        this.appendValueInput("BLOCK").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Block:");

        this.setInputsInline(false);
        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the block mined was the block specified");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        this.appendDummyInput("DATA")
          .appendField("Match Type Only:")
          .appendField(new Blockly.FieldCheckbox(this.options_["MATCH_TYPE_ONLY"], dataChangeListener), "MATCH_TYPE_ONLY");
      },
      close_,
    };
    Blockly.Blocks["condition_damage_amount"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { COMPARATOR: "equal_to", VALUE: "1" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(283, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Damage Amount  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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

        this.appendDummyInput("DATA").appendField("Damage taken was").appendField(dropdown, "COMPARATOR").appendField("value").appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_damage_cause"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { CAUSE: "Entity Attack" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(276, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Damage Cause  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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
    Blockly.Blocks["condition_doing_parkour"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(147, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Doing Parkour  ", "block_header"));

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");
      },
    };
    Blockly.Blocks["condition_fishing_environment"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { ENVIRONMENT: "water" };

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(326, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Fishing Environment  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the fishing environment is the specified environment");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Water", "water"],
          ["Lava", "lava"],
        ]);
        dropdown.setValue(this.options_["ENVIRONMENT"]);

        this.appendDummyInput("DATA").appendField("Environment:").appendField(dropdown, "ENVIRONMENT");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_has_item"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { CHECK_METADATA: "TRUE", WHERE_TO_CHECK: "ANYWHERE", REQUIRE_AMOUNT: "FALSE" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Has Item  ", "block_header"))
          .appendField(getOpenIcon());

        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");

        this.setColour(colorLookup[this.type]);
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
          ["Anywhere", "anywhere"], // default
          ["Hand", "hand"],
          ["Armor", "armor"],
          ["Hotbar", "hotbar"],
          ["Inventory", "inventory"],
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
        this.options_ = { POTION_EFFECT: "speed" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(373, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Has Potion Effect  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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
    Blockly.Blocks["condition_placeholder_number_requirement"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { PLACEHOLDER: "%house.cookies%", COMPARATOR: "equal_to", VALUE: "0" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(63, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Placeholder Number Requirement  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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
          .appendField("Placeholder:")
          .appendField(new Blockly.FieldTextInput(this.options_["PLACEHOLDER"], dataChangeListener), "PLACEHOLDER")
          .appendField("is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(value, "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
        value.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_player_health"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { VALUE: "10", COMPARATOR: "equal_to" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(260, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Health  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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

        this.appendDummyInput("DATA")
          .appendField("Health is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(new Blockly.FieldTextInput(this.options_["VALUE"], dataChangeListener), "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_player_hunger"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { VALUE: "10", COMPARATOR: "equal_to" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(297, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Hunger  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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

        this.appendDummyInput("DATA")
          .appendField("Hunger is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(new Blockly.FieldTextInput(this.options_["VALUE"], dataChangeListener), "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_player_max_health"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { VALUE: "20", COMPARATOR: "equal_to" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(322, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Maximum Player Health  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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

        this.appendDummyInput("DATA")
          .appendField("Maximum Health is")
          .appendField(dropdown, "COMPARATOR")
          .appendField("value")
          .appendField(new Blockly.FieldTextInput(this.options_["VALUE"], dataChangeListener), "VALUE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_player_sneaking"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(170, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Player Sneaking  ", "block_header"));

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if the player is sneaking");
      },
    };
    Blockly.Blocks["condition_portal_type"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { PORTAL_TYPE: "nether_portal" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(120, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Portal Type  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");
        this.setTooltip("Returns true if the portal entered was the portal specified");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Nether Portal", "nether_portal"],
          ["End Portal", "end_portal"],
        ]);
        dropdown.setValue(this.options_["PORTAL_TYPE"]);

        this.appendDummyInput("DATA").appendField("Portal Type:").appendField(dropdown, "PORTAL_TYPE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_pvp_enabled"] = {
      init: function () {
        this.appendDummyInput()
          // iron sword
          .appendField(new Blockly.FieldImage(component.getImagePath(267, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("PvP Enabled  ", "block_header"));

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");

        this.setTooltip("Returns true if PvP is enabled");
      },
    };
    Blockly.Blocks["condition_required_gamemode"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { GAMEMODE: "survival" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(151, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Required Gamemode  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
        this.setOutput(true, "Condition");
      },
      saveExtraState,
      loadExtraState,
      updateShape_,
      open_: function () {
        const dropdown = new Blockly.FieldDropdown([
          ["Survival", "survival"],
          ["Creative", "creative"],
          ["Adventure", "adventure"],
        ]);
        dropdown.setValue(this.options_["GAMEMODE"]);

        this.appendDummyInput("DATA").appendField("Gamemode:").appendField(dropdown, "GAMEMODE");

        dropdown.setValidator(dataChangeListener); // dataChangeListener requires the getSourceBlock()
      },
      close_,
    };
    Blockly.Blocks["condition_required_group"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { GROUP: "group name", INCLUDE_HIGHER_GROUPS: "FALSE" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(397, 3), 25, 25))
          .appendField(new Blockly.FieldLabel("Required Group  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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
    Blockly.Blocks["condition_required_permission"] = {
      init: function () {
        this.isOpened_ = true;
        this.options_ = { PERMISSION: "Fly" };
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(358, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Required Permission  ", "block_header"))
          .appendField(getOpenIcon());

        this.setColour(colorLookup[this.type]);
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
          ["Offline Build", "Offline Build"],
          ["Fluid", "Fluid"],
          ["Pro Tools", "Pro Tools"],
          ["Use Chests", "Use Chests"],
          ["Use Ender Chests", "Use Ender Chests"],
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

        this.setColour(colorLookup[this.type]);
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
  },
};
</script>
