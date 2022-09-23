<template>
	<div v-if="showMenu">
		<CustomSnackbar ref="snackbar" />
		<SymbolDialog ref="symbol" />
		<TextPreview ref="preview" class='preview'/>
		
		<v-row class="py-1 primary d-flex justify-center">
			<v-btn v-for="color in colorMap"
			:key="color[0]"
			:style="`background-color: ${color[1]}`"
			:dark="color[2]"
			class="menu_button ml-1"
			@click="emitInsert(color[0])">
				{{ color[0] }}
			</v-btn>
		</v-row>

		<v-row class="py-1 primary d-flex justify-center">
			<v-btn class="menu_button font-weight-black" @click="emitInsert('&l')">
				&l
			</v-btn>
			<v-btn class="menu_button ml-1 font-italic" @click="emitInsert('&o')">
				&o
			</v-btn>
			<v-btn class="menu_button ml-1 text-decoration-underline" @click="emitInsert('&n')">
				&n
			</v-btn>
			<v-btn class="menu_button ml-1 text-decoration-line-through" @click="emitInsert('&m')">
				&m
			</v-btn>
			<v-btn tile class="px-1 ml-1" @click="emitInsert('&k')" style="line-height: 0">
				&k random
			</v-btn>
			<v-btn tile class="px-1 ml-1" @click="emitInsert('&r')">
				&r reset
			</v-btn>
			<v-btn tile class="px-1 ml-1" @click="fontButtonClicked()">
				Font
			</v-btn>
	
			<v-btn tile class="px-1 ml-1" @click="placeholderDialog = true">
				Placeholder
			</v-btn>
	
			<v-btn class="menu_button yellow ml-1" @click="$refs.symbol.open()">
				<v-icon>mdi-star</v-icon>
			</v-btn>
		</v-row>	

		<v-dialog v-model="placeholderDialog" max-width="400">
			<v-card class="pa-2">
				<v-card-title>
					<span class="headline">Placeholder</span>
				</v-card-title>
				<v-card-text>
					<v-select :items="placeholderOptions" v-model="placeholder" label="Placeholder"></v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green" text small @click="insertPlaceholder">OK</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="statNameDialog" max-width="400">
			<v-card class="pa-2">
				<v-card-title>
					<span class="headline">Stat Name</span>
				</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="statName"
						label="Stat Name"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green" text small @click="insertStatName">OK</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="fontDialog" max-width="400">
			<v-card class="pa-2">
				<v-card-title>
					<span class="headline">1.8.9 Supported Fonts</span>
				</v-card-title>
				<v-card-text>
					<v-select :items="fontOptions" v-model="fontSelection" item-text="tag" label="Font">
						<template #item="{ item }">
							<v-chip class="primary mr-1">
								{{ item.tag }}
							</v-chip>
							<!-- <span>
								{{ item.text }}
							</span> -->
							<img :src="item.src">
						</template>
					</v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="green" text small @click="fontWasSelected">OK</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import SymbolDialog from '@/components/formatting/SymbolDialog.vue';
import TextPreview from './TextPreview.vue';
import CustomSnackbar from '../misc/CustomSnackbar.vue';
import fontMaps from '@/assets/fonts/fontMaps.json';

export default {
	name: 'MinecraftFormattingMenu',
	components: {
		SymbolDialog,
		TextPreview,
		CustomSnackbar,
	},
	data() {
		return {
			previewText: '',
			showMenu: false,
			placeholderDialog: false,
			placeholder: '%%stat_**%%',
			placeholderOptions: ['%%stat_**%%', '%%globalstat_**%%', '%%player%%', '%%group%%', '%%cookies%%', '%%guests%%', '%%ping%%'],
			statName: '',
			statNameDialog: false,
			obfuscatedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
			obfuscated: '',
			colorMap: [
				['&0', '#000', true],
				['&1', '#00A', true],
				['&2', '#0A0', true],
				['&3', '#0AA', true],
				['&4', '#A00', true],
				['&5', '#A0A', true],
				['&6', '#FA0', true],
				['&7', '#AAA', true],
				['&8', '#555', true],
				['&9', '#55F', false],
				['&a', '#5F5', false],
				['&b', '#5FF', false],
				['&c', '#F55', false],
				['&d', '#F5F', false],
				['&e', '#FF5', false],
				['&f', '#FFF', false],
			],

			fontSelection: null,
			fontDialog: false,
			fontOptions: [
				{ text: 'Ｔｈｅ ｑｕｉｃｋ ｂｒｏｗｎ ｆｏｘ ｊｕｍｐｓ ｏｖｅｒ ｔｈｅ ｌａｚｙ ｄｏｇ', tag: 'Fancy Text', src: require('@/assets/fonts/example-pics/fancy.jpg'), map: fontMaps[1] },
				{ text: 'Ⓣⓗⓔ ⓠⓤⓘⓒⓚ ⓑⓡⓞⓦⓝ ⓕⓞⓧ ⓙⓤⓜⓟⓢ ⓞⓥⓔⓡ ⓣⓗⓔ ⓛⓐⓩⓨ ⓓⓞⓖ', tag: 'Circled', src: require('@/assets/fonts/example-pics/circled.jpg'), map: fontMaps[2] },
				{ text: 'Tʜᴇ ǫᴜɪᴄᴋ ʙʀᴏᴡɴ ғᴏx ᴊᴜᴍᴘs ᴏᴠᴇʀ ᴛʜᴇ ʟᴀᴢʏ ᴅᴏɢ', tag: 'Small Caps', src: require('@/assets/fonts/example-pics/small_caps.jpg'), map: fontMaps[3] },
				{ text: 'ᵀʰᵉ ᵠᵘᶦᶜᵏ ᵇʳᵒʷⁿ ᶠᵒˣ ʲᵘᵐᵖˢ ᵒᵛᵉʳ ᵗʰᵉ ˡᵃᶻʸ ᵈᵒᵍ', tag: 'Superscript', src: require('@/assets/fonts/example-pics/superscript.jpg'), map: fontMaps[4] },
				{ text: 'ɓop ʎzɐl ǝɥʇ ɹǝʌo sdɯnɾ xoɟ uʍoɹq ʞɔınb ǝɥ⊥', tag: 'Upside down', src: require('@/assets/fonts/example-pics/upside_down.jpg'), map: fontMaps[5] }
			]
		}
	},
	methods: {
		insertPlaceholder() {
			this.placeholderDialog = false;
			if (this.placeholder === '%%stat_**%%' || this.placeholder === '%%globalstat_**%%') {
				this.statNameDialog = true;
			} else this.emitInsert(this.placeholder);
		},
		insertStatName() {
			this.statNameDialog = false;
			this.emitInsert(`%%stat_${this.statName}%%`)
		},
		emitInsert(text) {
			this.$emit('insert', text);
		},
		fontButtonClicked() {
			this.fontDialog = true;
		},
		fontWasSelected() {
			this.$emit('fontSelected', this.fontOptions.find(option => option.tag === this.fontSelection).map);
			this.fontDialog = false;
		},
		open() {
			this.showMenu = true;
		},
		close() {
			this.showMenu = false;
		},
		setPreview(text) {
			if (this.$refs.preview) this.$refs.preview.setText(text);
		},
		setMaxTextLength(length) {
			if (this.$refs.preview) this.$refs.preview.setMaxTextLength(length);
		},
	}
}
</script>

<style>
.menu_button {
	min-width: 0 !important;
	padding: 0 0 !important;
	height: 36px !important;
	width: 36px !important;
	vertical-align: sub !important;
	border-radius: 0 !important;
	font-family: 'Minecraft';
}
.preview {
	position: absolute;
	left: 50%;
	top: -50px;
	transform: translate(-50%, 0);
}
.font_select {
	font-family: 'Minecraft' !important;
}
</style>
