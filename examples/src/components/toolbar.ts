//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Toolbar {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';

  activate() {
    this.httpClient.text('docs/components/toolbar.md').then(md => this.wiki = md);
    this.httpClient.text('docs/components/toolbar.example.md').then(md => this.source = md);
  }
}
