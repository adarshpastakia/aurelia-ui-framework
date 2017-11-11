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
                            return Promise.reject({ errorCode: '0xFFFF', message: response['message'] });
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
                                var message = json.message || json.error || '0xFFFF';
                                var errorCode = json.errorCode || json.error || 'Network Error!!';
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
        UIHttpService.buildQueryString = function (json) {
            return Object.keys(json)
                .map(function (k) { return escape(k) + "=" + escape(json[k]); })
                .join('&');
        };
        UIHttpService.prototype.get = function (slug, headers) {
            if (headers === void 0) { headers = true; }
            return this.json(slug, headers);
        };
        UIHttpService.prototype.json = function (slug, headers) {
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
            if (headers === void 0) { headers = false; }
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
            if (headers === void 0) { headers = false; }
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
    exports.UIHttpService = UIHttpService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUc7YUFDbkMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDBCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztZQUV2RCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLDBCQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7Z0JBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDN0MsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQixDQUFDO1FBdk5VLGFBQWE7WUFEekIsOEJBQVUsRUFBRTs2Q0FJb0IsaUNBQVU7Z0JBQzNCLDhCQUFhO2dCQUNELDBDQUFlO1dBTDlCLGFBQWEsQ0F3TnpCO1FBQUQsb0JBQUM7S0F4TkQsQUF3TkMsSUFBQTtJQXhOWSxzQ0FBYSIsImZpbGUiOiJ1dGlscy91aS1odHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgdHJhbnNpZW50IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiYXVyZWxpYS1sb2dnaW5nXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCI7XG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tIFwiYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yXCI7XG5pbXBvcnQgeyBVSUFwcGxpY2F0aW9uIH0gZnJvbSBcIi4vdWktYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFVJQ29uc3RhbnRzIH0gZnJvbSBcIi4vdWktY29uc3RhbnRzXCI7XG5cbkBhdXRvaW5qZWN0KClcbmV4cG9ydCBjbGFzcyBVSUh0dHBTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBsb2dnZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgcHVibGljIGFwcDogVUlBcHBsaWNhdGlvbixcbiAgICBwdWJsaWMgZXZlbnRBZ2dyZWdhdG9yOiBFdmVudEFnZ3JlZ2F0b3IpIHtcblxuICAgIHRoaXMubG9nZ2VyID0gZ2V0TG9nZ2VyKCdVSUh0dHBTZXJ2aWNlJyk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6ZWQnKTtcblxuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBodHRwQ2xpZW50LmNvbmZpZ3VyZShcbiAgICAgIGNvbmZpZyA9PiB7XG4gICAgICAgIGNvbmZpZ1xuICAgICAgICAgIC53aXRoQmFzZVVybChVSUNvbnN0YW50cy5IdHRwLkJhc2VVcmwpXG4gICAgICAgICAgLy8ud2l0aERlZmF1bHRzKHt9KVxuICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIHNlbGYubG9nZ2VyLmluZm8oYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgc2VsZi5sb2dnZXIuaW5mbyhgUmVzcG9uc2UgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh7IGVycm9yQ29kZTogJzB4RkZGRicsIG1lc3NhZ2U6IHJlc3BvbnNlWydtZXNzYWdlJ10gfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09IDQwMSAmJiB+cmVzcG9uc2UudXJsLmluZGV4T2Yoc2VsZi5odHRwQ2xpZW50LmJhc2VVcmwpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goJ2F1Zjp1bmF1dGhvcml6ZWQnLCBudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxuICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBqc29uOiBhbnkgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShyZXNwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBqc29uLm1lc3NhZ2UgfHwganNvbi5lcnJvciB8fCAnMHhGRkZGJztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0ganNvbi5lcnJvckNvZGUgfHwganNvbi5lcnJvciB8fCAnTmV0d29yayBFcnJvciEhJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHsgZXJyb3JDb2RlLCBtZXNzYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBzZXRCYXNlVXJsKHVybCkge1xuICAgIHRoaXMuaHR0cENsaWVudC5iYXNlVXJsID0gdXJsO1xuICB9XG5cbiAgc3RhdGljIGJ1aWxkUXVlcnlTdHJpbmcoanNvbikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhqc29uKVxuICAgICAgLm1hcChrID0+IGVzY2FwZShrKSArIFwiPVwiICsgZXNjYXBlKGpzb25ba10pKVxuICAgICAgLmpvaW4oJyYnKTtcbiAgfVxuXG4gIC8vKioqKiBTSEFSRUQgTUVUSE9EUyAqKioqLy9cbiAgLy9ERVBSRUNBVEVEOiBCYWN3YXJkIGNvbXBhdGliaWxpdHlcbiAgZ2V0KHNsdWc6IHN0cmluZywgaGVhZGVyczogYW55ID0gdHJ1ZSk6IFByb21pc2U8YW55IHwgc3RyaW5nIHwgdm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmpzb24oc2x1ZywgaGVhZGVycyk7XG4gIH1cblxuICBqc29uKHNsdWc6IHN0cmluZywgaGVhZGVyczogYW55ID0gdHJ1ZSk6IFByb21pc2U8YW55IHwgc3RyaW5nIHwgdm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYGdldCBbJHtzbHVnfV1gKTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAuZmV0Y2goc2x1ZyxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9fZ2V0SGVhZGVycyhoZWFkZXJzKVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3AgPT4gdGhpcy5fX2dldFJlc3BvbnNlKHJlc3ApKTtcbiAgfVxuXG4gIHRleHQoc2x1Zzogc3RyaW5nLCBoZWFkZXJzOiBhbnkgPSBmYWxzZSk6IFByb21pc2U8YW55IHwgc3RyaW5nIHwgdm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYHRleHQgWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmZldGNoKHNsdWcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fX2dldEhlYWRlcnMoaGVhZGVycylcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwID0+IHJlc3AudGV4dCgpKTtcbiAgfVxuXG4gIGJsb2Ioc2x1Zzogc3RyaW5nLCBoZWFkZXJzOiBhbnkgPSBmYWxzZSk6IFByb21pc2U8YW55IHwgc3RyaW5nIHwgdm9pZD4ge1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYHRleHQgWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmZldGNoKHNsdWcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fX2dldEhlYWRlcnMoaGVhZGVycylcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwID0+IHJlc3AuYmxvYigpKTtcbiAgfVxuXG4gIHBhdGNoKHNsdWc6IHN0cmluZywgb2JqLCBoZWFkZXJzOiBhbnkgPSB0cnVlKTogUHJvbWlzZTxhbnkgfCBzdHJpbmcgfCB2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgcGF0Y2ggWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmZldGNoKHNsdWcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ3BhdGNoJyxcbiAgICAgICAgYm9keToganNvbihvYmopLFxuICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX19nZXRIZWFkZXJzKGhlYWRlcnMpXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmVzcCA9PiB0aGlzLl9fZ2V0UmVzcG9uc2UocmVzcCkpO1xuICB9XG5cbiAgcHV0KHNsdWc6IHN0cmluZywgb2JqLCBoZWFkZXJzOiBhbnkgPSB0cnVlKTogUHJvbWlzZTxhbnkgfCBzdHJpbmcgfCB2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgcHV0IFske3NsdWd9XWApO1xuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5mZXRjaChzbHVnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6ICdwdXQnLFxuICAgICAgICBib2R5OiBqc29uKG9iaiksXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fX2dldEhlYWRlcnMoaGVhZGVycylcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwID0+IHRoaXMuX19nZXRSZXNwb25zZShyZXNwKSk7XG4gIH1cblxuICBwb3N0KHNsdWc6IHN0cmluZywgb2JqLCBoZWFkZXJzOiBhbnkgPSB0cnVlKTogUHJvbWlzZTxhbnkgfCBzdHJpbmcgfCB2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgcG9zdCBbJHtzbHVnfV1gKTtcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50XG4gICAgICAuZmV0Y2goc2x1ZyxcbiAgICAgIHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIGJvZHk6IGpzb24ob2JqKSxcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9fZ2V0SGVhZGVycyhoZWFkZXJzKVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3AgPT4gdGhpcy5fX2dldFJlc3BvbnNlKHJlc3ApKTtcbiAgfVxuXG4gIGRlbGV0ZShzbHVnOiBzdHJpbmcsIGhlYWRlcnM6IGFueSA9IHRydWUpOiBQcm9taXNlPGFueSB8IHN0cmluZyB8IHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKGBkZWxldGUgWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudFxuICAgICAgLmZldGNoKHNsdWcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogJ2RlbGV0ZScsXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5fX2dldEhlYWRlcnMoaGVhZGVycylcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXNwID0+IHRoaXMuX19nZXRSZXNwb25zZShyZXNwKSk7XG4gIH1cblxuICB1cGxvYWQoc2x1Zzogc3RyaW5nLCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsIGhlYWRlcnM6IGFueSA9IHRydWUpOiBQcm9taXNlPGFueSB8IHN0cmluZyB8IHZvaWQ+IHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKGB1cGxvYWQgWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuX191cGxvYWQoJ3Bvc3QnLCBzbHVnLCBmb3JtLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHJldXBsb2FkKHNsdWc6IHN0cmluZywgZm9ybTogSFRNTEZvcm1FbGVtZW50LCBoZWFkZXJzOiBhbnkgPSB0cnVlKTogUHJvbWlzZTxhbnkgfCBzdHJpbmcgfCB2b2lkPiB7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgcmV1cGxvYWQgWyR7c2x1Z31dYCk7XG4gICAgcmV0dXJuIHRoaXMuX191cGxvYWQoJ3B1dCcsIHNsdWcsIGZvcm0sIGhlYWRlcnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfX3VwbG9hZChtZXRob2Q6IHN0cmluZywgc2x1Zzogc3RyaW5nLCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQsIGhlYWRlcnM/KSB7XG4gICAgdmFyIGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgcSA9IChmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50Pik7IGkgPCBxLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocVtpXS50eXBlID09ICdmaWxlJykge1xuICAgICAgICBsZXQgZmlsZXMgPSBxW2ldWydkcmFnZ2VkRmlsZXMnXSB8fCBxW2ldLmZpbGVzO1xuICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IGZpbGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgZGF0YS5hcHBlbmQocVtpXS5uYW1lIHx8ICgnZmlsZScgKyAoaSArIDEpICsgKHggKyAxKSksIChmaWxlc1t4XS5maWxlIHx8IGZpbGVzW3hdKSwgZmlsZXNbeF0ubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkYXRhLmFwcGVuZChxW2ldLm5hbWUgfHwgKCdpbnB1dCcgKyAoaSArIDEpKSwgcVtpXS52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnRcbiAgICAgIC5mZXRjaChzbHVnLFxuICAgICAge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgYm9keTogZGF0YSxcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9fZ2V0SGVhZGVycyhoZWFkZXJzKVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3AgPT4gdGhpcy5fX2dldFJlc3BvbnNlKHJlc3ApKTtcbiAgfVxuXG4gIHByaXZhdGUgX19nZXRSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKS50aGVuKGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dldEhlYWRlcnMob3ZlcnJpZGUgPSB0cnVlKSB7XG4gICAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCcsXG4gICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJ1xuICAgIH07XG4gICAgT2JqZWN0LmFzc2lnbihoZWFkZXJzLCBVSUNvbnN0YW50cy5IdHRwLkhlYWRlcnMgfHwge30pO1xuXG4gICAgaWYgKG92ZXJyaWRlICE9PSBmYWxzZSAmJiBVSUNvbnN0YW50cy5IdHRwLkF1dGhvcml6YXRpb25IZWFkZXIgJiYgIWlzRW1wdHkodGhpcy5hcHAuQXV0aFVzZXIpKSB7XG4gICAgICB2YXIgdG9rZW4gPSB0aGlzLmFwcC5BdXRoVXNlciArIFwiOlwiICsgdGhpcy5hcHAuQXV0aFRva2VuO1xuICAgICAgdmFyIGhhc2ggPSBidG9hKHRva2VuKTtcbiAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IFwiQmFzaWMgXCIgKyBoYXNoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG92ZXJyaWRlID09ICdvYmplY3QnKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGhlYWRlcnMsIG92ZXJyaWRlIHx8IHt9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
