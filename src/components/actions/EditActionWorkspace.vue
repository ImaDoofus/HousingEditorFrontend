<template>
	<div id="app">
		<TextComponent ref="textComponent" />
		<PlaySound ref="playSound" />
		<BlocklyComponent id="workspace" :options="options" ref="workspace">
			<category name="Text Components" categorystyle="text_components_category">
				<block type="text_component"></block>
			</category>
			<sep></sep>
			<category name="Stats" categorystyle="stats_category">
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
			<InventoryBlocks :isItem='false'/>
			<category name="Parkour" categorystyle="parkour_category">
				<block type="parkour_checkpoint"></block>
				<block type="fail_parkour"></block>
			</category>
			<category name="Miscellaneous" categorystyle="miscellaneous_category">
				<block type="random_action"></block>
				<block type="give_experience_levels"></block>
				<block type="change_player_group"></block>
				<block type="play_sound"></block>
				<block type="set_gamemode"></block>
				<block type="set_compass_target"></block>
			</category>
		</BlocklyComponent>
	</div>
</template>

<script>
import BlocklyComponent from '@/blockly/BlocklyComponent.vue';
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

export default {
	name: 'EditActionWorkspace',
	components: {
		BlocklyComponent,
		InventoryBlocks,
		TextComponent,
		PlaySound,
	},
	data(){
		return {
			// code: '',
			options: {},
		}
	},
	methods: {
		// showCode() {
		// 	this.code = Blockly.workspaceToCode(this.$refs["workspace"].workspace);
		// },
		load(json) {
			console.log(json)
			Blockly.mainWorkspace.clear();
			Blockly.serialization.workspaces.load(json, this.workspace)
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

		this.$refs.textComponent.setWorkspace(workspace)
		this.$refs.playSound.setWorkspace(workspace)

		this.workspace.addChangeListener(event => {
			this.$emit('change');
		})

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
