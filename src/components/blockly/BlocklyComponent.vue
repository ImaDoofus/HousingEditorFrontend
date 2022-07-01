<template>
	<div>
		<div class="blocklyDiv" ref="blocklyDiv"></div>
		<xml ref="blocklyToolbox" style="display:none">
			<slot></slot>
		</xml>
	</div>
</template>

<script>
import '@/blockly/style.css'; // custom style
import '@/blockly/renderer.js'; // custom renderer
import '@/blockly/theme.js'; // custom theme
import '@/blockly/toolbox_style.css' // custom toolbox style
import '@/blockly/custom_category.js' // custom toolbox style

// plugins
// import {ContinuousToolbox, ContinuousFlyout, ContinuousMetrics} from '@blockly/continuous-toolbox';

import Blockly from 'blockly';
export default {
	name: 'BlocklyComponent',
	props: ['options'],
	mounted() {
		var options = this.$props.options || {};
		if (!options.toolbox) {
			options.toolbox = this.$refs["blocklyToolbox"];
		}
		options.grid = {
					spacing: 25,
					length: 25,
					colour: '#ccc',
					snap: true,
				},
		options.renderer = 'custom_renderer';
		options.theme = 'custom_theme';
		options.zoom = {
					controls: true,
					wheel: true,
					startScale: 1.0,
					maxScale: 2.0,
					minScale: 0.5,
					scaleSpeed: 1.01,
					pinch: true,
				};
		// options.plugins = {
		// 	'toolbox': ContinuousToolbox,
		// 	'flyoutsVerticalToolbox': ContinuousFlyout,
		// 	'metricsManager': ContinuousMetrics,
		// },
		this.workspace = Blockly.inject(this.$refs["blocklyDiv"], options);
	}
}
</script>

<style>
.blocklyDiv {
	height: 100%;
	width: 100%;
	text-align: left;
}
</style>