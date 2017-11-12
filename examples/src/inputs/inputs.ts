//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Inputs {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';

  activate() {
    this.httpClient.text('docs/inputs/form.md').then(mdForm => {
      this.httpClient.text('docs/inputs/inputs.md').then(md => this.wiki = mdForm + md);
    });
    this.httpClient.text('docs/inputs/form.example.md').then(md => this.source = md);
  }

  attached() {
    setTimeout(() => {
      this.files.files = [
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' }
      ]
    }, 500);
  }

  dis1 = true;

  files;
}
