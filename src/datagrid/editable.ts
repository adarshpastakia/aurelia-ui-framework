//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UILocalDS} from "../resources/data/ui-data-source";
import {UIUtils} from "../resources/utils/ui-utils";
import {UIEvent} from "../resources/utils/ui-event";
import * as _ from 'lodash';
import * as moment from 'moment';

@autoinject()
export class DgForm {
  constructor(public element: Element) { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  attached() {
    setTimeout(() => {
      let data = [];
      for (let i = 0; i < 200; i++)
        data.push({
          id: i + 1,
          icon: Math.floor(Math.random() * 5),
          text: this.getString(),
          date: moment().add(Math.random() * -7200, 'day').toISOString(),
          number: parseFloat((Math.random() * 10800).toFixed(2)),
          currency: parseFloat((Math.random() * 10800).toFixed(2))
        });
      this.store = new UILocalDS(data, { recordsPerPage: 10 });

      this.store.loadPage(0);
    }, 500);
  }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  getString() {
    let ret = '', ar = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');
    for (let i = 0; i < (Math.random() * 8) + 3; i++) ret += ar[Math.floor(Math.random() * 26)];
    ret += ' ';
    for (let i = 0; i < (Math.random() * 8) + 3; i++) ret += ar[Math.floor(Math.random() * 26)];
    return ret;
  }

  icons = ['icon-moon-appleinc', 'icon-moon-android', 'icon-moon-amazon', 'icon-moon-windows8', 'icon-moon-mobile'];
  titles = ['Apple', 'Android', 'Amazon', 'Windows', 'Unknown']

  store;
  record = null;

  clicked(msg, rec) {
    UIUtils.toast({ title: msg, message: `${rec.id} - ${rec.text}`, theme: 'info' });
    return true;
  }
}
