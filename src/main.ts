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
		console.log('SmartLabels plugin loaded');
		var counter = 0;
		const cssSelector = `\
		h1,h2,h3,h4,h5,h6,
		p,
		em,
		strong,
		del,
		mark,
		div.callout-title-inner`;

		this.registerMarkdownPostProcessor((element, context) => {
			const blocks = element.findAll(cssSelector);

			for (let block of blocks) {
				for(let item of Array.from(block.childNodes).filter((node) =>
					node.nodeName==='#text')) {
					if (item.textContent) {
						item.textContent = item.textContent.replaceAll(emojiRegex, ((match) => {
							counter += 1;
							return ALL_EMOJIS[match].concat(counter.toString());
						}));
					}
				}
			}
		});
	}

	async onunload() {

	}
}
