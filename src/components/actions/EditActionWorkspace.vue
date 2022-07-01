<template>
	<div id="app">
		<CustomSnackbar ref="snackbar" />
		<TextComponent ref="textComponent" />
		<PlaySound />
		<BlocklyComponent id="workspace" :options="options" ref="workspace">
			<category name="Conditionals" categorystyle="conditionals_category">
				<block type="conditional"></block>
				<block type="change_stat"></block>
				<block type="condition_doing_parkour"></block>
				<block type="condition_has_potion_effect"></block>
				<block type="condition_has_item"></block>
				<block type="condition_within_region"></block>
				<block type="condition_required_permission"></block>
				<block type="condition_stat_requirement"></block>
				<block type="condition_required_group"></block>
			</category>
			<category name="Messages" categorystyle="messages_category">
				<block type="send_a_chat_message"></block>
				<block type="display_action_bar"></block>
				<block type="display_title"></block>
			</category>
			<category name="Parkour" categorystyle="parkour_category">
				<block type="parkour_checkpoint"></block>
				<block type="fail_parkour"></block>
			</category>
			<category name="Potion Effects" categorystyle="potion_effects_category">
				<block type="apply_potion_effect"></block>
				<block type="clear_all_potion_effects"></block>
			</category>
			<category name="Health & Hunger" categorystyle="health_category">
				<block type="full_heal"></block>
				<block type="kill_player"></block>
				<block type="set_health"></block>
				<block type="set_max_health"></block>
				<block type="set_hunger_level"></block>
			</category>
			<category name="Teleportation" categorystyle="teleportation_category">
				<block type="teleport_player"></block>
				<block type="go_to_house_spawn"></block>
				<block type="send_to_lobby"></block>
			</category>
			<InventoryBlocks />
			<category name="Miscellaneous" categorystyle="miscellaneous_category">
				<block type="set_gamemode"></block>
				<block type="give_experience_levels"></block>
				<block type="change_player_group"></block>
				<block type="play_sound"></block>
			</category>
			<sep></sep>
			<category name="Text Components" categorystyle="text_components_category">
				<block type="text_component"></block>
			</category>
		</BlocklyComponent>
		<v-overlay :opacity="0.2" :value="loading">
			<v-progress-circular indeterminate size="100">
				Loading...
			</v-progress-circular>
		</v-overlay>
	</div>
</template>

<script>
import BlocklyComponent from '@/components/blockly/BlocklyComponent.vue';
import '@/blocks/actions/conditionals.js';
import '@/blocks/actions/messages.js';
import '@/blocks/actions/parkour.js';
import '@/blocks/actions/potion_effects.js';
import '@/blocks/actions/health.js';
import '@/blocks/actions/when_action_triggered.js';
import '@/blocks/actions/teleport.js';
import InventoryBlocks from '@/blocks/actions/inventory.vue';
import '@/blocks/actions/misc.js';
import PlaySound from '@/blocks/actions/play_sound.vue';
import TextComponent from '@/blocks/text_component.vue'

import Blockly from 'blockly';
import EventUtil from '@/assets/utils/EventUtil';

import CustomSnackbar from '@/components/misc/CustomSnackbar.vue';

Blockly.HSV_SATURATION = 0.6;
Blockly.HSV_VALUE = 1;
console.log(Blockly)
Blockly.Tooltip.setCustomTooltip((div, element) => {
	const tipElement = document.createElement('p');
	tipElement.innerHTML = Blockly.Tooltip.getTooltipOfObject(element);
	tipElement.style.fontSize = '18px';
	tipElement.style.textAlign = 'left';

	div.style.padding = '15px';
	div.appendChild(tipElement);
})

export default {
	name: 'EditActionWorkspace',
	components: {
		BlocklyComponent,
		InventoryBlocks,
		CustomSnackbar,
		TextComponent,
		PlaySound,
	},
	data(){
		return {
			// code: '',
			options: {},
			loading: false,
		}
	},
	methods: {
		// showCode() {
		// 	this.code = Blockly.workspaceToCode(this.$refs["workspace"].workspace);
		// },
		load(json) {
			Blockly.mainWorkspace.clear();
			Blockly.serialization.workspaces.load(json,this.workspace)
			this.loading = false;
		},
		save() {
			return Blockly.serialization.workspaces.save(this.workspace);
		},
		openSelectItemDialog() {
			this.$refs.selectItem.dialog = true;
		},
	},
	mounted() {
		const workspace = this.$refs["workspace"].workspace;
		this.workspace = workspace;
		// // set unconnected blocks to be disabled
		// workspace.addChangeListener(Blockly.Events.disableOrphans);
		var parentBlock = workspace.newBlock('when_action_triggered');
		parentBlock.initSvg();
		parentBlock.render();
		parentBlock.moveBy(workspace.getWidth()/4,100);

		workspace.clearUndo(); // clear undo stack so user can't undo the block initialization

		this.workspace.addChangeListener(event => {
			// console.log(event)
			const eventIsValid = EventUtil.isBlockMoveValid(event);
			if (!eventIsValid.isValid) {
				this.workspace.undo();
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.color = 'error';
				this.$refs.snackbar.text = eventIsValid.message;
			}
			if (eventIsValid.message === 'easter_egg') {
				this.$refs.snackbar.shown = true;
				this.$refs.snackbar.color = 'warning';
				// this.$refs.snackbar.text = 'You cant nest conditionals, yet...';
				this.$refs.snackbar.text = 'You cant nest conditionals!';
				// this.$refs.snackbar.buttonText = 'Vote for a new feature!';
				// this.$refs.snackbar.buttonAction = () => {
				// 	window.open('https://hypixel.net/threads/conditionals-could-have-been-implemented-differently-from-a-programmers-standpoint.4951381/', '_blank');
				// 	this.$refs.snackbar.shown = false;
				// }
				// window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
			}
		})

		this.$refs.textComponent.setWorkspace(workspace)
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
