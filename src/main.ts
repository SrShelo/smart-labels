import {
	Plugin
} from 'obsidian';

import { textReplacementPostProcessor } from 'textReplacementPostProcessor';


var counter = 0;
export default class SmartLabels extends Plugin {
	async onload() {
		console.log('Loading SmartLabels plugin.');
		

		this.registerMarkdownPostProcessor(textReplacementPostProcessor(this, counter));
	}

  // updateEditorExtension() {
  //   console.log('Llamada entrante, es Satanás');
  // }

	async onunload() {
		console.log('unload')
	}
}
