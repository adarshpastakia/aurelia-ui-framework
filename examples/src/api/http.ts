//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIApplication, UIConstants } from 'aurelia-ui-framework';

@autoinject()
export class HttpService {
  constructor(public app: UIApplication, public httpClient: UIHttpService) { }

  wiki;
  source;
  attached() {
    this.httpClient.text('docs/api/http.md').then(md => this.wiki = md);
    this.httpClient.text('docs/api/http.example.md').then(md => this.source = md);
  }

  token;
  fetching = 0;
  baseUrl = 'https://mern-todo.herokuapp.com/api';

  authPassed;
  authResponse;
  testAuthenticator(bad) {
    this.fetching = bad ? 1 : 2;
    const body = {
      username: 'user@email.com',
      password: 'password'
    }
    this.httpClient.post(`${this.baseUrl}/login`, bad ? {} : body)
      .then(r => {
        this.token = r.token;
        this.authPassed = true;
        this.authResponse = r;
        this.fetching = 0;
      }).catch(e => {
        console.log(e);
        this.authPassed = false;
        this.authResponse = e;
        this.fetching = 0;
      });
  }

  usersPassed;
  usersResponse;
  testUsers(bad) {
    this.fetching = bad ? 3 : 4;
    UIConstants.Http.AuthorizationHeader = !bad;

    this.httpClient.get(`${this.baseUrl}/users`)
      .then(r => {
        this.usersPassed = true;
        this.usersResponse = r;
        this.fetching = 0;
      }).catch(e => {
        this.usersPassed = false;
        this.usersResponse = e;
        this.fetching = 0;
      });
  }

  userPassed;
  userResponse;
  testUser(bad) {
    this.fetching = bad === 0 ? 5 : bad ? 6 : 7;
    UIConstants.Http.AuthorizationHeader = bad !== true;

    this.httpClient.get(`${this.baseUrl}/users${bad === 0 ? 'ss' : ''}/3`)
      .then(r => {
        this.userPassed = true;
        this.userResponse = r;
        this.fetching = 0;
      }).catch(e => {
        this.userPassed = false;
        this.userResponse = e;
        this.fetching = 0;
      });
  }
}
