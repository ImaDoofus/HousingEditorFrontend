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
			<ItemPreview v-if="preview" :name='previewName' :lore='previewLore' :item='previewItem' :enchantments="[]" :flags="[]"/>
		</v-card>
		<ItemBlock @itemSelected='itemWasSelected'/>
		<BlocklyComponent id="workspace" :options="options" ref="workspace">
			<category name="Customize Item" categorystyle="customize_item_category" >
				<block type="set_name"></block>
				<block type="add_lore"></block>
			</category>
			<TextComponent />
			<sep></sep>
			<LogicBlocks :isItem="true" />
			<ConditionBlocks :isItem='false' />
			<MessagesBlocks />
			<PotionEffectsBlocks />
			<HealthBlocks />
			<TeleportationBlocks />
			<ParkourBlocks />
			<MiscBlocks :isItem="true" />
			<InventoryBlocks :isItem='true'/>

		</BlocklyComponent>
	</div>
</template>

<script>
import BlocklyComponent from '@/blockly/BlocklyComponent.vue'
import Blockly from 'blockly';
import ItemBlock from '@/blocks/items/item.vue';
import '@/blocks/items/right_click_action.js';
import '@/blocks/items/name.js';
import '@/blocks/items/lore.js';
import MessagesBlocks from '@/blocks/actions/messages.vue';
import TeleportationBlocks from '@/blocks/actions/teleportation.vue';
import ConditionBlocks from '@/blocks/actions/conditions.vue';
import PotionEffectsBlocks from '@/blocks/actions/potion_effects.vue';
import MiscBlocks from '@/blocks/actions/misc.vue';
import InventoryBlocks from '@/blocks/actions/inventory.vue';
import LogicBlocks from '@/blocks/actions/logic.vue';
import HealthBlocks from '@/blocks/actions/health.vue';
import ParkourBlocks from '@/blocks/actions/parkour.vue';
import ItemPreview from '@/components/items/ItemPreview.vue'

// right click action blocks
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
		LogicBlocks,
		HealthBlocks,
		ParkourBlocks,
		MiscBlocks,
		PotionEffectsBlocks,
		MessagesBlocks,
		TeleportationBlocks,
		ConditionBlocks,
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