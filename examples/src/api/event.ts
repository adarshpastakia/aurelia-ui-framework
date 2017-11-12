//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIEvent } from 'aurelia-ui-framework';

@autoinject()
export class EventManager {
  constructor(public httpClient: UIHttpService) { }

  container;
  basicUsage;
  attached() {
    this.httpClient.text('docs/api/event.md').then(md => this.basicUsage.innerHTML = this.container.renderHtml(md));
  }
}
