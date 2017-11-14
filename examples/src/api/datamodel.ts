//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIDataModel, serializable } from 'aurelia-ui-framework';

@autoinject()
export class DataModel {
  constructor(public httpClient: UIHttpService) { }

  model = new MyModel();

  wiki;
  source;
  attached() {
    // this.httpClient.text('docs/api/http.md').then(md => this.wiki = md);
    // this.httpClient.text('docs/api/http.example.md').then(md => this.source = md);
  }
}


class MyModel extends UIDataModel {
  @serializable() firstName;
  @serializable() lastName;
  @serializable() address1;
  @serializable() address2;
  @serializable() city;
  @serializable() country;
  @serializable() email;
  @serializable() phone;

  apiUrl = 't';
}
