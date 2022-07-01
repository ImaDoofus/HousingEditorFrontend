<template>
	<div>
		<CustomSnackbar ref='snackbar'/>
		<v-dialog v-model="symbolDialog">
			<v-card class="pa-5">
				<v-card-title class="d-flex justify-center">
					<span class="headline mr-5">Housing Compatible Symbols</span>
					<span class="overline">(Click to copy)</span>
				</v-card-title>
				<div>
					<span class="symbol" v-for="symbol in symbols" :key="symbol" @click="copySymbol(symbol)">
						{{symbol}}
					</span>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import CustomSnackbar from '@/components/misc/CustomSnackbar.vue'

export default {
	name: 'SymbolDialog',
	components: {
		CustomSnackbar,
	},
	data() {
		return {
			symbolDialog: false,
			symbols: '⭐☠☮☯♠Ω♤♣♧♥♡♦♢♔♕♚♛⚜️★☆✮✯☄☾☽☼☀☁☂☃☻☺☹۞۩εїзƸ̵̡Ӝ̨̄ƷξЖЗж☎☏¢☚☛☜☝☞☟✍✌☢☣♨๑❀✿ψ♆☪♪♩♫♬✄✂✆✉✦✧♱♰∞♂♀☿❤❥❦❧™®©✖✗✘♒■□▢▲△▼▽◆◇○◎●◯Δ◕◔ʊϟღツ回₪¿¡½⅓⅔¼¾⅛⅜⅝⅞℅№⇨❝❞#&amp;℃∃∧∠∨∩⊂⊃∪⊥∀ΞΓɐəɘβɟɥɯɔи๏ɹʁяʌʍλчΣΠ➀➁➂➃➄➅➆➇➈➉ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ{｡^‿()☭℘ℑℜℵ♏ηα◠◡╭╮╯╰⊙¤㊣▆▇█▓〓≡╝╚╔╗╬═╓╩┠┨┯┷┏┓┗┛┳﹃﹄┌┐└┘∟「」↑↓→←↘↙┇┅﹉﹊﹍﹎*_-︵∵∴‖︱︳︴﹏﹋﹌►◄▧▨◐◑↔↕▪▫▀▄▌▐░▒▬◊◦▣▤▥▦▩ぃ◘◙◈♭のあ￡✎✟ஐ≈.✲❈➹~【】┱┲❣✚✪✣✤✥❉❃❂❁♈✓✔✕㊚㊛:ﾟ‘･▁▂▃▅⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿⌀⌁⌂⌃⌄⌅⌆⌇⌈⌉⌊⌋'.split('')
		}
	},
	methods: {
		copySymbol(symbol) {
			navigator.clipboard.writeText(symbol)
			this.$refs.snackbar.text = 'Copied to clipboard';
			this.$refs.snackbar.color = 'success';
			this.$refs.snackbar.shown = true;
			this.$refs.snackbar.timeout = 1000;
			this.symbolDialog = false;
		},
		open() {
			this.symbolDialog = true;
		}
	},
}
</script>

<style>
.symbol:hover {
	background-color: #aaa;
}
.symbol {
    cursor: pointer;
	width: 50px;
    height: 50px;
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    vertical-align: middle;
    border-radius: 7px;
    margin-left: 5px;
    margin-bottom: 8px;
    border: 1px solid #000;
    display: inline-block;
    box-shadow: 0 1px 4px -2px #000;
	font-family: 'Minecraft';
}
</style>