<template>
  <v-dialog v-model="dialog" width="unset" transition="dialog-bottom-transition" overlay-opacity="0.25" :overlay-color="overlayColor">
    <CustomSnackbar ref="snackbar" />
    <v-form v-model="itemIsValid" ref="form" lazy-validation>
      <v-card>
        <div class="d-flex">
          <v-card class="pa-1" tile flat>
            <v-container class="d-flex pb-0">
              <v-card class="pa-5 pb-0" flat tile>
                <v-card-title class="justify-center pa-0 text-h3">Configure Item</v-card-title>
                <v-container class="d-flex justify-center">
                  <ItemPreview v-if="preview" :name="name" :lore="lore" :item="item" :enchantments="enchantments" :flags="flags" />
                </v-container>
                <v-autocomplete :items="items" item-text="name" label="Item" return-object v-model="selection" @change="itemWasSelected" dense>
                  <template v-slot:selection="{ item }">
                    {{ item.name }}<img :src="require(`@/assets/minecraft-items/items/${item.type}-${item.meta}.png`)" />
                  </template>
                  <template v-slot:item="{ item }">
                    {{ item.name }}
                    <v-spacer></v-spacer>
                    <img :src="require(`@/assets/minecraft-items/items/${item.type}-${item.meta}.png`)" />
                  </template>
                </v-autocomplete>
                <v-text-field label="Count" type="number" @input="countInput" dense :rules="countRules" value="1" v-model="count"></v-text-field>
              </v-card>
              <v-card class="pa-5 pb-0" flat tile min-width="400px">
                <v-text-field label="Item Name" v-model="name" outlined></v-text-field>
                <v-textarea label="Item Lore" @input="loreChanged" v-model="lore" outlined></v-textarea>
              </v-card>
            </v-container>
          </v-card>
          <v-divider vertical class="mx-1"></v-divider>
          <v-card class="pa-1 darken-4" tile flat>
            <v-tabs v-model="tab">
              <v-tab key="enchantments">Enchantments<v-icon>mdi-magic-staff</v-icon></v-tab>
              <v-tab key="flags">Flags<v-icon>mdi-flag</v-icon></v-tab>
              <v-tab key="other">Other<v-icon>mdi-cog-outline</v-icon></v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item key="enchantments">
                <p class="text-center text-caption mt-1">(Housing supports enchantments up to level 10)</p>
                <v-virtual-scroll item-height="50" height="200" :items="enchantments" bench="1">
                  <template v-slot="{ item }">
                    <v-list-item class="py-2" :key="item.name">
                      <v-text-field
                        :label="item.name"
                        v-model="item.level"
                        prepend-icon="mdi-minus"
                        append-icon="mdi-plus"
                        @click:prepend="item.level--"
                        @click:append="item.level++"
                        type="number"
                        dense
                        hide-spin-buttons
                        :rules="enchantmentRules"
                      ></v-text-field>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-tab-item>
              <v-tab-item key="flags">
                <v-container>
                  <v-switch hide-details inset dense v-for="flag in flags" :key="flag.name" v-model="flag.shown" :label="flag.name"></v-switch>
                </v-container>
              </v-tab-item>
              <v-tab-item key="other">
                <v-list>
                  <v-list-item>
                    <v-checkbox @click="setUnbreakable()" label="Unbreakable"></v-checkbox>
                  </v-list-item>
                  <v-list-item> </v-list-item>
                </v-list>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" @click="finishedEditing">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import itemsJSON from "@/assets/minecraft-items/items.json";
import ItemPreview from "./ItemPreview.vue";
import CustomSnackbar from "../misc/CustomSnackbar.vue";

export default {
  name: "ItemEditor",
  components: {
    ItemPreview,
    CustomSnackbar,
  },
  data() {
    return {
      tab: null,
      dialog: false,
      items: itemsJSON,
      selection: null,
      preview: true,
      name: "",
      lore: [],
      item: {},
      enchantments: [
        { name: "Protection", level: 0 },
        { name: "Fire Protection", level: 0 },
        { name: "Feather Falling", level: 0 },
        { name: "Blast Protection", level: 0 },
        { name: "Projectile Protection", level: 0 },
        { name: "Respiration", level: 0 },
        { name: "Aqua Affinity", level: 0 },
        { name: "Thorns", level: 0 },
        { name: "Depth Strider", level: 0 },
        { name: "Sharpness", level: 0 },
        { name: "Smite", level: 0 },
        { name: "Bane of Arthropods", level: 0 },
        { name: "Knockback", level: 0 },
        { name: "Fire Aspect", level: 0 },
        { name: "Looting", level: 0 },
        { name: "Efficiency", level: 0 },
        { name: "Silk Touch", level: 0 },
        { name: "Unbreaking", level: 0 },
        { name: "Fortune", level: 0 },
        { name: "Power", level: 0 },
        { name: "Punch", level: 0 },
        { name: "Flame", level: 0 },
        { name: "Infinity", level: 0 },
        { name: "Luck of the Sea", level: 0 },
        { name: "Lure", level: 0 },
      ],
      enchantmentRules: [
        (v) => v >= 0 || "Enchantment level must be greater than or equal to 0",
        (v) => v <= 10 || "Enchantment level must be less than or equal to 10",
      ],

      count: 0,
      countRules: [(v) => v >= 1 || "Count must be greater than or equal to 1", (v) => v <= 64 || "Count must be less than or equal to 64"],

      flags: [
        { name: "Show Enchantments", shown: true },
        { name: "Show Modifiers", shown: true },
        { name: "Show Unbreakable", shown: true },
        { name: "Show Additional", shown: true },
        { name: "Show Dyed", shown: true },
      ],

      overlayColor: this.$vuetify.theme.dark ? "black" : "white",

      itemIsValid: false,
    };
  },
  methods: {
    finishedEditing() {
      this.$refs.form.validate();
      if (this.itemIsValid) {
        let item = this.item;
        item.name = this.name;
        item.lore = this.lore;
        item.enchantments = [];
        item.flags = [];
        for (let i = 0; i < this.enchantments.length; i++) {
          let enchant = this.enchantments[i];
          if (enchant.level > 0) item.enchantments.push({ level: enchant.level, name: enchant.name });
        }
        for (let i = 0; i < this.flags.length; i++) {
          let flag = this.flags[i];
          item.flags.push({ shown: flag.shown, name: flag.name });
        }
        this.$emit("finishedEditing", item);
        this.dialog = false;
        return;
      }
      this.$refs.snackbar.show("This item is not valid, please check over it again!", "error");
    },
    itemWasSelected() {
      if (!this.selection) return;
      let count = this.item.count;
      let unbreakable = this.item.unbreakable;
      let item = this.selection;
      item.count = count;
      item.unbreakable = unbreakable;
      this.item = item;
    },
    loreChanged(newValue) {
      this.lore = newValue.split("\n");
    },
    countInput(newValue) {
      this.item.count = newValue;
    },
    setUnbreakable() {
      this.item.unbreakable = !this.item.unbreakable;
    },
    open(item) {
      this.item = this.getMainItemData(item);
      this.selection = {
        type: item.type,
        meta: item.meta,
      };
      // reset everything
      this.name = "";
      this.lore = [];
      this.enchantments.forEach((enchant) => (enchant.level = 0));
      this.flags.forEach((flag) => (flag.shown = true));

      item.enchantments?.forEach((enchantment) => {
        let index = this.enchantments.findIndex((e) => e.name === enchantment.name);
        if (index !== -1) this.enchantments[index].level = enchantment.level;
      });
      item.flags?.forEach((flag) => {
        let index = this.flags.findIndex((f) => f.name === flag.name);
        if (index !== -1) this.flags[index].shown = flag.shown;
      });
      this.lore = item.lore || [];
      this.name = item.name || "";
      this.count = item.count || 1;
      this.dialog = true;
    },
    getMainItemData(item) {
      let newItem = {
        type: item.type || 1,
        meta: item.meta || 0,
        name: item.name || "Stone",
        text_type: item.text_type || "stone",
        unbreakable: item.unbreakable || false,
        count: parseInt(item.count) || 1,
      };
      return newItem;
    },
  },
};
</script>
