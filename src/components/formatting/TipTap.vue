<template>
	<div class="editor_wrapper base" v-if="editor">
		<div class="menubar base">
			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('bold') }"
			@click="editor.chain().focus().toggleBold().run()"
			>
			<v-icon :color="editor.isActive('bold') ? 'blue' : 'grey'">mdi-format-bold</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('italic') }"
			@click="editor.chain().focus().toggleItalic().run()"
			>
			<v-icon :color="editor.isActive('italic') ? 'blue' : 'grey'">mdi-format-italic</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('underline') }"
			@click="editor.chain().focus().toggleUnderline().run()"
			>
			<v-icon :color="editor.isActive('underline') ? 'blue' : 'grey'">mdi-format-underline</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('strike') }"
			@click="editor.chain().focus().toggleStrike().run()"
			>
			<v-icon :color="editor.isActive('strike') ? 'blue' : 'grey'">mdi-format-strikethrough</v-icon>
			</button>

			<button
			class="menubar__button"
			@click="editor.chain().focus().unsetAllMarks().run()"
			>
			<v-icon>mdi-format-clear</v-icon>
			</button>

			<v-divider vertical class="mx-1"></v-divider>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('paragraph') }"
			@click="editor.chain().focus().setParagraph().run()"
			>
			<v-icon :color="editor.isActive('paragraph') ? 'blue' : 'grey'">mdi-format-paragraph</v-icon>
			</button>
			
			<button
			class="menubar__button"
			@click="headingDialog = true"
			:class="{ 'is-active': editor.isActive('heading') }"
			>
			<v-icon :color="editor.isActive('heading') ? 'blue' : 'grey'">mdi-format-header-pound</v-icon>
			</button>

			<v-dialog v-model="headingDialog" content-class="elevation-0" max-width="300">
				<v-card @click="headingDialog = false">
					<v-card-title class="justify-center">
						<span class="headline">Headings</span>
					</v-card-title>
					<div class="d-flex justify-space-around">
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 1}) }"
						@click="editor.chain().focus().toggleHeading({ level: 1}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 1}) ? 'blue' : 'grey'">mdi-format-header-1</v-icon>
						</button>
	
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 2}) }"
						@click="editor.chain().focus().toggleHeading({ level: 2}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 2}) ? 'blue' : 'grey'">mdi-format-header-2</v-icon>
						</button>
	
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 3}) }"
						@click="editor.chain().focus().toggleHeading({ level: 3}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 3}) ? 'blue' : 'grey'">mdi-format-header-3</v-icon>
						</button>
	
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 4}) }"
						@click="editor.chain().focus().toggleHeading({ level: 4}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 4}) ? 'blue' : 'grey'">mdi-format-header-4</v-icon>
						</button>
	
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 5}) }"
						@click="editor.chain().focus().toggleHeading({ level: 5}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 5}) ? 'blue' : 'grey'">mdi-format-header-5</v-icon>
						</button>
	
						<button
						class="menubar__button"
						:class="{ 'is-active': editor.isActive('heading', { level: 6}) }"
						@click="editor.chain().focus().toggleHeading({ level: 6}).run()"
						>
						<v-icon :color="editor.isActive('heading', { level: 6}) ? 'blue' : 'grey'">mdi-format-header-6</v-icon>
						</button>
					</div>

				</v-card>
			</v-dialog>

			<v-divider vertical class="mx-1"></v-divider>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('bulletList') }"
			@click="editor.chain().focus().toggleBulletList().run()"
			>
			<v-icon :color="editor.isActive('bulletList') ? 'blue' : 'grey'">mdi-format-list-bulleted</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('orderedList') }"
			@click="editor.chain().focus().toggleOrderedList().run()"
			>
			<v-icon :color="editor.isActive('orderedList') ? 'blue' : 'grey'">mdi-format-list-numbered</v-icon>
			</button>

			<v-divider vertical class="mx-1"></v-divider>

			<button
			class="menubar__button"
			@click="editor.chain().focus().setHorizontalRule().run()"
			>
			<v-icon color="grey">mdi-minus</v-icon>
			</button>

			<v-divider vertical class="mx-1"></v-divider>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('blockquote') }"
			@click="editor.chain().focus().toggleBlockquote().run()"
			>
			<v-icon :color="editor.isActive('blockquote') ? 'blue' : 'grey'">mdi-format-quote-open</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('code') }"
			@click="editor.chain().focus().toggleCode().run()"
			>
			<v-icon :color="editor.isActive('code') ? 'blue' : 'grey'">mdi-code-tags</v-icon>
			</button>

			<button
			class="menubar__button"
			:class="{ 'is-active': editor.isActive('codeBlock') }"
			@click="editor.chain().focus().toggleCodeBlock().run()"
			>
			<v-icon :color="editor.isActive('codeBlock') ? 'blue' : 'grey'">mdi-code-braces</v-icon>
			</button>

			<v-divider vertical class="mx-1"></v-divider>

			<button
			class="menubar__button"
			@click="addImage"
			>
			<v-icon color="grey">mdi-image-plus</v-icon>
			</button>

			<v-divider vertical class="mx-1"></v-divider>

			<!-- Tables -->

			<button
			class="menubar__button"
			@click="tableDialog = true"
			:class="{ 'is-active': editor.isActive('table') }"
			>
			<v-icon :color="editor.isActive('table') ? 'blue' : 'grey'">mdi-table-large</v-icon>
			</button>

			<v-dialog v-model="tableDialog" content-class="elevation-0" max-width="600">
				<v-card class="pa-5">
					<v-card-title class="justify-center">
						<span class="headline">Table</span>
					</v-card-title>
					<div @click="headingDialog = false" class="d-flex justify-space-around">
						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
						>
						<v-icon color="grey">mdi-table-large</v-icon>
						</v-btn>

						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().deleteTable().run()"
						>
						<v-icon color="grey">mdi-table-remove</v-icon>
						</v-btn>

						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().addColumnAfter().run()"
						:disabled="!editor.can().addColumnAfter()"
						>
						<v-icon :color="editor.can().addColumnAfter() ? 'grey' : 'grey lighten-1'">mdi-table-column-plus-after</v-icon>
						</v-btn>

						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().addRowAfter().run()"
						:disabled="!editor.can().addRowAfter()"
						>
						<v-icon :color="editor.can().addRowAfter() ? 'grey' : 'grey lighten-1'">mdi-table-row-plus-after</v-icon>
						</v-btn>

						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().deleteColumn().run()"
						:disabled="!editor.can().deleteColumn()"
						>
						<v-icon :color="editor.can().deleteColumn() ? 'grey' : 'grey lighten-1'">mdi-table-column-remove</v-icon>
						</v-btn>

						<v-btn
						class="menubar__button"
						@click="editor.chain().focus().deleteRow().run()"
						:disabled="!editor.can().deleteRow()"
						>
						<v-icon :color="editor.can().deleteRow() ? 'grey' : 'grey lighten-1'">mdi-table-row-remove</v-icon>
						</v-btn>
					</div>
				</v-card>
			</v-dialog>

			<v-divider vertical class="mx-1"></v-divider>

			<!-- colors -->
			<button
			class="menubar__button"
			@click="colorDialog = true"
			>
			<v-icon :color="editor.getAttributes('textStyle').color">mdi-palette</v-icon>
			</button>

			<v-dialog v-model="colorDialog" content-class="elevation-0" width="auto">
				<div class="d-flex justify-space-around">
					<v-color-picker
					
					type="color"
					v-model="color"
					:value="editor.getAttributes('textStyle').color"
					>
					</v-color-picker>
				</div>
			</v-dialog>

		</div>
		<editor-content :editor="editor"/>
	</div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

export default {
	components: {
		EditorContent,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			editor: null,
			limit: 1000,
			headingDialog: false,
			tableDialog: false,
			colorDialog: false,
			color: '#000000',
		}
	},
	mounted() {
		this.editor = new Editor({
			extensions: [
				StarterKit,
				Underline,
				Image,
				Table.configure({
					resizable: true,
				}),
				TableRow,
				TableHeader,
				TableCell,
				Color,
				TextStyle,
			],
			content: this.value,
			onUpdate: () => {
				this.$emit('input', this.editor.getHTML())
			}
		})
	},

	beforeUnmount() {
		this.editor.destroy()
	},

	methods: {
		addImage() {
			const url = prompt('Enter the URL of the image:')

			if (!url) return;

			this.editor.chain().focus().setImage({ src: url }).run()
		},
	},
	watch: {
		value(value) {
			const isSame = this.editor.getHTML() === value

			if (isSame) return;

			this.editor.commands.setContent(value, false)
		},
		color(color) {
			this.editor.chain().focus().setColor(color).run()
		},
	}
}
</script>

<style scoped>
.editor_wrapper {
	border: 2px solid #ccc;
	background-color: #fff;
}
.menubar {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ccc;
}

.menubar__button {
	padding: 0.5rem;
}
/* .is-active {
} */
</style>

<style lang="scss">
/* remove outline */
.ProseMirror:focus {
	outline: none;
}
/* set */
.ProseMirror {
	background-color: #fff;
	min-height: 100px;
}

/* Basic editor styles */
.ProseMirror {
	> * + * {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0D0D0D;
		color: #FFF;
		font-family: 'JetBrainsMono', monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 0.8rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0D0D0D, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0D0D0D, 0.1);
		margin: 2rem 0;
	}
}

/* Table-specific styling */
.ProseMirror {
	table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;

		td,
		th {
			min-width: 1em;
			border: 2px solid #ced4da;
			padding: 3px 5px;
			vertical-align: top;
			box-sizing: border-box;
			position: relative;

			> * {
				margin-bottom: 0;
			}
		}

		th {
			font-weight: bold;
			text-align: left;
			background-color: #f1f3f5;
		}

		.selectedCell:after {
			z-index: 2;
			position: absolute;
			content: "";
			left: 0; right: 0; top: 0; bottom: 0;
			background: rgba(200, 200, 255, 0.4);
			pointer-events: none;
		}

		.column-resize-handle {
			position: absolute;
			right: -2px;
			top: 0;
			bottom: -2px;
			width: 4px;
			background-color: #adf;
			pointer-events: none;
		}

		p {
			margin: 0;
		}
	}
}

.tableWrapper {
	overflow-x: auto;
}

.resize-cursor {
	cursor: ew-resize;
	cursor: col-resize;
}
</style>