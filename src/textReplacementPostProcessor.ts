import {
    MarkdownPostProcessorContext,
	Plugin
} from 'obsidian';

import SmartLabels from 'main';

export const textReplacementPostProcessor = (
plugin: SmartLabels,
counter: number) => (

element: HTMLElement,
context: MarkdownPostProcessorContext) => {

    console.log('New element :)');
    // console.log(context);
    const cssSelector = `\
    h1,h2,h3,h4,h5,h6,
    p,
    li,
    em,
    strong,
    del,
    mark,
    div.callout-title-inner`;

    function replaceWithTreeWalker(root: HTMLElement): void {
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        let node: Node | null;
        while ((node = walker.nextNode())) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
                node.nodeValue = node.nodeValue.replace(emojiRegex, (match) => {
                    counter += 1;
                    return `${ALL_TEXT[match]}${counter}`;
                });
            }
        }
    }

    const enlace = document.createElement('a');
    enlace.textContent='Ir a pruebas 2';
    enlace.href='Pruebas 2';
    enlace.dataset.href= enlace.href;

    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';

    const ALL_TEXT: Record<string, string|HTMLElement> = {
        ':+1:': '👍',
        ':sunglasses:': '😎',
        ':smile:': '😄 lolol',
        ':link:': enlace,
    };

    const emojiRegex = new RegExp(Object.getOwnPropertyNames(ALL_TEXT).join('|').replaceAll('+', '\\+'), 'g');

    const blocks = element.findAll(cssSelector);

    for (let block of blocks) {
        replaceWithTreeWalker(block as HTMLElement);
    }
}