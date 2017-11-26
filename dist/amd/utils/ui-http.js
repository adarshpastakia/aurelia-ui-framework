var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-logging", "aurelia-fetch-client", "aurelia-event-aggregator", "./ui-application", "./ui-constants"], function (require, exports, aurelia_framework_1, aurelia_logging_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, ui_application_1, ui_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIHttpService = (function () {
        function UIHttpService(httpClient, app, eventAggregator) {
            this.httpClient = httpClient;
            this.app = app;
            this.eventAggregator = eventAggregator;
            this.logger = aurelia_logging_1.getLogger('UIHttpService');
            this.logger.info('Initialized');
            var self = this;
            httpClient.configure(function (config) {
                config
                    .withBaseUrl(ui_constants_1.UIConstants.Http.BaseUrl)
                    .withInterceptor({
                    request: function (request) {
                        self.logger.info("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        self.logger.info("Response " + response.status + " " + response.url);
                        if (response instanceof TypeError) {
                            return Promise.reject({
                                errorCode: response.status || '0xFFFF',
                                message: response['message'] || response.statusText || 'Network Error!!'
                            });
                        }
                        if (response.status == 401 && ~response.url.indexOf(self.httpClient.baseUrl)) {
                            eventAggregator.publish('auf:unauthorized', null);
                        }
                        else if (response.status >= 400) {
                            return response.text()
                                .then(function (resp) {
                                var json = {};
                                try {
                                    json = JSON.parse(resp);
                                }
                                catch (e) { }
                                var errorCode = json.errorCode || json.error || '0xFFFF';
                                var message = json.message || json.error || 'Network Error!!';
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
        UIHttpService.prototype.buildQueryString = function (json) {
            if (!json)
                return '';
            return '?' + Object.keys(json)
                .map(function (k) { return escape(k) + "=" + escape(typeof json[k] === 'object' ? JSON.stringify(json[k]) : json[k]); })
                .join('&');
        };
        UIHttpService.prototype.get = function (slug, headers) {
            if (headers === void 0) { headers = true; }
            return this.json(slug, headers);
        };
        UIHttpService.prototype.json = function (slug, query, headers) {
            var _this = this;
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = true; }
            this.logger.info("get [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.text = function (slug, query, headers) {
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return resp.text(); });
        };
        UIHttpService.prototype.blob = function (slug, query, headers) {
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return resp.blob(); });
        };
        UIHttpService.prototype.patch = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("patch [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'patch',
                body: aurelia_fetch_client_1.json(body),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.put = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("put [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'put',
                body: aurelia_fetch_client_1.json(body),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.post = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("post [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'post',
                body: aurelia_fetch_client_1.json(body),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.delete = function (slug, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("delete [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'delete',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.upload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("upload [" + slug + "]");
            return this.__upload('post', slug, form, headers);
        };
        UIHttpService.prototype.reupload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("reupload [" + slug + "]");
            return this.__upload('put', slug, form, headers);
        };
        UIHttpService.prototype.__upload = function (method, slug, form, headers) {
            var _this = this;
            var data = new FormData();
            for (var i = 0, q = form.querySelectorAll('input'); i < q.length; i++) {
                if (q[i].type == 'file') {
                    var files = q[i]['draggedFiles'] || q[i].files;
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
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.__getResponse = function (response) {
            if (response.status === 204)
                return null;
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
                'X-Requested-With': 'Fetch',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };
            Object.assign(headers, ui_constants_1.UIConstants.Http.Headers || {});
            if (override !== false) {
                if (typeof ui_constants_1.UIConstants.Http.AuthorizationHeader === 'function')
                    Object.assign(headers, ui_constants_1.UIConstants.Http.AuthorizationHeader() || {});
                if (typeof ui_constants_1.UIConstants.Http.AuthorizationHeader === 'object')
                    Object.assign(headers, ui_constants_1.UIConstants.Http.AuthorizationHeader || {});
            }
            if (typeof override == 'object') {
                Object.assign(headers, override || {});
            }
            return headers;
        };
        UIHttpService = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient,
                ui_application_1.UIApplication,
                aurelia_event_aggregator_1.EventAggregator])
        ], UIHttpService);
        return UIHttpService;
    }());
    exports.UIHttpService = UIHttpService;
});
