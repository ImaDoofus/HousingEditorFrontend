<template>
	<MinecraftFormattingMenu ref='formatting' class='minecraft_formatting' @insert="formattingInsert" @fontSelected='fontSelected'/>
</template>

<script>
import Blockly from 'blockly/core';
import MCTextParser from '@/assets/utils/MinecraftTextParser'
import EventUtil from '@/assets/utils/EventUtil';
import MinecraftFormattingMenu from '@/components/formatting/MinecraftFormattingMenu.vue';

export default {
	name: "TextComponent",
	components: {
		MinecraftFormattingMenu,
	},
	data() {
		return {
			selectedTextBlock: null,
			selectedTextField: null,
		};
	},
	methods: {
		formattingInsert(insertion) {
			const selectionStart = this.selectionStart || 0;
			const selectionEnd = this.selectionEnd || 0;

			const text = this.selectedTextField.getValue();
			let newText;
			let addedLength = 0;
			let addedOffset = 0;
			// if (selectionStart !== selectionEnd) { // if selection has range
			// 	const selection = text.slice(selectionStart, selectionEnd);
			// 	const selectionNoFormatting = MCTextParser.removeFormatting(selection);
			// 	let newSelection;

			// 	// when adding in formatting
			// 	if (selectionNoFormatting === selection) {
			// 		newSelection = insertion + selection + '&r';
			// 		addedLength = 4;
			// 	}
			// 	// when removing formatting
			// 	else {
			// 		newSelection = selectionNoFormatting;
			// 		addedLength = -4;
			// 	}
			// 	newText = text.slice(0, selectionStart) + newSelection + text.slice(selectionEnd);
			// } else { // if selection doesnt have range

				// if removing formatting
				if (text.slice(selectionStart, selectionStart + 2) === insertion) newText = text.slice(0, selectionStart) + text.slice(selectionStart + 2)
				// if inserting formatting
				else {

					if (text.slice(selectionStart, selectionStart + 2).match(/&[1234567890abcdefr]/)) { // if there is formatting after caret (succeeding formatting)
						if (insertion.match(/&[klmno]/)) {
							newText = text.slice(0, selectionStart + 2) + insertion + text.slice(selectionStart + 2); // add insertion after succeeding color code
							addedOffset = 2;
						} else {
							newText = text.slice(0, selectionStart) + insertion + text.slice(selectionStart + 2); // remove succeeding color code
						}
					} else {
						newText = text.slice(0, selectionStart) + insertion + text.slice(selectionStart); // insert formatting
					}
				}
			// }
			this.updateTextField(newText, selectionStart + addedOffset, selectionEnd + addedLength + addedOffset);
		},
		fontSelected(map) {
			const textFieldValue = this.selectedTextField.getValue();
			console.log(window.getSelection().toString());
			if (this.selectionStart !== this.selectionEnd) { // if selection has range
				const highlightedText = textFieldValue.slice(this.selectionStart, this.selectionEnd);
				const newHighlightedText = MCTextParser.replaceWithFont(highlightedText, map);
				this.updateTextField(textFieldValue.slice(0, this.selectionStart) + newHighlightedText + textFieldValue.slice(this.selectionEnd), this.selectionStart, this.selectionEnd);
			} else {
				const newText = MCTextParser.replaceWithFont(textFieldValue, map);
				this.updateTextField(newText, this.selectionStart, this.selectionEnd);
			}
		},
		updateTextField(newText, selectionStart, selectionEnd) {
			this.selectedTextField.setValue(newText);
			// this.selectedTextBlock.setFieldValue(newText, 'TEXT')
			Blockly.WidgetDiv.hide();
			Blockly.WidgetDiv.show(this.selectedTextField);
			this.selectedTextField.htmlInput_ = this.selectedTextField.widgetCreate_();
			this.selectedTextField.htmlInput_.focus()
			this.selectedTextField.htmlInput_.setSelectionRange(selectionStart, selectionEnd);
			console.log(this.selectedTextField.getValue())
			this.$refs.formatting.setPreview(this.selectedTextField.getValue());
		},
		selectionChangeListener(event) {
			if (!this.selectedTextField) return;
			this.selectionStart = this.selectedTextField.htmlInput_.selectionStart;
			this.selectionEnd = this.selectedTextField.htmlInput_.selectionEnd;
		},
		setWorkspace(workspace) {
			workspace.addChangeListener(this.workspaceChangeListener)
		},
		workspaceChangeListener(event) {
		
			const selectedTextBlock = EventUtil.selectedTextBlock(event);
			if (selectedTextBlock) {
				this.selectedTextBlock = selectedTextBlock;
				this.$refs.formatting.open();
				this.selectedTextField = selectedTextBlock.inputList[0].fieldRow[1];
				this.$nextTick(() => {
					const maxTextLength = selectedTextBlock.parentBlock_?.type === 'add_lore' ? 1000 : 50;
					this.$refs.formatting.setMaxTextLength(maxTextLength);
					this.$refs.formatting.setPreview(this.selectedTextField.getValue());
				})
			}

			const deselectedTextBlock = EventUtil.deselectedTextBlock(event);
			if (deselectedTextBlock) {
				this.selectedTextBlock = null;
				this.selectedTextField = null;
				this.$refs.formatting.close();
			}
			const textBlockChange = EventUtil.textBlockChange(event);
			if (textBlockChange) {
				if (this.selectedTextField) {
					this.$refs.formatting.setPreview(this.selectedTextField.getValue())
				} 
			}

			// update max text when block moves
			if (event.type === Blockly.Events.BLOCK_MOVE) {
				if (this.selectedTextBlock && this.selectedTextBlock.id === event.blockId) {
					if (event.newInputName === 'LORE' || event.newInputName === 'NAME') this.$refs.formatting.setMaxTextLength(1000);
					else this.$refs.formatting.setMaxTextLength(50);
				}
			}

		}
	},
	mounted() {
		const component = this;

		Blockly.Blocks['text_component'] = {
			init: function() {
				const input = new Blockly.FieldTextInput('Hello World', (newValue) => {
					if (newValue.length > component.maxLength) return null;
					return newValue;
				})
				this.appendDummyInput()
					.appendField(new Blockly.FieldLabel('Text', 'block_header'))
					.appendField(input, 'TEXT')
				this.setOutput(true, 'TextComponent');
				this.setColour(210);
			},
		}

		document.addEventListener('selectionchange', this.selectionChangeListener);
	},
	destroyed() {
		document.removeEventListener('selectionchange', this.selectionChangeListener);
	},
}
</script>

<style>
.minecraft_formatting {
	position: absolute;
	left: 50%;
	top: 0;
	transform: translate(-50%, 0);
	width: 70%;
	z-index: 1000;
}
</style>