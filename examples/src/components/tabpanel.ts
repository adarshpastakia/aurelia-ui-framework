//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class TabPanel {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/components/tabpanel.md').then(md => this.wiki = md);
    this.httpClient.text('docs/components/tabpanel.example.md').then(md => this.source = md);
  }
}
