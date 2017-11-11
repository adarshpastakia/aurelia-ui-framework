//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Drawer {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('wiki/components/drawer.md').then(md => this.wiki = md);
    this.httpClient.text('wiki/components/drawer.example.md').then(md => this.source = md);
  }
}
