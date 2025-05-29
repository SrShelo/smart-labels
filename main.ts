import {
	Plugin
} from 'obsidian';

const ALL_EMOJIS: Record<string, string> = {
	':+1:': '👍',
	':sunglasses:': '😎',
	':smile:': '😄 lolol',
}

const emojiRegex = new RegExp(Object.getOwnPropertyNames(ALL_EMOJIS).join('|').replaceAll('+', '\\+'), 'g');

export default class SmartLabels extends Plugin {
	async onload() {
		var counter = 0;
		this.registerMarkdownPostProcessor((element, context) => {
			const blocks = element.findAll('p');

			for (let block of blocks) {
				block.textContent = block.textContent.replaceAll(emojiRegex, ((match) => {
					counter += 1;
					return ALL_EMOJIS[match].concat(counter);
				}))
			}
		});
	}

	async onunload() {

	}
}
