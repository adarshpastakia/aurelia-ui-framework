//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class Grid {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/core/grid.md').then(md => this.wiki = md);
    this.httpClient.text('docs/core/grid.example.md').then(md => this.source = md);
  }
}
