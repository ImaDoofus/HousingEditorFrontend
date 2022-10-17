<template>
	<div id="app">
		<CustomSnackbar ref="snackbar" />
		<TextComponent ref="textComponent" />
		<PlaySound ref="playSound" />
		<BlocklyComponent id="workspace" :options="options" ref="workspace">
			<TextComponent />
			<sep></sep>
			<LogicBlocks :isItem='false' />
			<ConditionBlocks :isItem='false' />
			<MessagesBlocks />
			<PotionEffectsBlocks />
			<HealthBlocks />
			<TeleportationBlocks />
			<InventoryBlocks :isItem='false'/>
			<ParkourBlocks />
			<MiscBlocks :isItem='false' />
		</BlocklyComponent>
	</div>
</template>

<script>
import BlocklyComponent from '@/blockly/BlocklyComponent.vue';
import '@/blocks/actions/when_action_triggered.js';
import MessagesBlocks from '@/blocks/actions/messages.vue';
import TeleportationBlocks from '@/blocks/actions/teleportation.vue';
import ConditionBlocks from '@/blocks/actions/conditions.vue';
import PotionEffectsBlocks from '@/blocks/actions/potion_effects.vue';
import MiscBlocks from '@/blocks/actions/misc.vue';
import InventoryBlocks from '@/blocks/actions/inventory.vue';
import LogicBlocks from '@/blocks/actions/logic.vue';
import HealthBlocks from '@/blocks/actions/health.vue';
import ParkourBlocks from '@/blocks/actions/parkour.vue';
import PlaySound from '@/blocks/actions/play_sound.vue';
import TextComponent from '@/blocks/text_component.vue'

import Blockly from 'blockly';

import LoadFromGame from '@/utils/LoadFromGame.js';

import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';

export default {
	name: 'EditActionWorkspace',
	components: {
		BlocklyComponent,
		InventoryBlocks,
		LogicBlocks,
		HealthBlocks,
		ParkourBlocks,
		MiscBlocks,
		PotionEffectsBlocks,
		MessagesBlocks,
		TeleportationBlocks,
		ConditionBlocks,
		TextComponent,
		PlaySound,
		CustomSnackbar,
	},
	data(){
		return {
			options: {},
		}
	},
	methods: {
		load(json) {
			Blockly.mainWorkspace.clear();
			Blockly.serialization.workspaces.load(json, this.workspace);
		},
		save() {
			return Blockly.serialization.workspaces.save(this.workspace);
		},
		async loadFromGame(actionData) {
			this.$refs.snackbar.show('Loading Actions...', 'green');
			await LoadFromGame.loadToWorkspace(actionData, this.workspace);
			this.$refs.snackbar.reset();
		},
		openSelectItemDialog() {
			this.$refs.selectItem.dialog = true;
		},
	},
	mounted() {
		const workspace = this.$refs["workspace"].workspace;
		this.workspace = workspace;

		var parentBlock = workspace.newBlock('when_action_triggered');
		parentBlock.initSvg();
		parentBlock.render();
		parentBlock.moveBy(workspace.getWidth()/4,100);

		workspace.clearUndo(); // clear undo stack so user can't undo the block initialization

		this.$refs.textComponent.setWorkspace(workspace)

		this.workspace.addChangeListener(event => {
			this.$emit('change');
		})

		const testData = [
			[
				'conditional',
				{
					conditions: [
						['player_stat_requirement', { stat: 'tsetaaaaa!', comparator: 'greater_than_or_equal_to', value: '15' }],
						['required_permission', {
							permission: ''
						}],
						['within_region', {
							region: 'myRegion'
						}],
						['has_item', {

						}],
						['doing_parkour', {

						}],
						['has_potion_effect', {
							effect: 'poison'
						}],
						['required_group', {
							group: 'among su',
							includeHigherGroups: true,
						}]
					]
				}
			],

		]

		// this.loadFromGame(testData);
	}
}
</script>

<style defer>
#workspace {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
</style>
