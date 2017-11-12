//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIConstants, UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Indicators {
  constructor(public httpClient: UIHttpService) { }

  themes = UIConstants['themes'].split(',');
  colors = UIConstants['colors'].split(',');

  crumbs = ['Personal Info', 'Shipping Info', 'Payment Info', 'Agreement'];

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/components/indicators.md').then(md => this.wiki = md);
    this.httpClient.text('docs/components/indicators.example.md').then(md => this.source = md);
  }
}
