/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { HttpClient, json } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { UIAppConfig } from "./ui-app-config";
import { UIInternal } from "./ui-internal";

@autoinject()
export class UIHttpService {
  private logger;

  constructor(public httpClient: HttpClient, private appConfig: UIAppConfig) {
    this.logger = getLogger("UIHttpService");
    this.logger.info("Initialized");

    httpClient.configure(config => {
      config.withBaseUrl(appConfig.ApiBaseUrl).withInterceptor({
        request(request) {
          this.logger.info(`Requesting ${request.method} ${request.url}`);
          return request;
        },
        response(response) {
          this.logger.info(`Response ${response.status} ${response.url}`);

          if (response instanceof TypeError) {
            return Promise.reject({
              errorCode: "500",
              message: response.message || "Network Error!!"
            });
          }

          // publish unauthorised event only if the requesting url is from the baseUrl,
          // for any external url return 401 ignore
          if (response.status === 401 && response.url.includes(this.httpClient.baseUrl)) {
            UIInternal.broadcast("auf:unauthorized", null);
          } else if (response.status >= 400) {
            return response.text().then(resp => {
              let body: AnyObject = {};
              try {
                body = JSON.parse(resp);
              } catch (e) {
                this.logger.debug(e.stack);
              }
              const errorCode = body.errorCode || body.error || "500";
              const message = body.message || body.error || "Network Error!!";
              return Promise.reject({ errorCode, message });
            });
          }
          return response;
        }
      });
    });
  }

  public setBaseUrl(url) {
    this.httpClient.baseUrl = url;
  }

  // **** REST METHODS **** //
  public json(
    slug: string,
    query: KeyValue = null,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`get [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query), {
        headers: this.__getHeaders(headers),
        method: "get",
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  public text(
    slug: string,
    query: KeyValue = null,
    headers: KeyValue | boolean = false
  ): Promise<string | void> {
    this.logger.info(`text [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query), {
        headers: this.__getHeaders(headers),
        method: "get",
        mode: "cors"
      })
      .then(resp => resp.text());
  }

  public blob(
    slug: string,
    query: KeyValue = null,
    headers: KeyValue | boolean = false
  ): Promise<AnyObject | void> {
    this.logger.info(`text [${slug}]`);
    return this.httpClient
      .fetch(slug + this.buildQueryString(query), {
        headers: this.__getHeaders(headers),
        method: "get",
        mode: "cors"
      })
      .then(resp => resp.blob());
  }

  public patch(
    slug: string,
    body,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`patch [${slug}]`);
    return this.httpClient
      .fetch(slug, {
        body: json(body),
        headers: this.__getHeaders(headers),
        method: "patch",
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  public put(
    slug: string,
    body,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`put [${slug}]`);
    return this.httpClient
      .fetch(slug, {
        body: json(body),
        headers: this.__getHeaders(headers),
        method: "put",
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  public post(
    slug: string,
    body,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`post [${slug}]`);
    return this.httpClient
      .fetch(slug, {
        body: json(body),
        headers: this.__getHeaders(headers),
        method: "post",
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  public delete(
    slug: string,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`delete [${slug}]`);
    return this.httpClient
      .fetch(slug, {
        headers: this.__getHeaders(headers),
        method: "delete",
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  public upload(
    slug: string,
    form: HTMLFormElement,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`upload [${slug}]`);
    return this.__upload("post", slug, form, headers);
  }

  public reupload(
    slug: string,
    form: HTMLFormElement,
    headers: KeyValue | boolean = true
  ): Promise<KeyValue[] | KeyValue | void> {
    this.logger.info(`reupload [${slug}]`);
    return this.__upload("put", slug, form, headers);
  }

  private buildQueryString(query) {
    if (!query) {
      return "";
    }
    return (
      "?" +
      Object.keys(query)
        .map(
          k => escape(k) + "=" + escape(isObject(query[k]) ? JSON.stringify(query[k]) : query[k])
        )
        .join("&")
    );
  }

  private __upload(method: string, slug: string, form: HTMLFormElement, headers?) {
    const body = new FormData();
    for (
      let i = 0, q = form.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
      i < q.length;
      i++
    ) {
      if (q[i].type === "file") {
        // tslint:disable no-string-literal
        const files = q[i]["draggedFiles"] || q[i].files;
        for (let x = 0; x < files.length; x++) {
          body.append(
            q[i].name || "file" + (i + 1) + (x + 1),
            files[x].file || files[x],
            files[x].name
          );
        }
      } else {
        body.append(q[i].name || "input" + (i + 1), q[i].value);
      }
    }
    return this.httpClient
      .fetch(slug, {
        body,
        headers: this.__getHeaders(headers),
        method,
        mode: "cors"
      })
      .then(resp => this.__getResponse(resp));
  }

  private __getResponse(response) {
    if (response.status === 204) {
      return null;
    }
    return response.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (e) {
        return {};
      }
    });
  }

  private __getHeaders(override: KeyValue | boolean = true) {
    const headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "Fetch"
    };
    Object.assign(headers, this.appConfig.ApiHeaders || {});

    if (override !== false) {
      if (isFunction(this.appConfig.AuthorizationHeader)) {
        Object.assign(headers, this.appConfig.AuthorizationHeader() || {});
      }
      if (isObject(this.appConfig.AuthorizationHeader)) {
        Object.assign(headers, this.appConfig.AuthorizationHeader || {});
      }
    }
    if (isObject(override)) {
      Object.assign(headers, override || {});
    }
    return headers;
  }
}
