<template>
	<div id="app">
		<TextComponent ref="textComponent" />
		<PlaySound ref="playSound" />
		<v-card class='item-preview ma-5 pa-1'>
			<v-card-title class="pa-1">
				<v-spacer></v-spacer>
				<span>Preview</span>
				<v-spacer></v-spacer>
				<v-btn v-if="!preview" icon @click="preview = true">
					<v-icon>mdi-arrow-expand-all</v-icon>
				</v-btn>
				<v-btn v-if="preview" icon @click="preview = false">
					<v-icon>mdi-arrow-collapse-all</v-icon>
				</v-btn>
			</v-card-title>
			<ItemPreview v-if="preview" :name='previewName' :lore='previewLore' :item='previewItem'/>
		</v-card>
		<ItemBlock @itemSelected='itemWasSelected'/>
		<BlocklyComponent id="workspace" :options="options" ref="workspace">
			<category name="Customize Item" categorystyle="customize_item_category" >
				<block type="set_name"></block>
				<block type="add_lore"></block>
			</category>
			<sep></sep>
			<category name="Text Components" categorystyle="text_components_category">
				<block type="text_component"></block>
			</category>
			<sep></sep>
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
			<InventoryBlocks :isItem='true'/>
			<category name="Miscellaneous" categorystyle="miscellaneous_category">
				<block type="give_experience_levels"></block>
				<block type="play_sound"></block>
				<block type="set_gamemode"></block>
				<block type="set_compass_target"></block>
			</category>
		</BlocklyComponent>
	</div>
</template>

<script>
import BlocklyComponent from '@/blockly/BlocklyComponent.vue'
import Blockly from 'blockly';
import ItemBlock from '@/blocks/items/item.vue';
import '@/blocks/items/right_click_action.js'
import '@/blocks/items/name.js'
import '@/blocks/items/lore.js'
import ItemPreview from '@/components/items/ItemPreview.vue'

// right click action blocks
import '@/blocks/actions/messages.js';
import '@/blocks/actions/parkour.js';
import '@/blocks/actions/potion_effects.js';
import '@/blocks/actions/health.js';
import '@/blocks/actions/teleport.js';
import InventoryBlocks from '@/blocks/actions/inventory.vue';
import '@/blocks/actions/misc.js';
import PlaySound from '@/blocks/actions/play_sound.vue';

// text components
import TextComponent from '@/blocks/text_component.vue';

export default {
	name: 'EditItemWorkspace',
	components: {
		BlocklyComponent,
		ItemBlock,
		ItemPreview,
		InventoryBlocks,
		TextComponent,
		PlaySound,
	},
	data() {
		return {
			options: {
				maxInstances: {
					'set_name': 1,
				},
			},
			preview: true,
			previewItem: { type: 1, meta: 0, name: 'Stone', text_type: 'stone' },
			previewName: null,
			previewLore: [],
			workspace: null,
		}
	},
	methods: {
		itemWasSelected(item) {
			this.previewItem = item;
		},
		load(json) {
			Blockly.mainWorkspace.clear();
			Blockly.serialization.workspaces.load(json, this.workspace)
			this.updatePreview();
		},
		save() {
			return Blockly.serialization.workspaces.save(this.workspace);
		},
		updatePreview() {
			const data = this.save();
			const itemBlock = data.blocks.blocks[0];
			let lore = [];
			const traverse = (block) => {
				const parsed = this.blockParser(block);
				if (!parsed) return;
				if (parsed[0] === 'lore') lore.push(parsed[1])
				if (parsed[0] === 'name') this.previewName = parsed[1];
				if (block.next?.block) traverse(block.next.block);
			}
			traverse(itemBlock?.next?.block);
			this.previewLore = lore;
		},

		blockParser(block) {
			switch(block?.type) {
				case 'add_lore':
					return ['lore', block?.inputs?.LORE?.block?.fields?.TEXT];
				case 'set_name':
					return ['name', block?.inputs?.NAME?.block?.fields?.TEXT];
			}
		},

	},
	mounted() {
		this.workspace = this.$refs["workspace"].workspace;
		const blocksX = Math.min(this.workspace.getWidth(), 100);
		var itemBlock = this.workspace.newBlock('item');
		itemBlock.initSvg();
		itemBlock.render();
		itemBlock.moveBy(blocksX,100);

		var rightClickBlock = this.workspace.newBlock('right_click_action');
		rightClickBlock.initSvg();
		rightClickBlock.render();
		rightClickBlock.moveBy(blocksX + 250,100);

		this.workspace.addChangeListener(event => {
			if (event.type === Blockly.Events.BLOCK_MOVE || event.type === Blockly.Events.BLOCK_CHANGE) {
				this.updatePreview();
				this.$emit('change');
			}
		})

		this.$refs.textComponent.setWorkspace(this.workspace);
	}
}
</script>

<style>
#workspace {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.item-preview {
	position: absolute;
	right: 0;
	top: 0;
	z-index: 100;
}
</style>