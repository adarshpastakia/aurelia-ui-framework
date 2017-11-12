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
    this.httpClient.text('docs/inputs/button.md').then(md => this.wiki = md);
    this.httpClient.text('docs/inputs/button.example.md').then(md => this.source = md);
  }
}
