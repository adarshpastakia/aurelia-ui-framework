// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';

@autoinject()
export class ApiApp {
  constructor(public element: Element) { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks


  usageExample = `\`\`\`ts
import {autoinject} from "aurelia-framework";
import {UIApplication} from "aurelia-ui-framework";

@autoinject()
export class PageView {
  constructor(public app:UIApplication){}
}
  \`\`\``;

  userModel = `\`\`\`ts
UserModel {
  username:string;
  password:string;
  token:string;
}
  \`\`\``;

  toastConfig = `\`\`\`ts
ToastConfig {
  title:string;
  message:string;
  glyph:string;
  theme:string;
  timeout:number; // 0 disable auto-hide
}
  \`\`\``;

  alertConfig = `\`\`\`ts
AlertConfig {
  title:string;
  message:string;
  glyph:string;
  okLabel:string;
  cancelLabel:string;
}
  \`\`\``;

}