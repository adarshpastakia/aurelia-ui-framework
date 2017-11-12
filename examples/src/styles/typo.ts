//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class StyleTypo {
  constructor(public httpClient: UIHttpService) { }

  wiki;
  activate() {
    this.httpClient.text('docs/styles/typography.md').then(md => this.wiki = md);
  }

}
