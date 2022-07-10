import fontWidths from '@/assets/fonts/fontWidths.json'
import fontMaps from '@/assets/fonts/fontMaps.json';

export default class MCTextParser {
	static widths = {
		'2': fontWidths.filter(char => { return char.width === 2 }),
		'3': fontWidths.filter(char => { return char.width === 3 }),
		'4': fontWidths.filter(char => { return char.width === 4 }),
		'5': fontWidths.filter(char => { return char.width === 5 }),
		'6': fontWidths.filter(char => { return char.width === 6 }),
		'7': fontWidths.filter(char => { return char.width === 7 }),
		'8': fontWidths.filter(char => { return char.width === 8 }),
	}

	static parseText(text) {
		const parsed = [];
		for (let i = 0; i < text.length; i++) {
			const line = text[i];
			if (!line) {
				parsed.push({ break: true })
				continue;
			}
			const splitText = line.split(/(?=&[0-9a-fr])/);
			for (let j = 0; j < splitText.length; j++) {
				let sameColorPortion = splitText[j]; // the split text where the color is the same
				let color = MCTextParser.getColor(sameColorPortion);
				let secondSplit = sameColorPortion.split(/(?=&[klmno])/);
				for (let k = 0; k < secondSplit.length; k++) {
					let text = secondSplit[k];
					let noFormatting = MCTextParser.removeFormatting(text);
					
					let prev = parsed[parsed.length - 1] || {};
					if (prev.color !== color) prev = {};

					let bold = text.includes('&l') || prev.bold;
					let italic = text.includes('&o') || prev.italic;
					let underlined = text.includes('&n') || prev.underlined;
					let strikethrough = text.includes('&m') || prev.strikethrough;
					let obfuscated = text.includes('&k') || prev.obfuscated;
					parsed.push({ text: noFormatting, color, bold, italic, underlined, strikethrough, obfuscated });
				}
			}
			parsed.push({ break: true }); // add a break after each line
		}
		return parsed;
	}

	static removeFormatting(text) {
		return text.replace(/&[0-9a-frlonmk]/g, '');
	}

	static getColor(text) {
		const match = text.match(/&[0-9a-fr]/);
		if (match) {
			const minecraft = ['&4', '&c', '&6', '&e', '&2', '&a', '&b', '&3', '&1', '&9', '&d', '&5', '&f', '&7', '&8', '&0', '&r']
			const hex = ['#AA0000', '#FF5555', '#FFAA00', '#FFFF55', '#00AA00', '#55FF55', '#55FFFF', '#00AAAA', '#0000AA', '#5555FF', '#FF55FF', '#AA00AA', '#FFFFFF', '#AAAAAA', '#555555', '#000000', '#FFFFFF']
			return hex[minecraft.indexOf(match[0])]
		}
		return '';
	}

	static randomizeObfuscated(textArray) {
		for (let i = 0; i < textArray.length; i++) {
			const line = textArray[i];
			if (line.obfuscated) {
				const length = line.text.length;
				let text = '';
				for (let j = 0; j < length; j++) {
					const char = fontWidths.find(char => { return char.char === line.text[j] });
					if (char) {
						const possible = MCTextParser.widths[char.width]
						text += possible[Math.floor(Math.random() * possible.length)].char; // random char of same width
					} else {
						const possible = MCTextParser.widths['6']
						text += possible[Math.floor(Math.random() * possible.length)].char; // random char of same width
					}
				}
				line.text = text;
			}
		}
		return textArray;
		// return text;
	}

	static replaceWithFont(text, fontMap) {
		const formatRegex = /[0-9a-frlonmk]/;
		let newText = '';
		for (let i = 0; i < text.length; i++) {
			let char = text[i];
			if (char === '&' && formatRegex.test(text[i + 1])) {
				newText += char + text[i + 1];
				i++;
				continue;
			} // skip formatting (skip 2 iterations)
			let newChar = char;
			for (let j = 0; j < fontMaps.length; j++) { // go through all font maps so users can swap between fonts
				let font = fontMaps[j];
				if (fontMap[font.indexOf(char)]) {
					newChar = fontMap[font.indexOf(char)];
					break;
				}
			}
			newText += newChar;
		}
		return newText;
	}
}
