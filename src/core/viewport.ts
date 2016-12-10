// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import * as kramed from "kramed";

@autoinject()
export class CoreViewport {
  constructor(public httpClient: HttpClient) { }

  // md = '';
  // canActivate() {
  //   return this.httpClient.fetch('/docs/core/viewport.md')
  //     .then(resp => resp.text())
  //     .then(resp => this.md = resp);
  // }
  // 
  // markup(md) {
  //   return kramed(md);
  // }
}