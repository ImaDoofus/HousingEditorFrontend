import Blockly from 'blockly';

export default class EventUtil {
	static maxOfType = {
		'teleport_player': 1,
		'fail_parkour': 1,
		'play_sound': 1,
		'set_compass_target': 1,
		'set_gamemode': 1,
		'set_health': 1,
		'set_hunger_level': 1,
		'clear_all_potion_effects': 1,
		'give_experience_levels': 1,
		'send_to_lobby': 1,
		'change_players_group': 1,
		'kill_player': 1,
		'full_heal': 1,
		'go_to_house_spawn': 1,
		'display_title': 1,
		'display_action_bar': 1,
		'reset_inventory': 1,
		'set_max_health': 1,
		'parkour_checkpoint': 1,
		'change_stat': 5,
		'random_action': 5,
		'send_a_chat_message': 5,
		'conditional': 15,
		'give_item': 20,
		'remove_item': 20,
		'apply_potion_effect': 22,
	}

	static unnestable = [
		'conditional',
		'random_action',
	]

	static scoped_blocks = [
		'conditional',
		'random_action',
		'when_action_triggered',
		'right_click_action'
	]

	static findBlockScope(currentBlock, originalBlockID) {
		console.log(currentBlock, currentBlock.getParent())
		if (!currentBlock.getParent()) return { parent: currentBlock, isNested: false };
		const parent = currentBlock.getParent();
		if (EventUtil.scoped_blocks.indexOf(parent.type) > -1) { // if parent is block of type that scopes
			let scopeBlockChildrenIds = EventUtil.getScopeBlockChildren(parent).ALL.map(block => block.id);
			if (scopeBlockChildrenIds.indexOf(originalBlockID) > -1) {
				return { parent, isNested: true };
			} else return EventUtil.findBlockScope(parent, originalBlockID); // otherwise, keep looking up the tree
		}
		return EventUtil.findBlockScope(parent, originalBlockID);
	}

	static isBlockMoveValid(event) {
		if (event.type !== Blockly.Events.BLOCK_MOVE) return { isValid: true };
		if (!event.newParentId) return { isValid: true };

		const workspace = Blockly.mainWorkspace;
		const block = workspace.getBlockById(event.blockId);
		if (!block.getParent()) return { isValid: true };
		const { parent, isNested } = EventUtil.findBlockScope(block, block.id); // gets the parent block that scopes it eg conditional, random_action, start_block, etc
		if (!parent) return { isValid: true };
		const blockName = block.type.replaceAll('_', ' ').replace(/\b\w/g, s => s.toUpperCase());
		const parentName = parent.type.replaceAll('_', ' ').replace(/\b\w/g, s => s.toUpperCase());

		console.log(block,parent)
		if (isNested) { // if the move event is nested in another block, includes action triggered, random action, conditional, etc
			if (block.type === 'conditional' && parent.type === 'conditional') return { message: 'easter_egg', isValid: false };
			if (parent.type === 'random_action') {
				if (block.type === 'conditional') return { message: 'Sorry, you can\'t nest a conditional in a random action', isValid: false };
				if (block.type === 'random_action') return { message: 'Sorry, you can\'t nest a random action within itself', isValid: false };
			}
		}

		let children;
		if (parent.type === 'conditional') {
			const childrenObject = EventUtil.getScopeBlockChildren(parent);
			if (childrenObject.IF.map(block => block.id).indexOf(block.id) > -1) {
				children = childrenObject.IF;
			} else { 
				children = childrenObject.ELSE;
			}
		} else {
			children = EventUtil.getScopeBlockChildren(parent).ALL;
		}

		const count = children.filter(child => child.type === block.type).length;

		if (count > EventUtil.maxOfType[block.type]) {
			const maxCount = EventUtil.maxOfType[block.type];
			const plural = maxCount > 1 ? 's' : '';
			if (EventUtil.scoped_blocks.indexOf(parent.type) > -1) { // if is a block that nests other blocks
				return { message: `Sorry, you can only have <strong>${maxCount} ${blockName}</strong> block${plural} in a <strong>${parentName}</strong> block`, isValid: false };
			} else {
				return { message: `Sorry, you can only have <strong>${maxCount} ${blockName}</strong> block${plural} in this chain of blocks.`, isValid: false };
			}
		}

		return { isValid: true };
	}

	static getScopeBlockChildren(block) {
		switch (block.type) {
			case 'conditional': {
				const IF = EventUtil.getInputChildren(block, 'IF');
				const ELSE = EventUtil.getInputChildren(block, 'ELSE');
				return { IF, ELSE, ALL: [...IF, ...ELSE] };
			}
			case 'random_action': return { ALL: EventUtil.getInputChildren(block, 'ACTIONS') };
			case 'when_action_triggered': return { ALL: EventUtil.getShallowChildren(block) };
			case 'right_click_action': return { ALL: EventUtil.getShallowChildren(block) };
			default: return { ALL: EventUtil.getShallowChildren(block) };
		}
	}

	static getShallowChildren(block) {
		let children = [block];
		let next = block.getNextBlock();
		while (next) {
			children.push(next);
			next = next.getNextBlock();
		}
		return children;
	}

	static getInputChildren(block, inputName) {
		let children = [block];
		let input = block.getInputTargetBlock(inputName);
		if (!input) return children;
		while (input) {
			children.push(input);
			input = input.getNextBlock();
		}
		return children;
	}

	static selectedTextBlock(event) {
		if (event.type === Blockly.Events.CLICK || event.type === Blockly.Events.SELECTED) {
			const blockId = event.blockId || event.newElementId;
			if (!blockId) return false;

			const workspace = Blockly.mainWorkspace;
			const block = workspace.getBlockById(blockId);
	
			if (block.type === 'text_component') return block;
		}
		return false;
	}

	static deselectedTextBlock(event) {
		if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) return true;
		if (event.type === Blockly.Events.CLICK || event.type === Blockly.Events.SELECTED) {
			const blockId = event.blockId || event.newElementId;
			if (!blockId) return true;
		}
	}

	static textBlockChange(event) {
		if (event.type === Blockly.Events.CHANGE) {
			const workspace = Blockly.mainWorkspace
			const block = workspace.getBlockById(event.blockId);
			if (!block) return;

			if (block.type === 'text_component') return true
		}
		return false
	}
}