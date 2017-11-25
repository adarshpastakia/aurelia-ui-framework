//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIDataModel, serializable } from 'aurelia-ui-framework';
import * as _ from "lodash";

@autoinject()
export class DataModel {
  constructor(public httpClient: UIHttpService) { }

  model = new MyModel();

  wiki;
  source;
  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();
  attached() {
    // this.httpClient.text('docs/api/http.md').then(md => this.wiki = md);
    this.httpClient.text('docs/api/datamodel.example.md').then(md => this.source = md);
  }
}


class MyModel extends UIDataModel {
  @serializable() firstName;
  @serializable() lastName;
  @serializable() dob;
  @serializable() age;
  @serializable() address1;
  @serializable() address2;
  @serializable() city;
  @serializable() country;
  @serializable() email;
  @serializable() phone;

  apiSlug = 't';
}
