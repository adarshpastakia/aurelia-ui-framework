//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIConstants, UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Buttons {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';

  themes = UIConstants['themes'].split(',');
  colors = UIConstants['colors'].split(',');

  activate() {
    this.themes.splice(0, 1);
    this.httpClient.text('docs/inputs/options.md').then(md => this.wiki = md);
    this.httpClient.text('docs/inputs/options.example.md').then(md => this.source = md);
  }
}
