<template>
	<category name="Messages" categorystyle="messages_category">
		<block type="send_a_chat_message"></block>
		<block type="display_action_bar"></block>
		<block type="display_title"></block>
	</category>
</template>

<script>
import Blockly from 'blockly/core';

export default {
	name: "MessagesBlocks",
	components: {
	},
	data() {
		return {
		};
	},
	methods: {
		getImagePath(type, meta, extra = false) {
			if (extra) return require(`@/assets/minecraft-items/extra/${type}.png`);
			return require("@/assets/minecraft-items/items/" + type + "-" + meta + ".png");
		},
	},
	mounted() {
		const component = this;

		Blockly.Blocks['send_a_chat_message'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(395, 0), 20, 20))
					.appendField(new Blockly.FieldLabel('Send A Chat Message  ', 'block_header'))

				this.appendValueInput('MESSAGE')
					.setCheck(['TextComponent']);

				this.setColour(140)
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip('Sends a chat message to the player.' + '<br>'
								+ '<b>Inputs: </b>' + 'Text Block, Join Text Block');
				this.setInputsInline(true);
			}
		}

		Blockly.Blocks['display_action_bar'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(386, 0), 20, 20))
					.appendField(new Blockly.FieldLabel('Display Action Bar   ', 'block_header'))
				this.appendValueInput('TEXT')
					.setCheck(['TextComponent']);

				this.setColour(250)
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip('Displays an action bar (text just above the players hotbar)' + '<br>'
								+ '<b>Inputs: </b>' + 'Text Block, Join Text Block');
				this.setInputsInline(true);
			}
		}

		Blockly.Blocks['display_title'] = {
			init: function() {
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(component.getImagePath(340, 0), 20, 20))
					.appendField(new Blockly.FieldLabel('Display Title  ', 'block_header'))
				this.appendValueInput('TITLE')
					.appendField('Title:')
					.setCheck(['TextComponent']);
				this.appendValueInput('SUBTITLE')
					.appendField('Subtitle:')
					.setCheck(['TextComponent']);
				this.appendDummyInput('FADEIN')
					.appendField('Fadein:')
					.appendField(new Blockly.FieldNumber(1, 0, 3, 1), 'FADEIN')
				this.appendDummyInput('STAY')
					.appendField('Stay:')
					.appendField(new Blockly.FieldNumber(5, 0, 10, 1), 'STAY')
				this.appendDummyInput('FADEOUT')
					.appendField('Fadeout:')
					.appendField(new Blockly.FieldNumber(1, 0, 3, 1), 'FADEOUT')

				this.setColour(300)
				this.setPreviousStatement(true, 'action');
				this.setNextStatement(true, 'action');
				this.setTooltip('Displays a title (big text in the center of the players screen)' + '<br>'
								+ '<b>Title: </b>' + 'Bigger text' + '<br>'
								+ '<b>Subtitle: </b>' + 'Smaller text' + '<br>'
								+ '<b>Stay: </b>' + 'The time the title stays on screen (seconds)' + '<br>'
								+ '<b>Fadein: </b>' + 'The time it takes to transition in' + '<br>'
								+ '<b>Fadeout: </b>' + 'The time it takes to transition out');
			}
		}


	},
}
</script>