//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';

@autoinject()
export class BasicInputs {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  attached() {
    setTimeout(() => {
      this.files.files = [
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
        { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' }
      ]
    }, 500);
  }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  dis1 = true;

  files;
}
