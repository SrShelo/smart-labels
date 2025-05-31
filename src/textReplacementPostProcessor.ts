import {
    MarkdownPostProcessorContext,
	Plugin
} from 'obsidian';

import SmartLabels from 'main';

export const textReplacementPostProcessor = (plugin: SmartLabels, counter: number) => async (element: HTMLElement, context: MarkdownPostProcessorContext) => {
    console.log('Loading PostProcessor :)');
    const cssSelector = `\
    h1,h2,h3,h4,h5,h6,
    p,
    li,
    em,
    strong,
    del,
    mark,
    div.callout-title-inner`;


    const ALL_EMOJIS: Record<string, string> = {
        ':+1:': '👍',
        ':sunglasses:': '😎',
        ':smile:': '😄 lolol',
    };

    const emojiRegex = new RegExp(Object.getOwnPropertyNames(ALL_EMOJIS).join('|').replaceAll('+', '\\+'), 'g');
    console.log('Chuparlord')
    console.log(element.querySelectorAll(cssSelector));

    const blocks = element.findAll(cssSelector);
    console.log(blocks)

    for (let block of blocks) {
        for(let item of Array.from(block.childNodes).filter((node) =>
            node.nodeName==='#text')) {
            item.textContent = item.textContent!.replaceAll(emojiRegex, ((match) => {
                counter += 1;
                // console.log(counter+': '+item.textContent)
                return ALL_EMOJIS[match].concat(counter.toString());
            }));
        }
    }
}