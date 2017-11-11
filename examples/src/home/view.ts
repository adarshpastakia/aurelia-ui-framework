//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { UIEvent } from 'aurelia-ui-framework';

@autoinject()
export class Home {
  constructor(public router: Router) { }

  titleHidden = true;
  activate() {
    UIEvent.broadcast('hidetitle', true);
  }

  hideTitle(b) {
    if (this.titleHidden != b)
      UIEvent.broadcast('hidetitle', this.titleHidden = b);
  }
}
