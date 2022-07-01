export default class BlockTextParser {
	static parseTextBlock(block) {
		console.log(block?.fields)
		return block?.fields?.TEXT;
	}
}