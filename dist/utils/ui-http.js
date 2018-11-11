/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, json } from "aurelia-fetch-client";
import { autoinject } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { UIAppConfig } from "./ui-app-config";
import { UIInternal } from "./ui-internal";
var UIHttpService = /** @class */ (function () {
    function UIHttpService(httpClient, appConfig) {
        this.httpClient = httpClient;
        this.appConfig = appConfig;
        this.logger = getLogger("UIHttpService");
        this.logger.info("Initialized");
        httpClient.configure(function (config) {
            config.withBaseUrl(appConfig.ApiBaseUrl).withInterceptor({
                request: function (request) {
                    this.logger.info("Requesting " + request.method + " " + request.url);
                    return request;
                },
                response: function (response) {
                    var _this = this;
                    this.logger.info("Response " + response.status + " " + response.url);
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
                    }
                    else if (response.status >= 400) {
                        return response.text().then(function (resp) {
                            var body = {};
                            try {
                                body = JSON.parse(resp);
                            }
                            catch (e) {
                                _this.logger.debug(e.stack);
                            }
                            var errorCode = body.errorCode || body.error || "500";
                            var message = body.message || body.error || "Network Error!!";
                            return Promise.reject({ errorCode: errorCode, message: message });
                        });
                    }
                    return response;
                }
            });
        });
    }
    UIHttpService.prototype.setBaseUrl = function (url) {
        this.httpClient.baseUrl = url;
    };
    // **** REST METHODS **** //
    UIHttpService.prototype.json = function (slug, query, headers) {
        var _this = this;
        if (query === void 0) { query = null; }
        if (headers === void 0) { headers = true; }
        this.logger.info("get [" + slug + "]");
        return this.httpClient
            .fetch(slug + this.buildQueryString(query), {
            headers: this.__getHeaders(headers),
            method: "get",
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.text = function (slug, query, headers) {
        if (query === void 0) { query = null; }
        if (headers === void 0) { headers = false; }
        this.logger.info("text [" + slug + "]");
        return this.httpClient
            .fetch(slug + this.buildQueryString(query), {
            headers: this.__getHeaders(headers),
            method: "get",
            mode: "cors"
        })
            .then(function (resp) { return resp.text(); });
    };
    UIHttpService.prototype.blob = function (slug, query, headers) {
        if (query === void 0) { query = null; }
        if (headers === void 0) { headers = false; }
        this.logger.info("text [" + slug + "]");
        return this.httpClient
            .fetch(slug + this.buildQueryString(query), {
            headers: this.__getHeaders(headers),
            method: "get",
            mode: "cors"
        })
            .then(function (resp) { return resp.blob(); });
    };
    UIHttpService.prototype.patch = function (slug, body, headers) {
        var _this = this;
        if (headers === void 0) { headers = true; }
        this.logger.info("patch [" + slug + "]");
        return this.httpClient
            .fetch(slug, {
            body: json(body),
            headers: this.__getHeaders(headers),
            method: "patch",
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.put = function (slug, body, headers) {
        var _this = this;
        if (headers === void 0) { headers = true; }
        this.logger.info("put [" + slug + "]");
        return this.httpClient
            .fetch(slug, {
            body: json(body),
            headers: this.__getHeaders(headers),
            method: "put",
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.post = function (slug, body, headers) {
        var _this = this;
        if (headers === void 0) { headers = true; }
        this.logger.info("post [" + slug + "]");
        return this.httpClient
            .fetch(slug, {
            body: json(body),
            headers: this.__getHeaders(headers),
            method: "post",
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.delete = function (slug, headers) {
        var _this = this;
        if (headers === void 0) { headers = true; }
        this.logger.info("delete [" + slug + "]");
        return this.httpClient
            .fetch(slug, {
            headers: this.__getHeaders(headers),
            method: "delete",
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.upload = function (slug, form, headers) {
        if (headers === void 0) { headers = true; }
        this.logger.info("upload [" + slug + "]");
        return this.__upload("post", slug, form, headers);
    };
    UIHttpService.prototype.reupload = function (slug, form, headers) {
        if (headers === void 0) { headers = true; }
        this.logger.info("reupload [" + slug + "]");
        return this.__upload("put", slug, form, headers);
    };
    UIHttpService.prototype.buildQueryString = function (query) {
        if (!query) {
            return "";
        }
        return ("?" +
            Object.keys(query)
                .map(function (k) { return escape(k) + "=" + escape(isObject(query[k]) ? JSON.stringify(query[k]) : query[k]); })
                .join("&"));
    };
    UIHttpService.prototype.__upload = function (method, slug, form, headers) {
        var _this = this;
        var body = new FormData();
        for (var i = 0, q = form.querySelectorAll("input"); i < q.length; i++) {
            if (q[i].type === "file") {
                // tslint:disable no-string-literal
                var files = q[i]["draggedFiles"] || q[i].files;
                for (var x = 0; x < files.length; x++) {
                    body.append(q[i].name || "file" + (i + 1) + (x + 1), files[x].file || files[x], files[x].name);
                }
            }
            else {
                body.append(q[i].name || "input" + (i + 1), q[i].value);
            }
        }
        return this.httpClient
            .fetch(slug, {
            body: body,
            headers: this.__getHeaders(headers),
            method: method,
            mode: "cors"
        })
            .then(function (resp) { return _this.__getResponse(resp); });
    };
    UIHttpService.prototype.__getResponse = function (response) {
        if (response.status === 204) {
            return null;
        }
        return response.text().then(function (text) {
            try {
                return JSON.parse(text);
            }
            catch (e) {
                return {};
            }
        });
    };
    UIHttpService.prototype.__getHeaders = function (override) {
        if (override === void 0) { override = true; }
        var headers = {
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
    };
    UIHttpService = __decorate([
        autoinject(),
        __metadata("design:paramtypes", [HttpClient, UIAppConfig])
    ], UIHttpService);
    return UIHttpService;
}());
export { UIHttpService };
