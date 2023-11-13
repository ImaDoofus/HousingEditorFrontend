import Blockly from "blockly";

export default class EventUtil {
  static maxOfType = [
    ["balance_player_team", 1],

    ["set_player_team", 1],
    ["teleport_player", 5],
    ["fail_parkour", 1],
    ["play_sound", 25],
    ["set_compass_target", 5],
    ["set_gamemode", 1],
    ["set_health", 5],
    ["set_hunger_level", 5],
    ["clear_all_potion_effects", 5],
    ["give_experience_levels", 5],
    ["send_to_lobby", 1],
    ["change_player_group", 1],
    ["kill_player", 1],
    ["full_heal", 5],
    ["go_to_house_spawn", 1],
    ["display_title", 5],
    ["display_action_bar", 5],
    ["reset_inventory", 1],
    ["set_max_health", 5],
    ["parkour_checkpoint", 1],
    ["apply_inventory_layout", 5],
    ["exit", 1],
    ["change_player_stat", 10],
    ["change_global_stat", 10],
    ["change_team_stat", 10],
    ["random_action", 5],
    ["send_a_chat_message", 20],
    ["trigger_function", 10],
    ["display_menu", 10],
    ["close_menu", 1],

    ["conditional", 15],
    ["give_item", 20],
    ["remove_item", 20],
    ["apply_potion_effect", 22],
    ["enchant_held_item", 23],
    ["pause_execution", 30],
  ];

  // TODO: Validate these numbers
  static maxOfTypeInRandomAction = [
    ["balance_player_team", 10],
    ["teleport_player", 10],
    ["fail_parkour", 10],
    ["play_sound", 10],
    ["set_compass_target", 10],
    ["set_gamemode", 10],
    ["set_health", 10],
    ["set_hunger_level", 10],
    ["clear_all_potion_effects", 10],
    ["give_experience_levels", 10],
    ["send_to_lobby", 10],
    ["change_player_group", 10],
    ["kill_player", 10],
    ["full_heal", 10],
    ["go_to_house_spawn", 10],
    ["display_title", 10],
    ["display_action_bar", 10],
    ["reset_inventory", 10],
    ["set_max_health", 10],
    ["parkour_checkpoint", 10],
    ["apply_inventory_layout", 10],
    ["exit", 10],
    ["change_player_stat", 10],
    ["change_global_stat", 10],
    ["change_team_stat", 10],
    ["random_action", 10],
    ["send_a_chat_message", 10],
    ["trigger_function", 10],
    ["set_player_team", 10],
    ["display_menu", 10],
    ["give_item", 20],
    ["remove_item", 20],
    ["apply_potion_effect", 20],
    ["enchant_held_item", 23],
    ["pause_execution", 30],
  ];
  static unnestable = ["conditional", "random_action"];
  static scoped_blocks = ["conditional", "random_action", "when_action_triggered", "right_click_action"];

  static findBlockScope(currentBlock, originalBlockID) {
    if (!currentBlock.getParent()) return { scope: currentBlock, isNested: false };
    const parent = currentBlock.getParent();
    if (EventUtil.scoped_blocks.indexOf(parent.type) > -1) {
      // if parent is block of type that scopes
      let scopeBlockChildrenIds = EventUtil.getScopeSiblings(parent, originalBlockID).map((block) => block.id);
      if (scopeBlockChildrenIds.indexOf(originalBlockID) > -1) return { scope: parent, isNested: true };
      else return EventUtil.findBlockScope(parent, originalBlockID); // otherwise, keep looking up the tree
    }
    return EventUtil.findBlockScope(parent, originalBlockID);
  }

  static isBlockMoveValid(event) {
    if (event.type !== Blockly.Events.BLOCK_MOVE) return { isValid: true };
    if (!event.newParentId) return { isValid: true };

    const workspace = Blockly.getMainWorkspace();
    const block = workspace.getBlockById(event.blockId);
    if (!block.getParent()) return { isValid: true };
    const { scope, isNested } = EventUtil.findBlockScope(block, block.id); // gets the parent block that scopes it eg conditional, random_action, start_block, etc
    if (!scope) return { isValid: true };
    const scopeName = scope.type.replaceAll("_", " ").replace(/\b\w/g, (s) => s.toUpperCase());
    if (block.type === "exit" && scope.type !== "conditional") return { isValid: false, message: "Exit blocks can only be placed inside conditional blocks" };
    if (isNested) {
      // if the move event is nested in another block, includes action triggered, random action, conditional, etc
      if (scope.type === "conditional") {
        if (block.type === "conditional") return { message: "easter_egg", isValid: false };
        if (block.type === "random_action") return { message: "Sorry, you can't nest a random action inside a conditional", isValid: false };
      }
      if (scope.type === "random_action") {
        if (block.type === "conditional") return { message: "Sorry, you can't nest a conditional in a random action", isValid: false };
        if (block.type === "random_action") return { message: "Sorry, you can't nest a random action within itself", isValid: false };
      }
    }

    let scopeChildren = EventUtil.getScopeSiblings(scope);

    let counts = Object.assign({}, ...EventUtil.maxOfType.map(([type, max]) => ({ [type]: 0 })));

    scopeChildren.forEach((child) => counts[child.type]++);

    let maxOfType = scope.type === "random_action" ? EventUtil.maxOfTypeInRandomAction : EventUtil.maxOfType;
    for (let [type, max] of maxOfType) {
      if (counts[type] > max)
        return {
          isValid: false,
          message: `Sorry, you can only have <strong>${max} ${type
            .replaceAll("_", " ")
            .replace(/\b\w/g, (s) => s.toUpperCase())}</strong> blocks in a <strong>${scopeName}</strong>`,
        };
    }
    return { isValid: true };
  }

  static getScopeSiblings(block, blockId) {
    switch (block.type) {
      case "conditional": {
        const IF = EventUtil.getInputChildren(block, "IF");
        for (let i = 0; i < IF.length; i++) {
          if (IF[i].id === blockId) return IF;
        }
        return EventUtil.getInputChildren(block, "ELSE");
      }
      case "random_action":
        return EventUtil.getInputChildren(block, "ACTIONS");
      case "when_action_triggered":
        return EventUtil.getShallowChildren(block);
      case "right_click_action":
        return EventUtil.getShallowChildren(block);
      default:
        return EventUtil.getShallowChildren(block);
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

  static selectionId = "";

  static selectedTextBlock(event) {
    if (event.type === Blockly.Events.CLICK || event.type === Blockly.Events.SELECTED) {
      const blockId = event.blockId || event.newElementId;
      if (!blockId) return false;

      const workspace = Blockly.getMainWorkspace();
      const block = workspace.getBlockById(blockId);

      if (block.type === "text_component") {
        EventUtil.selectionId = blockId;
        return block;
      }
    }
    return false;
  }

  static deselectedTextBlock(event) {
    if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) return true;
    if (event.type === Blockly.Events.CLICK || event.type === Blockly.Events.SELECTED) {
      const blockId = event.blockId || event.newElementId;
      if (blockId !== EventUtil.selectionId) return true;
    }
  }

  static textBlockChange(event) {
    if (event.type === Blockly.Events.CHANGE) {
      const workspace = Blockly.getMainWorkspace();
      const block = workspace.getBlockById(event.blockId);
      if (!block) return;

      if (block.type === "text_component") return true;
    }
    return false;
  }
}
