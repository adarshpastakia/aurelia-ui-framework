System.register(["aurelia-framework", "aurelia-logging", "aurelia-fetch-client", "aurelia-event-aggregator", "./ui-application", "./ui-constants"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, aurelia_logging_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, ui_application_1, ui_constants_1, UIHttpService;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (aurelia_fetch_client_1_1) {
                aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (ui_application_1_1) {
                ui_application_1 = ui_application_1_1;
            },
            function (ui_constants_1_1) {
                ui_constants_1 = ui_constants_1_1;
            }
        ],
        execute: function () {
            UIHttpService = (function () {
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
                                    throw Error(response['message']);
                                }
                                if (response.status == 401 && ~response.url.indexOf(self.httpClient.baseUrl)) {
                                    eventAggregator.publish('auf:unauthorized', null);
                                }
                                else if (response.status >= 400) {
                                    return response.text()
                                        .then(function (resp) {
                                        var json = {};
                                        var error = 'Network Error!!';
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
                            requestError: function (error) {
                                if (error !== null)
                                    throw Error(error.message);
                                return error;
                            },
                            responseError: function (error) {
                                if (error !== null)
                                    throw Error(error.message);
                                return error;
                            }
                        });
                    });
                }
                UIHttpService.prototype.setBaseUrl = function (url) {
                    this.httpClient.baseUrl = url;
                };
                UIHttpService.buildQueryString = function (json) {
                    return Object.keys(json)
                        .map(function (k) { return escape(k) + "=" + escape(json[k]); })
                        .join('&');
                };
                UIHttpService.prototype.get = function (slug, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = true; }
                    this.logger.info("get [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'get',
                        mode: 'cors',
                        headers: this.__getHeaders(headers)
                    })
                        .then(function (resp) { return _this.__getResponse(resp); });
                };
                UIHttpService.prototype.text = function (slug, headers) {
                    if (headers === void 0) { headers = true; }
                    this.logger.info("text [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'get',
                        mode: 'cors',
                        headers: this.__getHeaders(headers)
                    })
                        .then(function (resp) { return resp.text(); });
                };
                UIHttpService.prototype.blob = function (slug, headers) {
                    if (headers === void 0) { headers = true; }
                    this.logger.info("text [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'get',
                        mode: 'cors',
                        headers: this.__getHeaders(headers)
                    })
                        .then(function (resp) { return resp.blob(); });
                };
                UIHttpService.prototype.patch = function (slug, obj, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = true; }
                    this.logger.info("patch [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'patch',
                        body: aurelia_fetch_client_1.json(obj),
                        mode: 'cors',
                        headers: this.__getHeaders(headers)
                    })
                        .then(function (resp) { return _this.__getResponse(resp); });
                };
                UIHttpService.prototype.put = function (slug, obj, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = true; }
                    this.logger.info("put [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'put',
                        body: aurelia_fetch_client_1.json(obj),
                        mode: 'cors',
                        headers: this.__getHeaders(headers)
                    })
                        .then(function (resp) { return _this.__getResponse(resp); });
                };
                UIHttpService.prototype.post = function (slug, obj, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = true; }
                    this.logger.info("post [" + slug + "]");
                    return this.httpClient
                        .fetch(slug, {
                        method: 'post',
                        body: aurelia_fetch_client_1.json(obj),
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
                    if (override !== false && ui_constants_1.UIConstants.Http.AuthorizationHeader && !isEmpty(this.app.AuthUser)) {
                        var token = this.app.AuthUser + ":" + this.app.AuthToken;
                        var hash = btoa(token);
                        headers['Authorization'] = "Basic " + hash;
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
            exports_1("UIHttpService", UIHttpService);
        }
    };
});
