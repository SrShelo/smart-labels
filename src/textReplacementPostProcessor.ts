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
                const text = node.nodeValue;
                let match;
                let lastIndex = 0;
                const fragment = document.createDocumentFragment();

                const regex = new RegExp(emojiRegex, 'g');
                while ((match = regex.exec(text)) !== null) {
                    const matchedEmoji = match[0];

                    // Texto antes del emoji
                    if (match.index > lastIndex) {
                        fragment.appendChild(
                            document.createTextNode(text.slice(lastIndex, match.index))
                        );
                    }

                    const replacement = ALL_TEXT[matchedEmoji];
                    if (typeof replacement === 'string') {
                        fragment.appendChild(document.createTextNode(replacement + (++counter)));
                    } else if (replacement instanceof HTMLElement) {
                        // Clona el nodo HTML para evitar reusar el mismo nodo
                        fragment.appendChild(replacement.cloneNode(true));
                    }

                    lastIndex = match.index + matchedEmoji.length;
                }

                // Texto restante después del último emoji
                if (lastIndex < text.length) {
                    fragment.appendChild(
                        document.createTextNode(text.slice(lastIndex))
                    );
                }

                // Reemplaza el nodo original por el fragmento
                if (fragment.childNodes.length > 0) {
                    node.parentNode!.replaceChild(fragment, node);
                }
            }
        }
    }

    const enlace = document.createElement('a');
    enlace.textContent='Ir a pruebas 2';
    enlace.dataset.href= 'Pruebas 2';
    enlace.href='Pruebas 2';
    enlace.addClass('internal-link')

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