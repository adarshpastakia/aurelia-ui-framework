//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, transient } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { UIApplication } from "./ui-application";
import { UIConstants } from "./ui-constants";

@autoinject()
export class UIHttpService {
  private logger;

  constructor(public httpClient: HttpClient,
    public app: UIApplication,
    public eventAggregator: EventAggregator) {

    this.logger = getLogger('UIHttpService');
    this.logger.info('Initialized');

    let self = this;
    httpClient.configure(
      config => {
        config
          .withBaseUrl(UIConstants.Http.BaseUrl)
          //.withDefaults({})
          .withInterceptor({
            request(request) {
              self.logger.info(`Requesting ${request.method} ${request.url}`);
              return request;
            },
            response(response) {
              self.logger.info(`Response ${response.status} ${response.url}`);

              if (response instanceof TypeError) {
                return Promise.reject({
                  errorCode: response.status || '0xFFFF',
                  message: response['message'] || response.statusText || 'Network Error!!'
                });
              }

              // publish unauthorised event only if the requesting url is from the baseUrl,
              // for any external url return 401 ignore
              if (response.status == 401 && ~response.url.indexOf(self.httpClient.baseUrl)) {
                eventAggregator.publish('auf:unauthorized', null);
              }
              else if (response.status >= 400) {
                return response.text()
                  .then(resp => {
                    let json: any = {};
                    try {
                      json = JSON.parse(resp);
                    } catch (e) { }
                    const errorCode = json.errorCode || json.error || '0xFFFF';
                    const message = json.message || json.error || 'Network Error!!';
                    return Promise.reject({ errorCode, message });
                  });
              }
              return response;
            }
          });
      });
  }

  setBaseUrl(url) {
    this.httpClient.baseUrl = url;
  }

  buildQueryString(json) {
    if (!json) return '';
    return '?' + Object.keys(json)
      .map(k => escape(k) + "=" + escape(typeof json[k] === 'object' ? JSON.stringify(json[k]) : json[k]))
      .join('&');
  }

  //**** REST METHODS ****//
  //DEPRECATED: Bacward compatibility
  get(slug: string, headers: any = true): Promise<any | string | void> {
    return this.json(slug, headers);
  }

  json(slug: string, query: any = null, headers: any = true): Promise<any | string | void> {
    this.logger.info(`get [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query),
      {
        method: 'get',
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  text(slug: string, query: any = null, headers: any = false): Promise<any | string | void> {
    this.logger.info(`text [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query),
      {
        method: 'get',
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => resp.text());
  }

  blob(slug: string, query: any = null, headers: any = false): Promise<any | string | void> {
    this.logger.info(`text [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query),
      {
        method: 'get',
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => resp.blob());
  }

  patch(slug: string, body, headers: any = true): Promise<any | string | void> {
    this.logger.info(`patch [${slug}]`);
    return this.httpClient
      .fetch(slug,
      {
        method: 'patch',
        body: json(body),
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  put(slug: string, body, headers: any = true): Promise<any | string | void> {
    this.logger.info(`put [${slug}]`);
    return this.httpClient
      .fetch(slug,
      {
        method: 'put',
        body: json(body),
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  post(slug: string, body, headers: any = true): Promise<any | string | void> {
    this.logger.info(`post [${slug}]`);
    return this.httpClient
      .fetch(slug,
      {
        method: 'post',
        body: json(body),
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  delete(slug: string, headers: any = true): Promise<any | string | void> {
    this.logger.info(`delete [${slug}]`);
    return this.httpClient
      .fetch(slug,
      {
        method: 'delete',
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  upload(slug: string, form: HTMLFormElement, headers: any = true): Promise<any | string | void> {
    this.logger.info(`upload [${slug}]`);
    return this.__upload('post', slug, form, headers);
  }

  reupload(slug: string, form: HTMLFormElement, headers: any = true): Promise<any | string | void> {
    this.logger.info(`reupload [${slug}]`);
    return this.__upload('put', slug, form, headers);
  }

  private __upload(method: string, slug: string, form: HTMLFormElement, headers?) {
    var data = new FormData();
    for (var i = 0, q = (form.querySelectorAll('input') as NodeListOf<HTMLInputElement>); i < q.length; i++) {
      if (q[i].type == 'file') {
        let files = q[i]['draggedFiles'] || q[i].files;
        for (var x = 0; x < files.length; x++) {
          data.append(q[i].name || ('file' + (i + 1) + (x + 1)), (files[x].file || files[x]), files[x].name);
        }
      }
      else {
        data.append(q[i].name || ('input' + (i + 1)), q[i].value);
      }
    }
    return this.httpClient
      .fetch(slug,
      {
        method: method,
        body: data,
        mode: 'cors',
        headers: this.__getHeaders(headers)
      })
      .then(resp => this.__getResponse(resp));
  }

  private __getResponse(response) {
    if (response.status === 204) return null;
    return response.text().then(function(text) {
      try {
        return JSON.parse(text);
      }
      catch (e) {
        return {};
      }
    });
  }

  private __getHeaders(override = true) {
    var headers = {
      'X-Requested-With': 'Fetch',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    Object.assign(headers, UIConstants.Http.Headers || {});

    if (override !== false) {
      if (typeof UIConstants.Http.AuthorizationHeader === 'function')
        Object.assign(headers, UIConstants.Http.AuthorizationHeader() || {});
      if (typeof UIConstants.Http.AuthorizationHeader === 'object')
        Object.assign(headers, UIConstants.Http.AuthorizationHeader || {});
    }
    if (typeof override == 'object') {
      Object.assign(headers, override || {});
    }
    return headers;
  }
}
