//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIConstants, UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class StylesHome {
  constructor(public httpClient: UIHttpService) { }

  wiki;
  activate() {
    this.httpClient.text('docs/styles/overview.md').then(md => this.wiki = md);
  }
  themes = UIConstants['themes'].split(',');
  colors = UIConstants['colors'].split(',');

  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>1234567890!@#$%^&*()';
}
