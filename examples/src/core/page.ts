//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Page {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/core/page.md').then(md => this.wiki = md);
    this.httpClient.text('docs/core/page.example.md').then(md => this.source = md);
  }
}
