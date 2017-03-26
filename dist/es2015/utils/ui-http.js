var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { UIApplication } from "./ui-application";
import { UIConstants } from "./ui-constants";
let UIHttpService = class UIHttpService {
    constructor(httpClient, app, eventAggregator) {
        this.httpClient = httpClient;
        this.app = app;
        this.eventAggregator = eventAggregator;
        this.logger = getLogger('UIHttpService');
        this.logger.info('Initialized');
        let self = this;
        httpClient.configure(config => {
            config
                .withBaseUrl(UIConstants.Http.BaseUrl)
                .withInterceptor({
                request(request) {
                    self.logger.info(`Requesting ${request.method} ${request.url}`);
                    return request;
                },
                response(response) {
                    self.logger.info(`Response ${response.status} ${response.url}`);
                    if (response instanceof TypeError) {
                        throw Error(response['message']);
                    }
                    if (response.status == 401) {
                        eventAggregator.publish('auf:unauthorized', null);
                    }
                    else if (response.status >= 400) {
                        return response.text()
                            .then(resp => {
                            let json = {};
                            let error = 'Network Error!!';
                            try {
                                json = JSON.parse(resp);
                            }
                            catch (e) { }
                            if (json.message)
                                error = json.message;
                            else if (json.error)
                                error = json.error;
                            else if (response.statusText)
                                error = response.statusText;
                            if (error)
                                throw new Error(error);
                            return null;
                        });
                    }
                    return response;
                },
                requestError(error) {
                    if (error !== null)
                        throw Error(error.message);
                    return error;
                },
                responseError(error) {
                    if (error !== null)
                        throw Error(error.message);
                    return error;
                }
            });
        });
    }
    setBaseUrl(url) {
        this.httpClient.baseUrl = url;
    }
    get(slug, basicAuth = true) {
        this.logger.info(`get [${slug}]`);
        return this.httpClient
            .fetch(slug, {
            method: 'get',
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.json());
    }
    text(slug, basicAuth = true) {
        this.logger.info(`text [${slug}]`);
        return this.httpClient
            .fetch(slug, {
            method: 'get',
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.text());
    }
    put(slug, obj, basicAuth = true) {
        this.logger.info(`put [${slug}]`);
        return this.httpClient
            .fetch(slug, {
            method: 'put',
            body: json(obj),
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.json());
    }
    post(slug, obj, basicAuth = true) {
        this.logger.info(`post [${slug}]`);
        return this.httpClient
            .fetch(slug, {
            method: 'post',
            body: json(obj),
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.json());
    }
    delete(slug, basicAuth = true) {
        this.logger.info(`delete [${slug}]`);
        return this.httpClient
            .fetch(slug, {
            method: 'delete',
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.json());
    }
    upload(slug, form, basicAuth = true) {
        this.logger.info(`upload [${slug}]`);
        return this.__upload('post', slug, form);
    }
    reupload(slug, form, basicAuth = true) {
        this.logger.info(`reupload [${slug}]`);
        return this.__upload('put', slug, form);
    }
    __upload(method, slug, form, basicAuth) {
        var data = new FormData();
        for (var i = 0, q = form.querySelectorAll('input'); i < q.length; i++) {
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
            .fetch(slug, {
            method: method,
            body: data,
            mode: 'cors',
            headers: this.__getHeaders(basicAuth)
        })
            .then(resp => resp.json());
    }
    __getHeaders(basic = true) {
        var headers = {
            'X-Requested-With': 'Fetch',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        Object.assign(headers, UIConstants.Http.Headers || {});
        if (basic && UIConstants.Http.AuthorizationHeader && !isEmpty(this.app.AuthUser)) {
            var token = this.app.AuthUser + ":" + this.app.AuthToken;
            var hash = btoa(token);
            headers['Authorization'] = "Basic " + hash;
        }
        return headers;
    }
};
UIHttpService = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [HttpClient,
        UIApplication,
        EventAggregator])
], UIHttpService);
export { UIHttpService };
