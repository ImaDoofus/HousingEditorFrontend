<template>
  <category name="Inventory" categorystyle="inventory_category">
    <ItemEditor v-if="!isItem" ref="itemEditor" @finishedEditing="itemFinishedEditing($event)" />
    <InventorySlotSelector v-if="!isItem" ref="inventorySlotSelector" @select="inventorySlotSelected($event)" />
    <block v-if="!isItem" type="give_item"></block>
    <block v-if="!isItem" type="remove_item"></block>
    <block type="reset_inventory"></block>
    <block type="use_inventory_slot"></block>
    <block v-if="!isItem" type="custom_item" class="custom_item_block"></block>
    <block v-if="isItem" type="use_remove_held_item"></block>
    <block type="apply_inventory_layout"></block>
    <block type="display_menu"></block>
    <block type="close_menu"></block>
    <block type="enchant_held_item"></block>
    <block type="drop_item"></block>
  </category>
</template>

<script>
import Blockly from "blockly/core";
import ItemEditor from "@/components/items/ItemEditor.vue";
import InventorySlotSelector from "@/components/items/InventorySlotSelector.vue";
import { saveExtraState, loadExtraState, updateShape_, close_, getOpenIcon, dataChangeListener } from "../utils/open_and_close.js";

export default {
  name: "InventoryBlocks",
  components: {
    ItemEditor,
    InventorySlotSelector,
  },
  props: {
    isItem: {
      type: Boolean,
    },
  },
  data() {
    return {
      itemFinishedEditing() {},
    };
  },
  methods: {
    getImagePath(type, meta, extra = false) {
      if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
      return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
    },
  },
  mounted() {
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

    const component = this;

    Blockly.Blocks["give_item"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Give Item  ", "block_header"));
        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");
        this.appendDummyInput().appendField("Allow Multiple").appendField(new Blockly.FieldCheckbox("FALSE"), "ALLOW_MULTIPLE");
          this.appendDummyInput().appendField("Inventory Slot").appendField(new Blockly.FieldNumber(0, -2, 39), "INVENTORY_SLOT");
        this.appendDummyInput().appendField("Replace Existing Item").appendField(new Blockly.FieldCheckbox("FALSE"), "REPLACE_EXISTING_ITEM");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Give the player an item.");
        this.setColour(40);
        this.setInputsInline(false);
      },
    };
    Blockly.Blocks["remove_item"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(380, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Remove Item  ", "block_header"));
        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Remove an item from the player.");
        this.setColour(230);
        this.setInputsInline(false);
      },
    };
    Blockly.Blocks["reset_inventory"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(1, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Reset Inventory  ", "block_header"));
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Reset the player's inventory.");
        this.setColour(0);
      },
    };
    Blockly.Blocks["custom_item"] = {
      init: function () {
        this.item_ = {};

        const configureField = new Blockly.FieldImage("/assets/settings_black_24dp.svg", 24, 24, "*", function () {
          component.$refs.itemEditor.open(this.sourceBlock_.item_);
          component.itemFinishedEditing = (item) => {
            const imageField = this.sourceBlock_.inputList[0].fieldRow[0];
            imageField.setValue(component.getImagePath(item.type, item.meta));
            this.sourceBlock_.item_ = item;
          };
        });

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(1, 0), 24, 24))
          .appendField(new Blockly.FieldLabel("Custom Item  ", "block_header"))
          .appendField(configureField);

        this.setOutput(true, "CustomItem");
        this.setTooltip("Create a simple custom item for your action.");
        this.setColour(120);
      },
      saveExtraState: function () {
        return {
          item: this.item_,
        };
      },
      loadExtraState: function (state) {
        this.updateShape_(state["item"]);
      },
      updateShape_: function (item) {
        this.item_ = item;
        const imageField = this.inputList[0].fieldRow[0];
        imageField.setValue(component.getImagePath(item.type || 1, item.meta || 0));
      },
      open_: function () {
        component.openItemEditor(this);
      },
    };
    Blockly.Blocks["use_remove_held_item"] = {
      init: function () {
        this.appendDummyInput().appendField(new Blockly.FieldLabel("Use/Remove Held Item  ", "block_header"));
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Use or remove the player's held item.");
        this.setColour(230);
      },
    };

    Blockly.Blocks["use_inventory_slot"] = {
      init: function () {
        this.slot_ = "NONE";

        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(64, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Use Inventory Slot ", "block_header"))
          .appendField(`: ${this.slot_}`)
          .appendField(
            new Blockly.FieldImage("assets/table-large-plus.svg", 24, 24, "+", function () {
              component.$refs.inventorySlotSelector.open(this.sourceBlock_.slot_, component.inventorySlotsInUse);
              component.inventorySlotSelected = (slot) => {
                this.sourceBlock_.slot_ = slot;
                this.sourceBlock_.inputList[0].fieldRow[2].setValue(`: ${slot}`);
              };
            })
          );

        this.setOutput(true, "UseInventorySlot");
        this.setTooltip("Use an item from your inventory when loading in the action.");
        this.setColour(180);
      },
      saveExtraState: function () {
        return {
          slot: this.slot_,
        };
      },
      loadExtraState: function (state) {
        this.updateShape_(state["slot"]);
      },
      updateShape_: function (slot) {
        this.slot_ = slot;
        this.inputList[0].fieldRow[2].setValue(`: ${slot}`);
      },
    };

    Blockly.Blocks["apply_inventory_layout"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(421, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Apply Inventory Layout    ", "block_header"));
        this.appendDummyInput().appendField("Layout Name").appendField(new Blockly.FieldTextInput("name"), "LAYOUT");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setColour(320);
        this.setTooltip("Applies an inventory layout to the player");
        this.setHelpUrl("");
      },
    };

    Blockly.Blocks["enchant_held_item"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(403, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Enchant Held Item  ", "block_header"));

        const dropdown = new Blockly.FieldDropdown([
          ["Protection", "protection"],
          ["Fire Protection", "fire_protection"],
          ["Feather Falling", "feather_falling"],
          ["Blast Protection", "blast_protection"],
          ["Projectile Protection", "projectile_protection"],
          ["Respiration", "respiration"],
          ["Aqua Affinity", "aqua_affinity"],
          ["Thorns", "thorns"],
          ["Depth Strider", "depth_strider"],
          ["Sharpness", "sharpness"],
          ["Smite", "smite"],
          ["Bane of Arthropods", "bane_of_arthropods"],
          ["Knockback", "knockback"],
          ["Fire Aspect", "fire_aspect"],
          ["Looting", "looting"],
          ["Efficiency", "efficiency"],
          ["Silk Touch", "silk_touch"],
          ["Unbreaking", "unbreaking"],
          ["Fortune", "fortune"],
          ["Power", "power"],
          ["Punch", "punch"],
          ["Flame", "flame"],
          ["Infinity", "infinity"],
        ]);

        this.appendDummyInput("ENCHANTMENT").appendField("Enchantment:").appendField(dropdown, "ENCHANTMENT");
        this.appendDummyInput("LEVEL").appendField("Level").appendField(new Blockly.FieldNumber(1, 1, 10), "LEVEL");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        this.setTooltip("Enchant the player's held item.");
        this.setColour(230);
        this.setInputsInline(false);
      },
    };
    Blockly.Blocks["display_menu"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Display Menu   ", "block_header"));

        this.appendDummyInput().appendField("Menu").appendField(new Blockly.FieldTextInput("name"), "MENU");
        
        this.setColour(220);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
    Blockly.Blocks["close_menu"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Close Menu   ", "block_header"));

        this.setColour(220);
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
      },
    };
    Blockly.Blocks["drop_item"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(158, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Drop Item   ", "block_header"));

        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");

        const dropdown = new Blockly.FieldDropdown([
          ["Custom Coordinates", "custom_coordinates"],
          ["Housing Spawn", "house_spawn"],
          ["Invokers Location", "invokers_location"],
          ["Current Location", "current_location"],
        ]);
        dropdown.setValidator((newValue) => {
          if (this.getInput("COORDINATES")) this.removeInput("COORDINATES");
          if (this.getInput("DROP_NATURALLY")) this.removeInput("DROP_NATURALLY");
          if (this.getInput("DISABLE_ITEM_MERGING")) this.removeInput("DISABLE_ITEM_MERGING");
          if (this.getInput("PRIORITIZE_PLAYER")) this.removeInput("PRIORITIZE_PLAYER");
          if (this.getInput("FALLBACK_TO_INVENTORY")) this.removeInput("FALLBACK_TO_INVENTORY");

          if (newValue === "custom_coordinates") {
            this.appendDummyInput("COORDINATES")
              .appendField("X:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "X")
              .appendField("Y:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorY), "Y")
              .appendField("Z:")
              .appendField(new Blockly.FieldTextInput("0", coordinateInputValidatorXZ), "Z");
            this.appendDummyInput()
          }

          this.appendDummyInput("DROP_NATURALLY").appendField("Drop Naturally").appendField(new Blockly.FieldCheckbox("TRUE"), "DROP_NATURALLY");
          this.appendDummyInput("DISABLE_ITEM_MERGING").appendField("Disable Item Merging").appendField(new Blockly.FieldCheckbox("FALSE"), "DISABLE_ITEM_MERGING");
          this.appendDummyInput("PRIORITIZE_PLAYER").appendField("Prioritize Player").appendField(new Blockly.FieldCheckbox("FALSE"), "PRIORITIZE_PLAYER");
          this.appendDummyInput("FALLBACK_TO_INVENTORY").appendField("Fallback to Inventory").appendField(new Blockly.FieldCheckbox("FALSE"), "FALLBACK_TO_INVENTORY");

        });
        this.appendDummyInput().appendField("Location:").appendField(dropdown, "LOCATION");

        this.appendDummyInput("DROP_NATURALLY").appendField("Drop Naturally").appendField(new Blockly.FieldCheckbox("TRUE"), "DROP_NATURALLY");
        this.appendDummyInput("DISABLE_ITEM_MERGING").appendField("Disable Item Merging").appendField(new Blockly.FieldCheckbox("FALSE"), "DISABLE_ITEM_MERGING");
        this.appendDummyInput("PRIORITIZE_PLAYER").appendField("Prioritize Player").appendField(new Blockly.FieldCheckbox("FALSE"), "PRIORITIZE_PLAYER");
        this.appendDummyInput("FALLBACK_TO_INVENTORY").appendField("Fallback to Inventory").appendField(new Blockly.FieldCheckbox("FALSE"), "FALLBACK_TO_INVENTORY");

        this.setColour("#898989");
        this.setPreviousStatement(true, "action");
        this.setNextStatement(true, "action");
        // this.setInputsInline(false);
      }
    };
  },
};
</script>
