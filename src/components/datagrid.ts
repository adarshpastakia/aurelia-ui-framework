//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UILocalDS} from "../resources/data/ui-data-source";
import {UIUtils} from "../resources/utils/ui-utils";
import * as moment from 'moment';

@autoinject()
export class CompDatagrid {
  datagrid;
  grid;
  constructor(public element: Element) { 
    
  }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  bind(bindingContext) {
    this.grid = this.datagrid.au.controller.viewModel;
    let subdata = [];
    let lv2subdata = [];
    for (let i = 0; i < 10; i++)
      lv2subdata.push({
        id: i + 1,
        icon: Math.floor(Math.random() * 5),
        text: this.getString(),
        date: moment().add(Math.random() * -7200, 'day'),
        time: moment().add(Math.random() * -(60 * 20), 'minute'),
        number: Math.random() * 10800,
        currency: Math.random() * 10800
      });
    for (let i = 0; i < 10; i++)
      subdata.push({
        id: i + 1,
        icon: Math.floor(Math.random() * 5),
        text: this.getString(),
        date: moment().add(Math.random() * -7200, 'day'),
        time: moment().add(Math.random() * -(60 * 20), 'minute'),
        number: Math.random() * 10800,
        currency: Math.random() * 10800,
        subdata:lv2subdata
      });
    
    for (let i = 0; i < 500; i++)
      this.data.push({
        id: i + 1,
        icon: Math.floor(Math.random() * 5),
        text: this.getString(),
        date: moment().add(Math.random() * -7200, 'day'),
        time: moment().add(Math.random() * -(60 * 20), 'minute'),
        number: Math.random() * 10800,
        currency: Math.random() * 10800,
        subdata: subdata
      });
    this.store = new UILocalDS(this.data, { recordsPerPage: 10 });
  }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  icons = ['icon-moon-appleinc', 'icon-moon-android', 'icon-moon-amazon', 'icon-moon-windows8', 'icon-moon-mobile'];
  titles = ['Apple', 'Android', 'Amazon', 'Windows', 'Unknown']

  selected(rec) {
    UIUtils.toast({ title: 'Row Click', message: `${rec.id} - ${rec.text}`, theme: 'info' });
  }
  getString() {
    let ret = '', ar = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');
    for (let i = 0; i < (Math.random() * 8) + 3; i++) ret += ar[Math.floor(Math.random() * 26)];
    ret += ' ';
    for (let i = 0; i < (Math.random() * 8) + 3; i++) ret += ar[Math.floor(Math.random() * 26)];
    return ret;
  }

  store;
  data = []

  clicked(msg, rec) {
    UIUtils.toast({ title: msg, message: `${rec.id} - ${rec.text}`, theme: 'info' });
    return true;
  }

  edit(){
    this.grid.setEditMode(this.grid.selected);
  }
  save(){
     console.log(this.grid.getChanges());
     UIUtils.toast({ title: 'Changes', message: 'See console for changes', theme: 'info' });
     this.grid.commit();
  }
  undo(){
    UIUtils.toast({ title: 'Undo', message: 'Changes have been reverted!', theme: 'info' });
    this.grid.undoChanges()
  }
}
