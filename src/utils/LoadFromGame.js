// converts list of actions to blocks in a workspace

import Blockly from 'blockly';

export default class LoadFromGame {

	static globalWorkspace;

	static sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	static async loadToWorkspace(actionData, workspace) {
		const sleepTime = (1 / actionData.length) * 1000;
		this.globalWorkspace = workspace;
		let prevBlock;
		let index = 0;

		const blocks = workspace.getAllBlocks();

		prevBlock = blocks[0]; // chain next blocks to when action triggered block

		// for animation
		async function loopAddBlocks() {
			let block = await LoadFromGame.createBlock(workspace, actionData[index], prevBlock)
			prevBlock = block;

			workspace.centerOnBlock(block.id);

			index++;
			if (index < actionData.length){
				await LoadFromGame.sleep(sleepTime)
				loopAddBlocks()
			}
		}

		loopAddBlocks()
	}

	static async createBlock(workspace, action, prevBlock) {
		let block = workspace.newBlock(action[0])
		block.initSvg();
		block.render();
		prevBlock.nextConnection.connect(block.previousConnection)

		await LoadFromGame.setBlockData(block, action[1])

		return block;
	}

	/*
	 * Sets the block data when loading it into the workspace
	 * e.g. for the set_health block set the input HEALTH 
	 *
	 * 
	 */
	static async setBlockData(block, actionData) {
		const workspace = this.globalWorkspace;
		if (Object.keys(actionData).length === 0) return; // return if no data to set
		switch (block.type) {
			case 'apply_potion_effect': {
				block.setFieldValue(actionData.effect, 'POTION_EFFECT');
				block.setFieldValue(actionData.duration, 'DURATION');
				block.setFieldValue(actionData.amplifer, 'AMPLIFIER');
				block.setFieldValue(actionData.overrideExistingEffects, 'OVERRIDE_EXISTING_EFFECTS');
				break;
			}
			case 'change_player_group': {
				block.setFieldValue(actionData.group, 'GROUP');
				block.setFieldValue(actionData.demotionProtection, 'DEMOTION_PROTECTION');
				break;
			}
			case 'change_stat': {
				block.setFieldValue(actionData.stat, 'STAT');
				block.setFieldValue(actionData.value, 'VALUE');
				block.setFieldValue(actionData.mode, 'MODE');
				break;
			}
			case 'conditional': {
				await LoadFromGame.loadConditions(block, actionData.conditions);
				break;
			}
			case 'set_health': {
				block.setFieldValue(actionData.health, 'HEALTH');
			}
		}
	}

	static async loadConditions(conditionalBlock, conditions) {
		const sleepTime = (1 / conditions.length) * 1000;
		const workspace = this.globalWorkspace;
		let index = 0;

		// for animation
		async function loopAddConditions() {
			let condition = conditions[index];
			let conditionBlock = workspace.newBlock('condition_' + condition[0]);
			conditionBlock.initSvg();
			conditionBlock.render();
			let input = conditionalBlock.getInput('CONDITIONINPUT' + (index + 1));
			input.connection.connect(conditionBlock.outputConnection);

			LoadFromGame.setConditionalData(conditionBlock, condition[1])

			workspace.centerOnBlock(conditionBlock.getParent().id)

			index++;
			if (index < conditions.length) {
				await LoadFromGame.sleep(sleepTime)
				await loopAddConditions()
			}
		}

		await loopAddConditions()
	}

	static async setConditionalData(block, conditionalData) {
		const workspace = this.globalWorkspace;
		if (Object.keys(conditionalData).length === 0) return; // return if no data to set
		switch (block.type) {
			case 'condition_stat_requirement': {
				block.options_['STAT'] = conditionalData.stat;
				block.options_['COMPARATOR'] = conditionalData.comparator;
				block.options_['VALUE'] = conditionalData.value;
				break;
			}
			case 'condition_has_potion_effect': {
				block.options_['POTION_EFFECT'] = conditionalData.effect;
				break;
			}
			case 'condition_has_item': {
				
				break;
			}
			case 'condition_within_region': {
				block.options_['REGION_NAME'] = conditionalData.region;
				break;
			}
			case 'condition_required_group': {
				block.options_['GROUP'] = conditionalData.group;
				block.options_['INCLUDE_HIGHER_GROUPS'] = conditionalData.includeHigherGroups;
				break;
			}
			case 'condition_required_permission': {
				block.options_['PERMISSION'] = conditionalData.permission;
				break;
			}
		}

	}
}