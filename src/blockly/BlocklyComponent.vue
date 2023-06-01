<template>
  <div>
    <WorkspaceChange ref="workspaceChange"></WorkspaceChange>
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
import Blockly from "blockly";
import "@/blockly/style.css"; // custom style
import "@/blockly/renderer.js"; // custom renderer
import "@/blockly/theme.js"; // custom theme
import "@/blockly/toolbox_style.css"; // custom toolbox style
import "@/blockly/custom_category.js"; // custom toolbox style

// plugins
import { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } from "@blockly/continuous-toolbox";

import WorkspaceChange from "@/blockly/WorkspaceChange.vue";

Blockly.HSV_SATURATION = 0.6;
Blockly.HSV_VALUE = 1;
Blockly.Tooltip.setCustomTooltip((div, element) => {
  const tipElement = document.createElement("p");
  tipElement.innerHTML = Blockly.Tooltip.getTooltipOfObject(element);
  tipElement.style.fontSize = "18px";
  tipElement.style.textAlign = "left";

  div.style.padding = "15px";
  div.appendChild(tipElement);
});

export default {
  name: "BlocklyComponent",
  components: {
    WorkspaceChange,
  },
  props: ["options"],
  mounted() {
    var options = this.$props.options || {};
    if (!options.toolbox) {
      options.toolbox = this.$refs["blocklyToolbox"];
    }
    (options.grid = {
      spacing: 30,
      length: 30,
      colour: this.getTheme() === "light_theme" ? "#ccc" : "#333",
      snap: false,
    }),
      (options.renderer = "custom_renderer");
    options.theme = this.getTheme();
    options.zoom = {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 2.0,
      minScale: 0.5,
      scaleSpeed: 1.01,
      pinch: true,
    };
    (options.plugins = {
      toolbox: ContinuousToolbox,
      flyoutsVerticalToolbox: ContinuousFlyout,
      metricsManager: ContinuousMetrics,
    }),
      (this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options));
    this.$refs.workspaceChange.setWorkspace(this.workspace); // add an event listener for block scope protection, etc.
  },
  methods: {
    getTheme() {
      return this.$vuetify.theme.dark ? "dark_theme" : "light_theme";
    },
  },
};
</script>

<style>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
