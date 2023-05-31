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
    const component = this;

    Blockly.Blocks["give_item"] = {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldImage(component.getImagePath(54, 0), 20, 20))
          .appendField(new Blockly.FieldLabel("Give Item  ", "block_header"));
        this.appendValueInput("ITEM").setCheck(["CustomItem", "UseInventorySlot"]).appendField("Item:");
        this.appendDummyInput().appendField("Allow Multiple").appendField(new Blockly.FieldCheckbox("FALSE"), "ALLOW_MULTIPLE");
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
  },
};
</script>
