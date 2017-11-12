//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Sidebar {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/components/sidebar.md').then(md => this.wiki = md);
    this.httpClient.text('docs/components/sidebar.example.md').then(md => this.source = md);
  }
}
