define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/app',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(app) {
            this.app = app;
            this.constants = aurelia_ui_framework_1.UIConstants;
            this.hideTitle = false;
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = aurelia_ui_framework_1.UIConstants.Title;
            config.mapUnknownRoutes('src/home/unknown');
            config.map([
                {
                    route: ['', 'home'], moduleId: './home/view', nav: false, auth: false, name: 'home'
                }, {
                    route: '404', moduleId: './home/unknown', nav: false, auth: false, name: '404'
                }, {
                    route: 'start', moduleId: './start/view', title: 'Getting Started', nav: true, auth: false, name: 'start', settings: { section: '' }
                }, {
                    route: 'examples', moduleId: './samples/home', title: 'Examples', nav: true, auth: false, name: 'examples', settings: { section: '' }
                }, {
                    route: 'examples:dashboard', moduleId: './samples/dashboard/view', title: 'Dashboard Example', nav: false, auth: false, name: 'examples:dashboard', settings: { section: '' }
                }, {
                    route: 'examples:desktop', moduleId: './samples/desktop/view', title: 'Desktop Example', nav: false, auth: false, name: 'examples:desktop', settings: { section: '' }
                }, {
                    route: 'styles/*path', moduleId: './styles/view', title: 'Styling', nav: false, auth: false, name: 'styles'
                }, {
                    route: 'styles:home', redirect: 'styles/home', title: 'Overview', nav: true, auth: false, settings: { section: 'Styling' }, name: 'styles:home'
                }, {
                    route: 'styles:typo', redirect: 'styles/typo', title: 'Typography', nav: true, auth: false, settings: { section: 'Styling' }, name: 'styles:typo'
                }, {
                    route: 'styles:glyphs', redirect: 'styles/glyphs', title: 'SVG Gylphs', nav: true, auth: false, settings: { section: 'Styling' }, name: 'styles:glyphs'
                }, {
                    route: 'styles:flags', redirect: 'styles/flags', title: 'Flag Icons', nav: true, auth: false, settings: { section: 'Styling' }, name: 'styles:flags'
                }, {
                    route: 'styles:colors', redirect: 'styles/colors', title: 'Color Charts', nav: true, auth: false, settings: { section: 'Styling' }, name: 'styles:colors'
                }, {
                    route: 'viewport', moduleId: './core/viewport', title: 'Viewport', nav: true, auth: false, settings: { section: 'Core' }, name: 'core:viewport'
                }, {
                    route: 'page', moduleId: './core/page', title: 'Page', nav: true, auth: false, settings: { section: 'Core' }, name: 'core:page'
                }, {
                    route: 'grid', moduleId: './core/grid', title: 'Responsive Grid', nav: true, auth: false, settings: { section: 'Core' }, name: 'core:grid'
                }, {
                    route: 'buttons', moduleId: './inputs/buttons', title: 'Buttons', nav: true, auth: false, settings: { section: 'Inputs' }, name: 'inputs:buttons'
                }, {
                    route: 'text', moduleId: './inputs/inputs', title: 'Textual Inputs', nav: true, auth: false, settings: { section: 'Inputs' }, name: 'inputs:text'
                }, {
                    route: 'lists', moduleId: './inputs/lists', title: 'Lists & Selects', nav: true, auth: false, settings: { section: 'Inputs', disabled: true }, name: 'inputs:lists'
                }, {
                    route: 'datetime', moduleId: './inputs/dates', title: 'Date/Time', nav: true, auth: false, settings: { section: 'Inputs' }, name: 'inputs:datetime'
                }, {
                    route: 'options', moduleId: './inputs/options', title: 'Options & Switches', nav: true, auth: false, settings: { section: 'Inputs' }, name: 'inputs:options'
                }, {
                    route: 'content', moduleId: './inputs/content', title: 'Content Editor', nav: true, auth: false, settings: { section: 'Inputs' }, name: 'inputs:content'
                }, {
                    route: 'validation', moduleId: './inputs/validation', title: 'Validations', nav: true, auth: false, settings: { section: 'Inputs', disabled: true }, name: 'inputs:validation'
                }, {
                    route: 'drawer', moduleId: './components/drawer', title: 'Drawer', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:buttons'
                }, {
                    route: 'sidebar', moduleId: './components/sidebar', title: 'Sidebar', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:buttons'
                }, {
                    route: 'menu', moduleId: './components/menu', title: 'Menus', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:menu'
                }, {
                    route: 'toolbar', moduleId: './components/toolbar', title: 'Toolbar', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:toolbar'
                }, {
                    route: 'statsbar', moduleId: './components/statsbar', title: 'Statsbar', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:statsbar'
                }, {
                    route: 'panels', moduleId: './components/panel', title: 'Panel/Cards', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:panels'
                }, {
                    route: 'tabs', moduleId: './components/tabpanel', title: 'Tab Panel', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:tabs'
                }, {
                    route: 'tree', moduleId: './components/tree', title: 'Tree Panel', nav: true, auth: false, settings: { section: 'Components', disabled: true }, name: 'comps:tree'
                }, {
                    route: 'datagrid', moduleId: './components/datagrid', title: 'Datagrid', nav: true, auth: false, settings: { section: 'Components', disabled: true }, name: 'comps:datagrid'
                }, {
                    route: 'indicators', moduleId: './components/indicators', title: 'Breadcrumbs & Chips', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:indicators'
                }, {
                    route: 'dialogs', moduleId: './components/dialogs', title: 'Dialogs', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:dialogs'
                }, {
                    route: 'alerts', moduleId: './components/alerts', title: 'Alerts & Toasts', nav: true, auth: false, settings: { section: 'Components' }, name: 'comps:alerts'
                }, {
                    route: 'api/*path', moduleId: './api/view', title: 'API Classes', nav: false, auth: false, name: 'api'
                }, , {
                    route: 'api:application', redirect: 'api/application', title: 'Application', nav: true, auth: false, settings: { section: 'API Classes' }, name: 'api:application'
                }, {
                    route: 'api:http', redirect: 'api/http', title: 'Http Client', nav: true, auth: false, settings: { section: 'API Classes' }, name: 'api:http'
                }, {
                    route: 'event', redirect: 'api/event', title: 'Event Manager', nav: true, auth: false, settings: { section: 'API Classes' }, name: 'api:event'
                }, {
                    route: 'api:datamodel', redirect: 'api/datamodel', title: 'Data Model', nav: true, auth: false, settings: { section: 'API Classes' }, name: 'api:datamodel'
                }, {
                    route: 'api:datasource', redirect: 'api/datasource', title: 'Data Source', nav: true, auth: false, settings: { section: 'API Classes', disabled: true }, name: 'api:datasource'
                }
            ]);
        };
        App.prototype.activate = function () {
            var _this = this;
            aurelia_ui_framework_1.UIEvent.subscribe('hidetitle', function (b) { return _this.hideTitle = b; });
        };
        App = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIApplication])
        ], App);
        return App;
    }());
    exports.App = App;
});



define('src/main',["require", "exports", "aurelia-ui-framework", "../environment", "highlightjs"], function (require, exports, aurelia_ui_framework_1, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .plugin('aurelia-ui-framework', function (config) {
            aurelia_ui_framework_1.UIConstants['themes'] = 'light,muted,dark,primary,secondary,info,danger,success,warning';
            aurelia_ui_framework_1.UIConstants['colors'] = 'red,pink,violet,purple,indigo,blue,cyan,teal,green,lime,yellow,amber,orange,brown,lightGray,darkGray';
        })
            .plugin('aurelia-animator-css')
            .plugin('aurelia-validation')
            .feature('./src/resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/api/application',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = (function () {
        function Application(httpClient) {
            this.httpClient = httpClient;
        }
        Application.prototype.attached = function () {
            var _this = this;
            this.httpClient.text('docs/api/application.md').then(function (md) { return _this.basicUsage.innerHTML = _this.container.renderHtml(md); });
        };
        Application = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Application);
        return Application;
    }());
    exports.Application = Application;
});



var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/api/datamodel',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataModel = (function () {
        function DataModel(httpClient) {
            this.httpClient = httpClient;
            this.model = new MyModel();
        }
        DataModel.prototype.attached = function () {
            var _this = this;
            this.httpClient.text('docs/api/datamodel.example.md').then(function (md) { return _this.source = md; });
        };
        DataModel = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], DataModel);
        return DataModel;
    }());
    exports.DataModel = DataModel;
    var MyModel = (function (_super) {
        __extends(MyModel, _super);
        function MyModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.apiUrl = 't';
            return _this;
        }
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "firstName", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "lastName", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "dob", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "age", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "address1", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "address2", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "city", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "country", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "email", void 0);
        __decorate([
            aurelia_ui_framework_1.serializable(),
            __metadata("design:type", Object)
        ], MyModel.prototype, "phone", void 0);
        return MyModel;
    }(aurelia_ui_framework_1.UIDataModel));
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/api/event',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventManager = (function () {
        function EventManager(httpClient) {
            this.httpClient = httpClient;
        }
        EventManager.prototype.attached = function () {
            var _this = this;
            this.httpClient.text('docs/api/event.md').then(function (md) { return _this.basicUsage.innerHTML = _this.container.renderHtml(md); });
        };
        EventManager = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], EventManager);
        return EventManager;
    }());
    exports.EventManager = EventManager;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/api/http',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HttpService = (function () {
        function HttpService(app, httpClient) {
            this.app = app;
            this.httpClient = httpClient;
            this.fetching = 0;
            this.baseUrl = 'https://mern-todo.herokuapp.com/api';
        }
        HttpService.prototype.attached = function () {
            var _this = this;
            this.httpClient.text('docs/api/http.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/api/http.example.md').then(function (md) { return _this.source = md; });
        };
        HttpService.prototype.testAuthenticator = function (bad) {
            var _this = this;
            this.fetching = bad ? 1 : 2;
            var body = {
                username: 'user@email.com',
                password: 'password'
            };
            this.httpClient.post(this.baseUrl + "/login", bad ? {} : body)
                .then(function (r) {
                _this.app.AuthUser = 'user@email.com';
                _this.token = _this.app.AuthToken = r.token;
                _this.authPassed = true;
                _this.authResponse = r;
                _this.fetching = 0;
            }).catch(function (e) {
                console.log(e);
                _this.authPassed = false;
                _this.authResponse = e;
                _this.fetching = 0;
            });
        };
        HttpService.prototype.testUsers = function (bad) {
            var _this = this;
            this.fetching = bad ? 3 : 4;
            aurelia_ui_framework_1.UIConstants.Http.AuthorizationHeader = !bad;
            this.httpClient.get(this.baseUrl + "/users")
                .then(function (r) {
                _this.usersPassed = true;
                _this.usersResponse = r;
                _this.fetching = 0;
            }).catch(function (e) {
                _this.usersPassed = false;
                _this.usersResponse = e;
                _this.fetching = 0;
            });
        };
        HttpService.prototype.testUser = function (bad) {
            var _this = this;
            this.fetching = bad === 0 ? 5 : bad ? 6 : 7;
            aurelia_ui_framework_1.UIConstants.Http.AuthorizationHeader = bad !== true;
            this.httpClient.get(this.baseUrl + "/users" + (bad === 0 ? 'ss' : '') + "/3")
                .then(function (r) {
                _this.userPassed = true;
                _this.userResponse = r;
                _this.fetching = 0;
            }).catch(function (e) {
                _this.userPassed = false;
                _this.userResponse = e;
                _this.fetching = 0;
            });
        };
        HttpService = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIApplication, aurelia_ui_framework_1.UIHttpService])
        ], HttpService);
        return HttpService;
    }());
    exports.HttpService = HttpService;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/api/view',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiView = (function () {
        function ApiView() {
        }
        ApiView.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                {
                    route: 'application',
                    moduleId: './application',
                    title: 'Application',
                    nav: true,
                    auth: false,
                    name: 'application'
                }, {
                    route: 'http',
                    moduleId: './http',
                    title: 'Http Service',
                    nav: true,
                    auth: false,
                    name: 'http'
                }, {
                    route: 'event',
                    moduleId: './event',
                    title: 'Event Management',
                    nav: true,
                    auth: false,
                    name: 'event'
                }, {
                    route: 'datamodel',
                    moduleId: './datamodel',
                    title: 'Data Model',
                    nav: true,
                    auth: false,
                    name: 'datamodel'
                }, {
                    route: 'datasource',
                    moduleId: './datasource',
                    title: 'Data Source',
                    settings: { disabled: true },
                    nav: true,
                    auth: false,
                    name: 'datasource'
                }
            ]);
        };
        ApiView = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], ApiView);
        return ApiView;
    }());
    exports.ApiView = ApiView;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/core/grid',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Grid = (function () {
        function Grid(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Grid.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/core/grid.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/core/grid.example.md').then(function (md) { return _this.source = md; });
        };
        Grid = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Grid);
        return Grid;
    }());
    exports.Grid = Grid;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/core/page',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = (function () {
        function Page(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Page.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/core/page.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/core/page.example.md').then(function (md) { return _this.source = md; });
        };
        Page = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Page);
        return Page;
    }());
    exports.Page = Page;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/core/viewport',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Viewport = (function () {
        function Viewport(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Viewport.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/core/viewport.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/core/viewport.example.md').then(function (md) { return _this.source = md; });
        };
        Viewport = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Viewport);
        return Viewport;
    }());
    exports.Viewport = Viewport;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('src/home/unknown',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var View404 = (function () {
        function View404() {
        }
        View404 = __decorate([
            aurelia_framework_1.inlineView("<template><div class=\"page-404 ui-container\">\n  <h1 class=\"ui-display-1\">TODO</h1>\n  <h6 class=\"ui-text-muted ui-font-big\">Due to work schedule certain sections are pending...will get to it soon</h6>\n  <hr/><a href=\"javascript:history.back()\" class=\"ui-font-large\">&laquo; Go back</a>\n  </div></template>")
        ], View404);
        return View404;
    }());
    exports.View404 = View404;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/home/view',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Home = (function () {
        function Home(router) {
            this.router = router;
            this.titleHidden = true;
        }
        Home.prototype.activate = function () {
            aurelia_ui_framework_1.UIEvent.broadcast('hidetitle', true);
        };
        Home.prototype.hideTitle = function (b) {
            if (this.titleHidden != b)
                aurelia_ui_framework_1.UIEvent.broadcast('hidetitle', this.titleHidden = b);
        };
        Home = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_router_1.Router])
        ], Home);
        return Home;
    }());
    exports.Home = Home;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/alerts',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Drawer = (function () {
        function Drawer(app, httpClient) {
            this.app = app;
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
            this.toast = {
                title: 'Toast!!',
                message: 'Sample toast message...',
                theme: 'dark',
                timeout: 5000,
                glyph: 'glyph-alert-info'
            };
            this.alert = {
                title: 'Alert!!',
                message: 'Sample alert message...',
                okLabel: 'OK',
                cancelLabel: 'Cancel',
                glyph: 'glyph-alert-info'
            };
        }
        Drawer.prototype.activate = function () {
        };
        Drawer.prototype.inlineToast = function () {
            this.app.toast(Object.assign({ container: this.alertHolder }, this.toast));
        };
        Drawer.prototype.toastAlert = function () {
            this.app.toast(this.toast);
        };
        Drawer.prototype.openAlert = function () {
            var _this = this;
            this.app.alert(this.alert)
                .then(function (b) { return _this.app.toast({ theme: 'info', message: 'Alert Closed!!' }); });
        };
        Drawer.prototype.openConfirm = function () {
            var _this = this;
            this.app.confirm(this.alert)
                .then(function (b) { return _this.app.toast({ theme: b ? 'success' : 'danger', message: b ? "That's Correct!!" : "That's Wrong!!" }); });
        };
        Drawer.prototype.openPrompt = function () {
            var _this = this;
            this.app.prompt(this.alert)
                .then(function (b) { return _this.app.toast({ theme: b ? 'success' : 'danger', message: b ? "That's Correct!!" : "That's Wrong!!" }); });
        };
        Drawer = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIApplication, aurelia_ui_framework_1.UIHttpService])
        ], Drawer);
        return Drawer;
    }());
    exports.Drawer = Drawer;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/dialogs',["require", "exports", "aurelia-framework", "aurelia-ui-framework", "./dlg-view"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1, dlg_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CompDialogs = (function () {
        function CompDialogs(dlgService) {
            this.dlgService = dlgService;
            this.dir = "ltr";
        }
        CompDialogs.prototype.attached = function () {
            this.obDir = aurelia_ui_framework_1.UIEvent.observe(this, 'dir', this.dirChanged.bind(this));
        };
        CompDialogs.prototype.detached = function () {
            this.obDir.dispose();
        };
        CompDialogs.prototype.printConsole = function (tag, event) {
            this.evtConsole.innerHTML = "<div><span class=\"time\">" + new Date().toLocaleString() + "</span>:<span class=\"tag\">" + tag + "</span> - <span class=\"event\">" + event + "</span></div>" + this.evtConsole.innerHTML;
        };
        CompDialogs.prototype.openDialog = function (modal) {
            var _this = this;
            this.dlgService.show(dlg_view_1.DlgView, { modal: modal, printConsole: function () {
                    var rest = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        rest[_i] = arguments[_i];
                    }
                    return _this.printConsole.apply(_this, rest);
                } });
        };
        CompDialogs.prototype.dirChanged = function (evt) {
            document.querySelector('.ui-dialog-container')['dir'] = evt;
        };
        CompDialogs = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIDialogService])
        ], CompDialogs);
        return CompDialogs;
    }());
    exports.CompDialogs = CompDialogs;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/dlg-lifecycle',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DlgLifecycle = (function () {
        function DlgLifecycle(element) {
            this.element = element;
        }
        DlgLifecycle.prototype.created = function () { aurelia_ui_framework_1.UIEvent.fireEvent('lifecycle', this.element, 'created'); };
        DlgLifecycle.prototype.bind = function (bindingContext) { aurelia_ui_framework_1.UIEvent.fireEvent('lifecycle', this.element, 'bind'); };
        DlgLifecycle.prototype.attached = function () { aurelia_ui_framework_1.UIEvent.fireEvent('lifecycle', this.element, 'attached'); };
        DlgLifecycle.prototype.detached = function () { aurelia_ui_framework_1.UIEvent.fireEvent('lifecycle', this.element, 'detached'); };
        DlgLifecycle.prototype.unbind = function () { aurelia_ui_framework_1.UIEvent.fireEvent('lifecycle', this.element, 'unbind'); };
        DlgLifecycle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template><div class="ui-bg-info ui-pad-all">Lifecycle tester injected</div></template>'),
            __metadata("design:paramtypes", [Element])
        ], DlgLifecycle);
        return DlgLifecycle;
    }());
    exports.DlgLifecycle = DlgLifecycle;
});



var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/dlg-view',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DlgView = (function (_super) {
        __extends(DlgView, _super);
        function DlgView() {
            var _this = _super.call(this) || this;
            _this.id = "dialogView";
            _this.title = "Simple Dialog";
            _this.glyph = "icon-fill-document";
            _this.width = "600px";
            _this.height = "400px";
            return _this;
        }
        DlgView.prototype.canActivate = function (model) {
            this.modal = model.modal;
            this.printConsole = model.printConsole;
            this.printConsole(this.id, 'canActivate');
            return true;
        };
        DlgView.prototype.created = function () { this.printConsole(this.id, 'created'); };
        DlgView.prototype.activate = function (model) {
            this.printConsole(this.id, 'activate');
            return true;
        };
        DlgView.prototype.bind = function (bindingContext) { this.printConsole(this.id, 'bind'); _super.prototype.bind.call(this); };
        DlgView.prototype.attached = function () { this.printConsole(this.id, 'attached'); };
        DlgView.prototype.detached = function () { this.printConsole(this.id, 'detached'); };
        DlgView.prototype.unbind = function () { this.printConsole(this.id, 'unbind'); };
        DlgView.prototype.canDeactivate = function () { this.printConsole(this.id, 'canDeactivate'); return true; };
        DlgView.prototype.deactivate = function () { this.printConsole(this.id, 'deactivate'); };
        DlgView = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], DlgView);
        return DlgView;
    }(aurelia_ui_framework_1.UIDialog));
    exports.DlgView = DlgView;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/drawer',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Drawer = (function () {
        function Drawer(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Drawer.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/drawer.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/drawer.example.md').then(function (md) { return _this.source = md; });
        };
        Drawer = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Drawer);
        return Drawer;
    }());
    exports.Drawer = Drawer;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/indicators',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Indicators = (function () {
        function Indicators(httpClient) {
            this.httpClient = httpClient;
            this.themes = aurelia_ui_framework_1.UIConstants['themes'].split(',');
            this.colors = aurelia_ui_framework_1.UIConstants['colors'].split(',');
            this.crumbs = ['Personal Info', 'Shipping Info', 'Payment Info', 'Agreement'];
            this.wiki = '';
            this.source = '';
        }
        Indicators.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/indicators.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/indicators.example.md').then(function (md) { return _this.source = md; });
        };
        Indicators = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Indicators);
        return Indicators;
    }());
    exports.Indicators = Indicators;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/menu',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Menu = (function () {
        function Menu(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Menu.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/menu.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/menu.example.md').then(function (md) { return _this.source = md; });
        };
        Menu = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Menu);
        return Menu;
    }());
    exports.Menu = Menu;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/panel',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Menu = (function () {
        function Menu(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Menu.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/panel.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/panel.example.md').then(function (md) { return _this.source = md; });
        };
        Menu = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Menu);
        return Menu;
    }());
    exports.Menu = Menu;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/sidebar',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sidebar = (function () {
        function Sidebar(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Sidebar.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/sidebar.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/sidebar.example.md').then(function (md) { return _this.source = md; });
        };
        Sidebar = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Sidebar);
        return Sidebar;
    }());
    exports.Sidebar = Sidebar;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/statsbar',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Statsbar = (function () {
        function Statsbar(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Statsbar.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/statsbar.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/statsbar.example.md').then(function (md) { return _this.source = md; });
        };
        Statsbar = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Statsbar);
        return Statsbar;
    }());
    exports.Statsbar = Statsbar;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/tabpanel',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TabPanel = (function () {
        function TabPanel(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        TabPanel.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/tabpanel.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/tabpanel.example.md').then(function (md) { return _this.source = md; });
        };
        TabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], TabPanel);
        return TabPanel;
    }());
    exports.TabPanel = TabPanel;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/components/toolbar',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Toolbar = (function () {
        function Toolbar(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
        }
        Toolbar.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/components/toolbar.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/components/toolbar.example.md').then(function (md) { return _this.source = md; });
        };
        Toolbar = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Toolbar);
        return Toolbar;
    }());
    exports.Toolbar = Toolbar;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/buttons',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Buttons = (function () {
        function Buttons(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
            this.themes = aurelia_ui_framework_1.UIConstants['themes'].split(',');
            this.colors = aurelia_ui_framework_1.UIConstants['colors'].split(',');
        }
        Buttons.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/inputs/button.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/inputs/button.example.md').then(function (md) { return _this.source = md; });
        };
        Buttons = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Buttons);
        return Buttons;
    }());
    exports.Buttons = Buttons;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/content',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputContent = (function () {
        function InputContent() {
            this.dir = 'ltr';
            this.plain = '';
            this.language = '';
            this.md = "\n\n\n##### I _Love_ ~~HTML~~ __Markdown__!\n\n---\n\nI can be __BOLD__, I can also be _ITALIC_, or you can ~~DELETE~~ me too!\n\nLook at me I'm a list\n\n-\tItem\n-\tItem\n-\tItem\n\nAnd I'm numbered\n\n1.\tItem\n2.\tItem\n3.\tItem\n\nI can also be a link [Click Me](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) or show the whole url http://google.com\n\n![Image](examples/images/heart.png) Dont you just love images!\n";
            this.model = new DataModel();
            (this.model.languages['en'] = new LangModel()).description = "# English Content " + this.md;
        }
        InputContent.prototype.addLanguage = function (lang) {
            (this.model.languages[lang.id] = new LangModel()).description = "# " + lang.name + " Content " + this.md;
        };
        InputContent.prototype.removeLanguage = function (lang) {
            delete this.model.languages[lang.id];
        };
        InputContent = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], InputContent);
        return InputContent;
    }());
    exports.InputContent = InputContent;
    var DataModel = (function () {
        function DataModel() {
            this.title = '';
            this.languages = {};
        }
        return DataModel;
    }());
    exports.DataModel = DataModel;
    var LangModel = (function () {
        function LangModel() {
            this.summary = '';
            this.description = '';
        }
        return LangModel;
    }());
    exports.LangModel = LangModel;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/dates',["require", "exports", "aurelia-framework", "aurelia-ui-framework", "moment"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputDates = (function () {
        function InputDates(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
            this.minDate = moment().toISOString();
            this.date1 = moment().toISOString();
            this.date2 = moment().add(1, 'month').toISOString();
        }
        InputDates.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/inputs/dates.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/inputs/dates.example.md').then(function (md) { return _this.source = md; });
        };
        InputDates = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], InputDates);
        return InputDates;
    }());
    exports.InputDates = InputDates;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/inputs',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Inputs = (function () {
        function Inputs(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
            this.dis1 = true;
        }
        Inputs.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/inputs/form.md').then(function (mdForm) {
                _this.httpClient.text('docs/inputs/inputs.md').then(function (md) { return _this.wiki = mdForm + md; });
            });
            this.httpClient.text('docs/inputs/form.example.md').then(function (md) { return _this.source = md; });
        };
        Inputs.prototype.attached = function () {
            var _this = this;
            setTimeout(function () {
                _this.files.files = [
                    { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
                    { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' },
                    { file: '', name: 'Filename.txt', size: Math.random() * 100000, ext: 'txt' }
                ];
            }, 500);
        };
        Inputs = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Inputs);
        return Inputs;
    }());
    exports.Inputs = Inputs;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/options',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Buttons = (function () {
        function Buttons(httpClient) {
            this.httpClient = httpClient;
            this.wiki = '';
            this.source = '';
            this.themes = aurelia_ui_framework_1.UIConstants['themes'].split(',');
            this.colors = aurelia_ui_framework_1.UIConstants['colors'].split(',');
        }
        Buttons.prototype.activate = function () {
            var _this = this;
            this.themes.splice(0, 1);
            this.httpClient.text('docs/inputs/options.md').then(function (md) { return _this.wiki = md; });
            this.httpClient.text('docs/inputs/options.example.md').then(function (md) { return _this.source = md; });
        };
        Buttons = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], Buttons);
        return Buttons;
    }());
    exports.Buttons = Buttons;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/inputs/validation',["require", "exports", "aurelia-framework", "aurelia-validation", "lodash"], function (require, exports, aurelia_framework_1, aurelia_validation_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputValidation = (function () {
        function InputValidation(controller) {
            this.controller = controller;
            this.salutations = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];
            this.countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();
            this.model = new DataModel();
            this.controller.addObject(this.model);
        }
        InputValidation.prototype.detached = function () {
        };
        InputValidation.prototype.validate = function () {
            this.controller.validate();
        };
        InputValidation = __decorate([
            aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(aurelia_validation_1.ValidationController)),
            __metadata("design:paramtypes", [aurelia_validation_1.ValidationController])
        ], InputValidation);
        return InputValidation;
    }());
    exports.InputValidation = InputValidation;
    var DataModel = (function () {
        function DataModel() {
            this.salutation = '';
            this.firstName = '';
            this.lastName = '';
            this.latitude = '';
            this.longitude = '';
            this.address1 = '';
            this.address2 = '';
            this.city = '';
            this.state = '';
            this.country = 'us';
            this.phoneType = '';
            this.phone = '';
            this.email = '';
            this.hasSecondContact = false;
            this.secondContactType = 'home';
            this.secondContact = '';
            aurelia_validation_1.ValidationRules
                .ensure(function (m) { return m.firstName; })
                .required()
                .maxLength(99)
                .ensure(function (m) { return m.lastName; })
                .required()
                .maxLength(99)
                .ensure(function (m) { return m.latitude; })
                .satisfiesRule('decimal', -90, 90)
                .ensure(function (m) { return m.longitude; })
                .satisfiesRule('decimal', -180, 180)
                .ensure(function (m) { return m.address1; })
                .displayName('Address')
                .required()
                .ensure(function (m) { return m.city; })
                .required()
                .ensure(function (m) { return m.country; })
                .required()
                .ensure(function (m) { return m.email; })
                .required()
                .email()
                .ensure(function (m) { return m.salutation; })
                .required()
                .ensure(function (m) { return m.phoneType; })
                .required()
                .ensure(function (m) { return m.phone; })
                .required()
                .satisfiesRule('phone')
                .ensure(function (m) { return m.secondContact; })
                .required()
                .when(function (m) { return m.hasSecondContact; })
                .satisfiesRule('phone')
                .on(this);
        }
        return DataModel;
    }());
    exports.DataModel = DataModel;
});



define('src/resources/index',["require", "exports", "aurelia-pal"], function (require, exports, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/container'));
    }
    exports.configure = configure;
});



define('src/samples/home',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SamplesHome = (function () {
        function SamplesHome() {
        }
        return SamplesHome;
    }());
    exports.SamplesHome = SamplesHome;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/start/install',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StartInstall = (function () {
        function StartInstall(httpClient) {
            this.httpClient = httpClient;
        }
        StartInstall.prototype.attached = function () {
            var _this = this;
            this.httpClient.text('docs/start/install.md').then(function (md) { return _this.basicUsage.innerHTML = _this.container.renderHtml(md, false); });
        };
        StartInstall = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], StartInstall);
        return StartInstall;
    }());
    exports.StartInstall = StartInstall;
});



define('src/start/prereq',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StartPrereq = (function () {
        function StartPrereq() {
        }
        return StartPrereq;
    }());
    exports.StartPrereq = StartPrereq;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/start/view',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ApiView = (function () {
        function ApiView() {
        }
        ApiView.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                {
                    route: ['', 'prereq'],
                    moduleId: './prereq',
                    title: 'Required Knowledge',
                    nav: true,
                    auth: false,
                    name: 'prereq'
                }, {
                    route: 'install',
                    moduleId: './install',
                    title: 'Installation',
                    nav: true,
                    auth: false,
                    name: 'install'
                }, {
                    route: 'usage',
                    moduleId: '../home/unknown',
                    title: 'Usage',
                    nav: true,
                    auth: false,
                    name: 'usage'
                }, {
                    route: 'example',
                    moduleId: '../home/unknown',
                    title: 'Example',
                    nav: true,
                    auth: false,
                    name: 'example'
                }, {
                    route: 'i18n',
                    moduleId: '../home/unknown',
                    title: 'Using Aurelia I18N',
                    nav: true,
                    auth: false,
                    name: 'i18n'
                }
            ]);
        };
        ApiView = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], ApiView);
        return ApiView;
    }());
    exports.ApiView = ApiView;
});



define('src/styles/colors',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorChart = (function () {
        function ColorChart() {
            this.crayola = {
                "Red": "#ED0A3F",
                "Maroon": "#C32148",
                "Scarlet": "#FD0E35",
                "Brick Red": "#C62D42",
                "English Vermilion": "#CC474B",
                "Madder Lake": "#CC3336",
                "Permanent Geranium Lake": "#E12C2C",
                "Maximum Red": "#D92121",
                "Indian Red": "#B94E48",
                "Orange-Red": "#FF5349",
                "Sunset Orange": "#FE4C40",
                "Bittersweet": "#FE6F5E",
                "Dark Venetian Red": "#B33B24",
                "Venetian Red": "#CC553D",
                "Light Venetian Red": "#E6735C",
                "Vivid Tangerine": "#FF9980",
                "Middle Red": "#E58E73",
                "Burnt Orange": "#FF7F49",
                "Red-Orange": "#FF681F",
                "Orange": "#FF8833",
                "Macaroni and Cheese": "#FFB97B",
                "Middle Yellow Red": "#ECB176",
                "Mango Tango": "#E77200",
                "Yellow-Orange": "#FFAE42",
                "Maximum Yellow Red": "#F2BA49",
                "Banana Mania": "#FBE7B2",
                "Maize": "#F2C649",
                "Orange-Yellow": "#F8D568",
                "Goldenrod": "#FCD667",
                "Dandelion": "#FED85D",
                "Yellow": "#FBE870",
                "Green-Yellow": "#F1E788",
                "Middle Yellow": "#FFEB00",
                "Olive Green": "#B5B35C",
                "Spring Green": "#ECEBBD",
                "Maximum Yellow": "#FAFA37",
                "Canary": "#FFFF99",
                "Lemon Yellow": "#FFFF9F",
                "Maximum Green Yellow": "#D9E650",
                "Middle Green Yellow": "#ACBF60",
                "Inchworm": "#AFE313",
                "Light Chrome Green": "#BEE64B",
                "Yellow-Green": "#C5E17A",
                "Maximum Green": "#5E8C31",
                "Asparagus": "#7BA05B",
                "Granny Smith Apple": "#9DE093",
                "Fern": "#63B76C",
                "Middle Green": "#4D8C57",
                "Green": "#3AA655",
                "Medium Chrome Green": "#6CA67C",
                "Forest Green": "#5FA777",
                "Sea Green": "#93DFB8",
                "Shamrock": "#33CC99",
                "Mountain Meadow": "#1AB385",
                "Jungle Green": "#29AB87",
                "Caribbean Green": "#00CC99",
                "Tropical Rain Forest": "#00755E",
                "Middle Blue Green": "#8DD9CC",
                "Pine Green": "#01786F",
                "Maximum Blue Green": "#30BFBF",
                "Robin's Egg Blue": "#00CCCC",
                "Teal Blue": "#008080",
                "Light Blue": "#8FD8D8",
                "Aquamarine": "#95E0E8",
                "Turquoise Blue": "#6CDAE7",
                "Outer Space": "#2D383A",
                "Sky Blue": "#76D7EA",
                "Middle Blue": "#7ED4E6",
                "Blue-Green": "#0095B7",
                "Pacific Blue": "#009DC4",
                "Cerulean": "#02A4D3",
                "Maximum Blue": "#47ABCC",
                "Blue (I)": "#4997D0",
                "Cerulean Blue": "#339ACC",
                "Cornflower": "#93CCEA",
                "Green-Blue": "#2887C8",
                "Midnight Blue": "#00468C",
                "Navy Blue": "#0066CC",
                "Denim": "#1560BD",
                "Blue (III)": "#0066FF",
                "Cadet Blue": "#A9B2C3",
                "Periwinkle": "#C3CDE6",
                "Blue (II)": "#4570E6",
                "Wild Blue Yonder": "#7A89B8",
                "Indigo": "#4F69C6",
                "Manatee": "#8D90A1",
                "Cobalt Blue": "#8C90C8",
                "Celestial Blue": "#7070CC",
                "Blue Bell": "#9999CC",
                "Maximum Blue Purple": "#ACACE6",
                "Violet-Blue": "#766EC8",
                "Blue-Violet": "#6456B7",
                "Ultramarine Blue": "#3F26BF",
                "Middle Blue Purple": "#8B72BE",
                "Purple Heart": "#652DC1",
                "Royal Purple": "#6B3FA0",
                "Violet (II)": "#8359A3",
                "Medium Violet": "#8F47B3",
                "Wisteria": "#C9A0DC",
                "Lavender (I)": "#BF8FCC",
                "Vivid Violet": "#803790",
                "Maximum Purple": "#733380",
                "Purple Mountains' Majesty": "#D6AEDD",
                "Fuchsia": "#C154C1",
                "Pink Flamingo": "#FC74FD",
                "Violet (I)": "#732E6C",
                "Brilliant Rose": "#E667CE",
                "Orchid": "#E29CD2",
                "Plum": "#8E3179",
                "Medium Rose": "#D96CBE",
                "Thistle": "#EBB0D7",
                "Mulberry": "#C8509B",
                "Red-Violet": "#BB3385",
                "Middle Purple": "#D982B5",
                "Maximum Red Purple": "#A63A79",
                "Jazzberry Jam": "#A50B5E",
                "Eggplant": "#614051",
                "Magenta": "#F653A6",
                "Cerise": "#DA3287",
                "Wild Strawberry": "#FF3399",
                "Lavender (II)": "#FBAED2",
                "Cotton Candy": "#FFB7D5",
                "Carnation Pink": "#FFA6C9",
                "Violet-Red": "#F7468A",
                "Razzmatazz": "#E30B5C",
                "Pig Pink": "#FDD7E4",
                "Carmine": "#E62E6B",
                "Blush": "#DB5079",
                "Tickle Me Pink": "#FC80A5",
                "Mauvelous": "#F091A9",
                "Salmon": "#FF91A4",
                "Middle Red Purple": "#A55353",
                "Mahogany": "#CA3435",
                "Melon": "#FEBAAD",
                "Pink Sherbert": "#F7A38E",
                "Burnt Sienna": "#E97451",
                "Brown": "#AF593E",
                "Sepia": "#9E5B40",
                "Fuzzy Wuzzy": "#87421F",
                "Beaver": "#926F5B",
                "Tumbleweed": "#DEA681",
                "Raw Sienna": "#D27D46",
                "Van Dyke Brown": "#664228",
                "Tan": "#D99A6C",
                "Desert Sand": "#EDC9AF",
                "Peach": "#FFCBA4",
                "Burnt Umber": "#805533",
                "Apricot": "#FDD5B1",
                "Almond": "#EED9C4",
                "Raw Umber": "#665233",
                "Shadow": "#837050",
                "Raw Sienna (I)": "#E6BC5C",
                "Timberwolf": "#D9D6CF",
                "Gold (I)": "#92926E",
                "Gold (II)": "#E6BE8A",
                "Silver": "#C9C0BB",
                "Copper": "#DA8A67",
                "Antique Brass": "#C88A65",
                "Black": "#000000",
                "Charcoal Gray": "#736A62",
                "Gray": "#8B8680",
                "Blue-Gray": "#C8C8CD",
                "Radical Red": "#FF355E",
                "Wild Watermelon": "#FD5B78",
                "Outrageous Orange": "#FF6037",
                "Atomic Tangerine": "#FF9966",
                "Neon Carrot": "#FF9933",
                "Sunglow": "#FFCC33",
                "Laser Lemon": "#FFFF66",
                "Unmellow Yellow": "#FFFF66",
                "Electric Lime": "#CCFF00",
                "Screamin' Green": "#66FF66",
                "Magic Mint": "#AAF0D1",
                "Blizzard Blue": "#50BFE6",
                "Shocking Pink": "#FF6EFF",
                "Razzle Dazzle Rose": "#EE34D2",
                "Hot Magenta": "#FF00CC",
                "Sizzling Red": "#FF3855",
                "Red Salsa": "#FD3A4A",
                "Tart Orange": "#FB4D46",
                "Orange Soda": "#FA5B3D",
                "Bright Yellow": "#FFAA1D",
                "Yellow Sunshine": "#FFF700",
                "Slimy Green": "#299617",
                "Green Lizard": "#A7F432",
                "Denim Blue": "#2243B6",
                "Blue Jeans": "#5DADEC",
                "Plump Purple": "#5946B2",
                "Purple Plum": "#9C51B6",
                "Sweet Brown": "#A83731",
                "Brown Sugar": "#AF6E4D",
                "Eerie Black": "#1B1B1B",
                "Black Shadows": "#BFAFB2",
                "Fiery Rose": "#FF5470",
                "Sizzling Sunrise": "#FFDB00",
                "Heat Wave": "#FF7A00",
                "Lemon Glacier": "#FDFF00",
                "Spring Frost": "#87FF2A",
                "Absolute Zero": "#0048BA",
                "Winter Sky": "#FF007C",
                "Frostbite": "#E936A7"
            };
            this.copic = {
                "White": "#FFFFFF",
                "Black": "#312B2B",
                "Special Black": "#030708",
                "Frost Blue": "#DDF0F4",
                "Pale Porcelain Blue": "#E6F4F5",
                "Pale Celestine": "#F0F9FE",
                "Mint Blue": "#D6EEF2",
                "Robin's Egg Blue": "#B3E3F1",
                "Tahitian Blue": "#73CFE6",
                "Process Blue": "#40C5E6",
                "Peacock Blue": "#00B3E6",
                "Ice Blue": "#C8E6F0",
                "Light Blue": "#71CFEB",
                "Cyanine Blue": "#00BCEA",
                "Lapis Lazuli": "#1D8ACB",
                "Baby Blue": "#DBEDF9",
                "Phthalo Blue": "#92C2E8",
                "Sky": "#8ACEF3",
                "Cobalt Blue": "#65B3E3",
                "Royal Blue": "#196DB6",
                "Ultramarine": "#0177C1",
                "Pale Blue": "#E2EFF7",
                "Manganese Blue": "#82C3ED",
                "Antwerp Blue": "#156FA4",
                "Prussian Blue": "#2B64A9",
                "Powder Blue": "#E2F0FB",
                "Smoky Blue": "#75C0EA",
                "Soft Greenish Blue": "#ADCDDC",
                "Pale Blue Gray": "#DAE1F3",
                "Light Hydrangea": "#A7BBE0",
                "Clematis": "#6888C5",
                "Stratospheric Blue": "#2165AE",
                "Iris": "#3B479D",
                "Pale Grayish Blue": "#D5E2EB",
                "Light Crockery Blue": "#95C1DA",
                "Light Grayish Cobalt": "#60C5CF",
                "Night Blue": "#457A9A",
                "Agate": "#0F547E",
                "Pale Aqua": "#E5F4ED",
                "Snow Green": "#EFF8F3",
                "Aqua Blue": "#C7E6FA",
                "New Blue": "#C6E8EA",
                "Holiday Blue": "#1DB8CE",
                "Petroleum Blue": "#1DB8CE",
                "Blue Green": "#DCF0EF",
                "Cool Shadow": "#DCF0EF",
                "Moon White": "#CEEBF1",
                "Mint Green": "#C4E7E9",
                "Aqua": "#A0D9D2",
                "Teal Blue": "#37C0B0",
                "Coral Sea": "#BDE5DD",
                "Aqua Mint": "#BCE2D7",
                "Horizon Green": "#A3DAD7",
                "Nile Blue": "#AFDFDF",
                "Duck Blue": "#00B6B9",
                "Ice Mint": "#ACCFD1",
                "Jasper": "#64BEBE",
                "Ocean Mist": "#DAECEE",
                "Ice Ocean": "#74B8BB",
                "Abyss Green": "#59918E",
                "Bronze": "#49706B",
                "Gray Sky": "#BAC1B9",
                "Green Gray": "#BAC1B9",
                "Bush": "#81A291",
                "Flagstone Blue": "#6E9B87",
                "Mauve Shadow": "#E0DCED",
                "Iridescent Mauve": "#EAE7F2",
                "Pale Thistle": "#EAE7F2",
                "Viola": "#C4C9E6",
                "Prune": "#AAB8DB",
                "Blue Berry": "#7C97CE",
                "Blue Violet": "#EAE7F2",
                "Soft Violet": "#D4D2E8",
                "Hydrangea Blue": "#8491C8",
                "Deep Reddish Blue": "#6E84BD",
                "Dull Lavender": "#CFDBF1",
                "Grayish Lavender": "#B1C0DD",
                "Grayish Violet": "#8184A7",
                "Slate": "#384558",
                "Pale Lavender": "#EAE7F2",
                "Bluebell": "#9FA7BC",
                "Cool Gray No.0": "#E0E7ED",
                "Cool Gray No.00": "#E0E7ED",
                "Cool Gray No.1": "#DAE3E8",
                "Cool Gray No.2": "#CCD7DD",
                "Cool Gray No.3": "#C1CCD2",
                "Cool Gray No.4": "#92A0AB",
                "Cool Gray No.5": "#92A0AB",
                "Cool Gray No.6": "#637079",
                "Cool Gray No.7": "#637079",
                "Cool Gray No.8": "#535D66",
                "Cool Gray No.9": "#3C474D",
                "Cool Gray No.10": "#202B31",
                "Skin White": "#FDF3EA",
                "Pale Fruit Pink": "#FEF5EE",
                "Floral White": "#FFFAF4",
                "Pink Flamingo": "#FFEEE4",
                "Fruit Pink": "#FEECE0",
                "Lipstick Natural": "#E4BCC4",
                "Light Mahogany": "#CC816A",
                "Brown": "#CA6553",
                "Burnt Sienna": "#D96A4F",
                "Bareley Beige": "#FEE9D6",
                "Light Suntan": "#E9C5AF",
                "Dark Suntan": "#FBBB8D",
                "Reddish Brass": "#B85F57",
                "Copper": "#88534D",
                "Redwood": "#C45238",
                "Baby Skin Pink": "#FDE2C7",
                "Hazelnut": "#ECCAB1",
                "Caribe Cocoa": "#D2A482",
                "Africano": "#997663",
                "Burnt Umber": "#884636",
                "Bisque": "#F7F0D6",
                "Brick Beige": "#F2E6CE",
                "Sand": "#F3D2B1",
                "Orientale": "#F0CAA6",
                "Chamois": "#E6C3A3",
                "Sepia": "#CC9159",
                "Leather": "#C5743F",
                "Brick White": "#F2E8DC",
                "Pearl White": "#FEF1E1",
                "Sand White": "#F3EAD9",
                "Dull Ivory": "#E8DABD",
                "Clay": "#8A6E59",
                "Dark Brown": "#8A6E59",
                "Dark Bark": "#634C3C",
                "Egg Shell": "#F4EBF0",
                "Milky White": "#FEECD6",
                "Raw Silk": "#F1DFB9",
                "Light Camel": "#F1DFB9",
                "Light Walnut": "#B18558",
                "Walnut": "#9A7F6C",
                "Ash Rose": "#EFEAE6",
                "Champagne": "#A1847C",
                "Cocoa Brown": "#A1847C",
                "Maroon": "#7F604E",
                "Cashew": "#4A2C22",
                "Ivory": "#F0E6C2",
                "Khaki": "#AE9F80",
                "Fig": "#6F604D",
                "Pecan": "#5A4939",
                "Tea Rose": "#FED2B9",
                "Flesh Pink": "#FCBC7E",
                "Deep Orange": "#B46034",
                "Baked Clay": "#B46034",
                "Fluorescent Pink": "#F5A3C7",
                "Fluorescent Dull Violet": "#7F74B6",
                "Fluorescent Yellow Orange": "#FFF697",
                "Fluorescent Orange": "#FECC99",
                "Jade Green": "#E3F2ED",
                "Pale Green": "#EAF5ED",
                "Crystal Opal": "#F1F7F3",
                "Spectrum Green": "#CFE8D3",
                "Meadow Green": "#B6DA9C",
                "Emerald Green": "#69C07B",
                "Nile Green": "#7BC576",
                "Veronese Green": "#7AC465",
                "Sea Green": "#D2E8C4",
                "Apple Green": "#97CF90",
                "Malachite": "#60C198",
                "Forest Green": "#14B37D",
                "Bright Parrot Green": "#2DB98A",
                "Wax White": "#EDF6DB",
                "Lime Green": "#C4E4CD",
                "Willow": "#C3E0B4",
                "Ocean Green": "#119462",
                "Pine Tree Green": "#197C5D",
                "Dim Green": "#E4F1DF",
                "Pistachio": "#D7E7A8",
                "Mistletoe": "#5.79E+80",
                "Spring Dim Green": "#CCDAB9",
                "Verdigris": "#9DC3AA",
                "Grayish Olive": "#98A786",
                "Olive": "#5F7E3A",
                "Neutral Gray No.0": "#ECEEED",
                "Neutral Gray No.1": "#E2E3E5",
                "Neutral Gray No.2": "#DADBDD",
                "Neutral Gray No.3": "#D1D2D4",
                "Neutral Gray No.4": "#BCBDC1",
                "Neutral Gray No.5": "#A8A9AD",
                "Neutral Gray No.6": "#949599",
                "Neutral Gray No.7": "#77787C",
                "Neutral Gray No.8": "#636466",
                "Neutral Gray No.9": "#4C4D4F",
                "Neutral Gray No.10": "#312F30",
                "Pinkish White": "#FEEAE1",
                "Cherry White": "#FEF0E7",
                "Pink Beryl": "#FEF3EF",
                "Pinkish Vanilla": "#FDE0D8",
                "Flesh": "#FDD3C7",
                "Salmon Red": "#F6917B",
                "Vermilion": "#F26754",
                "Pale Cherry Pink": "#FDE1D5",
                "Light Tea Rose": "#FCD3C1",
                "Light Rouse": "#F59B92",
                "Lipstick Orange": "#F4846C",
                "Blush": "#FCD7CF",
                "Sardonyx": "#FAC1B6",
                "Light Prawn": "#F8B7B1",
                "Prawn": "#F27579",
                "Cadmium Red": "#F15062",
                "Lipstick Red": "#ED174B",
                "Pale Yellowish Pink": "#FCE3DF",
                "Peach": "#FAC1BA",
                "Coral": "#F27185",
                "Carmine": "#E86C74",
                "Garnet": "#CB487A",
                "Bougainvillaea": "#EE848E",
                "Strong Red": "#E04D69",
                "Currant": "#D27C95",
                "Cardinal": "#B74F70",
                "Rose Pink": "#F1C8D6",
                "Rose Mist": "#F19CB9",
                "Rose Red": "#D36A93",
                "Dark Red": "#7D2B42",
                "Water Lily": "#F1DAEA",
                "Pale Purple": "#F4E2EE",
                "Evening Primrose": "#F2EAF5",
                "Sugared Almond Pink": "#FAD5E6",
                "Shock Pink": "#F6A3BF",
                "Cerise": "#F386AF",
                "Pale Pink": "#FDECF4",
                "Pink": "#FBD6DD",
                "Tender Pink": "#F9C9D7",
                "Begonia Pink": "#F495B7",
                "Deep Magenta": "#DB7EB3",
                "Red Violet": "#D268AA",
                "Light Pink": "#FDE8E7",
                "Pure Pink": "#F8BAC9",
                "Dog Rose Flower": "#F493BE",
                "Crimson": "#EF4880",
                "Shadow Pink": "#FAD3CE",
                "Dark Pink": "#F9AFAE",
                "Salmon Pink": "#F8BBB6",
                "Cotton Candy": "#F9CADE",
                "Hollyhock": "#E9A5CA",
                "Begonia": "#D09DAE",
                "Raspberry": "#B86A84",
                "Peony": "#8B576E",
                "Baby Blossoms": "#B684A1",
                "Argyle Purple": "#5A4858",
                "Toner Gray No.0": "#ECEEED",
                "Toner Gray No.1": "#EAEAE8",
                "Toner Gray No.2": "#E0E0DE",
                "Toner Gray No.3": "#D1D2CC",
                "Toner Gray No.4": "#BCBBB9",
                "Toner Gray No.5": "#A8A7A3",
                "Toner Gray No.6": "#949590",
                "Toner Gray No.7": "#777674",
                "Toner Gray No.8": "#63645F",
                "Toner Gray No.9": "#4C4B49",
                "Toner Gray No.10": "#322E2D",
                "Pale Heath": "#E9E5F3",
                "Rose Quartz": "#F0EDF6",
                "Heath": "#E4C1D9",
                "Lilac": "#E6AACE",
                "Marigold": "#E2A6CA",
                "Lavender": "#CE95C2",
                "Violet": "#8754A1",
                "Pale Lilac": "#EED7E9",
                "Mallow": "#D3A6CD",
                "Amethyst": "#A092C7",
                "Wisteria": "#E2E0ED",
                "Ash Lavender": "#B2B1D0",
                "Pale Blackberry": "#857FAD",
                "Eggplant": "#6B668E",
                "Pale Grape": "#E8C4D0",
                "Early Grape": "#E5C1DB",
                "Light Grape": "#B77CA8",
                "Aubergine": "#524358",
                "Warm Gray No.0": "#ECECE4",
                "Warm Gray No.00": "#F3F3EB",
                "Warm Gray No.1": "#E7E7DF",
                "Warm Gray No.2": "#DDDDD5",
                "Warm Gray No.3": "#D2D2CA",
                "Warm Gray No.4": "#BCBDB7",
                "Warm Gray No.5": "#A8A9A4",
                "Warm Gray No.6": "#94958F",
                "Warm Gray No.7": "#777873",
                "Warm Gray No.8": "#63645F",
                "Warm Gray No.9": "#4C4D48",
                "Warm Gray No.10": "#302F2B",
                "Barium Yellow": "#FEFDDF",
                "Pale Lemon": "#FFFCE9",
                "Yellow Fluorite": "#FEFEF4",
                "Canary Yellow": "#F6F396",
                "Acacia": "#EDE556",
                "Yellow": "#FEF56C",
                "Acid Yellow": "#FEF200",
                "Pale Yellow": "#FFFBCC",
                "Lemon Yellow": "#FBF7AE",
                "Cadmium Yellow": "#FEE96C",
                "Golden Yellow": "#FFE455",
                "Lightning Yellow": "#FEED55",
                "Napoli Yellow": "#FFE93E",
                "Buttercup Yellow": "#FFEEC2",
                "Yellowish Beige": "#FBE3B3",
                "Mustard": "#F0DD67",
                "Lionet Gold": "#CAA869",
                "Cashmere": "#F9DEC0",
                "Maize": "#FFD879",
                "Honey": "#FFD274",
                "Mimosa Yellow": "#E6E69E",
                "Lily White": "#F2F7E0",
                "Green Bice": "#E2EBB2",
                "Yellow Green": "#DEEAAA",
                "Salad": "#D6E592",
                "Yellowish Green": "#C4DF92",
                "Acid Green": "#A5CF4F",
                "Lettuce Green": "#82C566",
                "Mignonette": "#E5F0D0",
                "Chartreuse": "#D4E59F",
                "Grass Green": "#72C156",
                "Anise": "#F7F6BE",
                "New Leaf": "#E6EB8F",
                "Celadon Green": "#D0E17B",
                "Pale Cobalt Green": "#D5EBD4",
                "Cobalt Green": "#B4DCB7",
                "Pale Moss": "#D6E9D6",
                "Pea Green": "#A0CAA2",
                "Moss": "#81BF8C",
                "Putty": "#DAD7AE",
                "Grayish Yellow": "#D2D29C",
                "Pale Olive": "#CBC65E",
                "Spanish Olive": "#958F03",
                "Marine Green": "#4E6A15",
                "Powder Pink": "#FED6BD",
                "Silk": "#FEECD8",
                "Pale Chiffon": "#FFF3E5",
                "Peach Puff": "#FEDAC2",
                "Light Orange": "#FCDCC5",
                "Chrome Orange": "#FEC369",
                "Cadmium Orange": "#F26F39",
                "Chinese Orange": "#F15524",
                "Loquat": "#FFE2A6",
                "Caramel": "#FEC84E",
                "Pumpkin Yellow": "#FBB884",
                "Apricot": "#FEB729",
                "Sanguine": "#F26B3C",
                "Yellowish Shade": "#FFE1BF",
                "Cream": "#F5DDB1",
                "Yellow Ochre": "#ECCF8B",
                "Pale Sepia": "#F0CF64",
                "Macadamia Nut": "#FEF2DA",
                "Light Reddish Yellow": "#FFDEA8",
                "Yellowish Skin Pink": "#FDDAC4",
                "Atoll": "#FAAE60",
                "Orange": "#F37022",
                "Mellow Peach": "#FDC68D"
            };
            this.flat = {
                "Turquoise": "#1abc9c",
                "Green Sea": "#16a085",
                "Emerald": "#2ecc71",
                "Nephitis": "#27ae60",
                "Peter River": "#3498db",
                "Belize Hole": "#2980b9",
                "Amethyst": "#9b59b6",
                "Wisteria": "#8e44ad",
                "Sun Flower": "#f1c40f",
                "Orange": "#f39c12",
                "Carrot": "#e67e22",
                "Pumpkin": "#d35400",
                "Alizarin": "#e74c3c",
                "Pomegranate": "#c0392b",
                "Clouds": "#ecf0f1",
                "Silver": "#bdc3c7",
                "Concrete": "#95a5a6",
                "Asbestos": "#7f8c8d",
                "Wet Asphalt": "#34495e",
                "Midnight Blue": "#2c3e50"
            };
        }
        ColorChart.prototype.doCopy = function (ev, color) {
            this.copyEl.value = color;
            this.copyEl.select();
            try {
                document.execCommand('copy');
                ev.target.parentElement.classList.add('copied');
                setTimeout(function () { return ev.target.parentElement.classList.remove('copied'); }, 1000);
            }
            catch (err) {
                console.log(err);
            }
        };
        return ColorChart;
    }());
    exports.ColorChart = ColorChart;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/styles/flags',["require", "exports", "aurelia-framework", "lodash"], function (require, exports, aurelia_framework_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleFlags = (function () {
        function StyleFlags() {
            this.countries = window.Countries.list;
            this.elWidth = '8em';
            this.fCountries = [];
            this.filterText = '';
        }
        StyleFlags.prototype.attached = function () { this.filter(); };
        StyleFlags.prototype.filter = function () {
            var _this = this;
            this.fCountries = _.filter(window.Countries.list, function (c) {
                return c.iso2.indexOf(_this.filterText.toUpperCase()) > -1 ||
                    c.iso3.indexOf(_this.filterText.toUpperCase()) > -1 ||
                    getAscii(c.name).toLowerCase().indexOf(_this.filterText.toLowerCase()) > -1;
            });
        };
        StyleFlags = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], StyleFlags);
        return StyleFlags;
    }());
    exports.StyleFlags = StyleFlags;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/styles/glyphs',["require", "exports", "aurelia-framework", "lodash"], function (require, exports, aurelia_framework_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleGlyphs = (function () {
        function StyleGlyphs() {
            this.elWidth = '8em';
            this.fIcomoon = [];
            this.fHawLine = [];
            this.fHawFill = [];
            this.filterText = '';
            this.glyphs = {
                "Alert Icons": [
                    "glyph-alert-info",
                    "glyph-alert-question",
                    "glyph-alert-exclaim",
                    "glyph-alert-error",
                    "glyph-alert-notif"
                ],
                "Arrows": [
                    "glyph-arrow-down",
                    "glyph-arrow-left",
                    "glyph-arrow-right",
                    "glyph-arrow-up",
                    "glyph-caret-double-down",
                    "glyph-caret-double-left",
                    "glyph-caret-double-right",
                    "glyph-caret-double-up",
                    "glyph-caret-down",
                    "glyph-caret-left",
                    "glyph-caret-right",
                    "glyph-caret-up",
                    "glyph-chevron-double-down",
                    "glyph-chevron-double-left",
                    "glyph-chevron-double-right",
                    "glyph-chevron-double-up",
                    "glyph-chevron-down",
                    "glyph-chevron-left",
                    "glyph-chevron-right",
                    "glyph-chevron-up",
                    "glyph-refresh"
                ],
                "Icons": [
                    "glyph-icon-close-all",
                    "glyph-icon-cloud-download",
                    "glyph-icon-cloud-upload",
                    "glyph-icon-cog",
                    "glyph-icon-collapse-all",
                    "glyph-icon-download",
                    "glyph-icon-edit-page",
                    "glyph-icon-edit",
                    "glyph-icon-email",
                    "glyph-icon-expand-all",
                    "glyph-icon-file",
                    "glyph-icon-folder-closed",
                    "glyph-icon-folder-open",
                    "glyph-icon-image",
                    "glyph-icon-key",
                    "glyph-icon-lock",
                    "glyph-icon-minus",
                    "glyph-icon-no",
                    "glyph-icon-page",
                    "glyph-icon-placeholder",
                    "glyph-icon-plus",
                    "glyph-icon-preview",
                    "glyph-icon-print",
                    "glyph-icon-trash",
                    "glyph-icon-upload",
                    "glyph-icon-yes"
                ]
            };
            this.icomoon = [
                "icon-moon-home",
                "icon-moon-home2",
                "icon-moon-home3",
                "icon-moon-office",
                "icon-moon-newspaper",
                "icon-moon-pencil",
                "icon-moon-pencil2",
                "icon-moon-quill",
                "icon-moon-pen",
                "icon-moon-blog",
                "icon-moon-eyedropper",
                "icon-moon-droplet",
                "icon-moon-paint-format",
                "icon-moon-image",
                "icon-moon-images",
                "icon-moon-camera",
                "icon-moon-headphones",
                "icon-moon-music",
                "icon-moon-play",
                "icon-moon-film",
                "icon-moon-video-camera",
                "icon-moon-dice",
                "icon-moon-pacman",
                "icon-moon-spades",
                "icon-moon-clubs",
                "icon-moon-diamonds",
                "icon-moon-bullhorn",
                "icon-moon-connection",
                "icon-moon-podcast",
                "icon-moon-feed",
                "icon-moon-mic",
                "icon-moon-book",
                "icon-moon-books",
                "icon-moon-library",
                "icon-moon-file-text",
                "icon-moon-profile",
                "icon-moon-file-empty",
                "icon-moon-files-empty",
                "icon-moon-file-text2",
                "icon-moon-file-picture",
                "icon-moon-file-music",
                "icon-moon-file-play",
                "icon-moon-file-video",
                "icon-moon-file-zip",
                "icon-moon-copy",
                "icon-moon-paste",
                "icon-moon-stack",
                "icon-moon-folder",
                "icon-moon-folder-open",
                "icon-moon-folder-plus",
                "icon-moon-folder-minus",
                "icon-moon-folder-download",
                "icon-moon-folder-upload",
                "icon-moon-price-tag",
                "icon-moon-price-tags",
                "icon-moon-barcode",
                "icon-moon-qrcode",
                "icon-moon-ticket",
                "icon-moon-cart",
                "icon-moon-coin-dollar",
                "icon-moon-coin-euro",
                "icon-moon-coin-pound",
                "icon-moon-coin-yen",
                "icon-moon-credit-card",
                "icon-moon-calculator",
                "icon-moon-lifebuoy",
                "icon-moon-phone",
                "icon-moon-phone-hang-up",
                "icon-moon-address-book",
                "icon-moon-envelop",
                "icon-moon-pushpin",
                "icon-moon-location",
                "icon-moon-location2",
                "icon-moon-compass",
                "icon-moon-compass2",
                "icon-moon-map",
                "icon-moon-map2",
                "icon-moon-history",
                "icon-moon-clock",
                "icon-moon-clock2",
                "icon-moon-alarm",
                "icon-moon-bell",
                "icon-moon-stopwatch",
                "icon-moon-calendar",
                "icon-moon-printer",
                "icon-moon-keyboard",
                "icon-moon-display",
                "icon-moon-laptop",
                "icon-moon-mobile",
                "icon-moon-mobile2",
                "icon-moon-tablet",
                "icon-moon-tv",
                "icon-moon-drawer",
                "icon-moon-drawer2",
                "icon-moon-box-add",
                "icon-moon-box-remove",
                "icon-moon-download",
                "icon-moon-upload",
                "icon-moon-floppy-disk",
                "icon-moon-drive",
                "icon-moon-database",
                "icon-moon-undo",
                "icon-moon-redo",
                "icon-moon-undo2",
                "icon-moon-redo2",
                "icon-moon-forward",
                "icon-moon-reply",
                "icon-moon-bubble",
                "icon-moon-bubbles",
                "icon-moon-bubbles2",
                "icon-moon-bubble2",
                "icon-moon-bubbles3",
                "icon-moon-bubbles4",
                "icon-moon-user",
                "icon-moon-users",
                "icon-moon-user-plus",
                "icon-moon-user-minus",
                "icon-moon-user-check",
                "icon-moon-user-tie",
                "icon-moon-quotes-left",
                "icon-moon-quotes-right",
                "icon-moon-hour-glass",
                "icon-moon-spinner",
                "icon-moon-spinner2",
                "icon-moon-spinner3",
                "icon-moon-spinner4",
                "icon-moon-spinner5",
                "icon-moon-spinner6",
                "icon-moon-spinner7",
                "icon-moon-spinner8",
                "icon-moon-spinner9",
                "icon-moon-spinner10",
                "icon-moon-spinner11",
                "icon-moon-binoculars",
                "icon-moon-search",
                "icon-moon-zoom-in",
                "icon-moon-zoom-out",
                "icon-moon-enlarge",
                "icon-moon-shrink",
                "icon-moon-enlarge2",
                "icon-moon-shrink2",
                "icon-moon-key",
                "icon-moon-key2",
                "icon-moon-lock",
                "icon-moon-unlocked",
                "icon-moon-wrench",
                "icon-moon-equalizer",
                "icon-moon-equalizer2",
                "icon-moon-cog",
                "icon-moon-cogs",
                "icon-moon-hammer",
                "icon-moon-magic-wand",
                "icon-moon-aid-kit",
                "icon-moon-bug",
                "icon-moon-pie-chart",
                "icon-moon-stats-dots",
                "icon-moon-stats-bars",
                "icon-moon-stats-bars2",
                "icon-moon-trophy",
                "icon-moon-gift",
                "icon-moon-glass",
                "icon-moon-glass2",
                "icon-moon-mug",
                "icon-moon-spoon-knife",
                "icon-moon-leaf",
                "icon-moon-rocket",
                "icon-moon-meter",
                "icon-moon-meter2",
                "icon-moon-hammer2",
                "icon-moon-fire",
                "icon-moon-lab",
                "icon-moon-magnet",
                "icon-moon-bin",
                "icon-moon-bin2",
                "icon-moon-briefcase",
                "icon-moon-airplane",
                "icon-moon-truck",
                "icon-moon-road",
                "icon-moon-accessibility",
                "icon-moon-target",
                "icon-moon-shield",
                "icon-moon-power",
                "icon-moon-switch",
                "icon-moon-power-cord",
                "icon-moon-clipboard",
                "icon-moon-list-numbered",
                "icon-moon-list",
                "icon-moon-list2",
                "icon-moon-tree",
                "icon-moon-menu",
                "icon-moon-menu2",
                "icon-moon-menu3",
                "icon-moon-menu4",
                "icon-moon-cloud",
                "icon-moon-cloud-download",
                "icon-moon-cloud-upload",
                "icon-moon-cloud-check",
                "icon-moon-download2",
                "icon-moon-upload2",
                "icon-moon-download3",
                "icon-moon-upload3",
                "icon-moon-sphere",
                "icon-moon-earth",
                "icon-moon-link",
                "icon-moon-flag",
                "icon-moon-attachment",
                "icon-moon-eye",
                "icon-moon-eye-plus",
                "icon-moon-eye-minus",
                "icon-moon-eye-blocked",
                "icon-moon-bookmark",
                "icon-moon-bookmarks",
                "icon-moon-sun",
                "icon-moon-contrast",
                "icon-moon-brightness-contrast",
                "icon-moon-star-empty",
                "icon-moon-star-half",
                "icon-moon-star-full",
                "icon-moon-heart",
                "icon-moon-heart-broken",
                "icon-moon-man",
                "icon-moon-woman",
                "icon-moon-man-woman",
                "icon-moon-happy",
                "icon-moon-happy2",
                "icon-moon-smile",
                "icon-moon-smile2",
                "icon-moon-tongue",
                "icon-moon-tongue2",
                "icon-moon-sad",
                "icon-moon-sad2",
                "icon-moon-wink",
                "icon-moon-wink2",
                "icon-moon-grin",
                "icon-moon-grin2",
                "icon-moon-cool",
                "icon-moon-cool2",
                "icon-moon-angry",
                "icon-moon-angry2",
                "icon-moon-evil",
                "icon-moon-evil2",
                "icon-moon-shocked",
                "icon-moon-shocked2",
                "icon-moon-baffled",
                "icon-moon-baffled2",
                "icon-moon-confused",
                "icon-moon-confused2",
                "icon-moon-neutral",
                "icon-moon-neutral2",
                "icon-moon-hipster",
                "icon-moon-hipster2",
                "icon-moon-wondering",
                "icon-moon-wondering2",
                "icon-moon-sleepy",
                "icon-moon-sleepy2",
                "icon-moon-frustrated",
                "icon-moon-frustrated2",
                "icon-moon-crying",
                "icon-moon-crying2",
                "icon-moon-point-up",
                "icon-moon-point-right",
                "icon-moon-point-down",
                "icon-moon-point-left",
                "icon-moon-warning",
                "icon-moon-notification",
                "icon-moon-question",
                "icon-moon-plus",
                "icon-moon-minus",
                "icon-moon-info",
                "icon-moon-cancel-circle",
                "icon-moon-blocked",
                "icon-moon-cross",
                "icon-moon-checkmark",
                "icon-moon-checkmark2",
                "icon-moon-spell-check",
                "icon-moon-enter",
                "icon-moon-exit",
                "icon-moon-play2",
                "icon-moon-pause",
                "icon-moon-stop",
                "icon-moon-previous",
                "icon-moon-next",
                "icon-moon-backward",
                "icon-moon-forward2",
                "icon-moon-play3",
                "icon-moon-pause2",
                "icon-moon-stop2",
                "icon-moon-backward2",
                "icon-moon-forward3",
                "icon-moon-first",
                "icon-moon-last",
                "icon-moon-previous2",
                "icon-moon-next2",
                "icon-moon-eject",
                "icon-moon-volume-high",
                "icon-moon-volume-medium",
                "icon-moon-volume-low",
                "icon-moon-volume-mute",
                "icon-moon-volume-mute2",
                "icon-moon-volume-increase",
                "icon-moon-volume-decrease",
                "icon-moon-loop",
                "icon-moon-loop2",
                "icon-moon-infinite",
                "icon-moon-shuffle",
                "icon-moon-arrow-up-left",
                "icon-moon-arrow-up",
                "icon-moon-arrow-up-right",
                "icon-moon-arrow-right",
                "icon-moon-arrow-down-right",
                "icon-moon-arrow-down",
                "icon-moon-arrow-down-left",
                "icon-moon-arrow-left",
                "icon-moon-arrow-up-left2",
                "icon-moon-arrow-up2",
                "icon-moon-arrow-up-right2",
                "icon-moon-arrow-right2",
                "icon-moon-arrow-down-right2",
                "icon-moon-arrow-down2",
                "icon-moon-arrow-down-left2",
                "icon-moon-arrow-left2",
                "icon-moon-circle-up",
                "icon-moon-circle-right",
                "icon-moon-circle-down",
                "icon-moon-circle-left",
                "icon-moon-tab",
                "icon-moon-move-up",
                "icon-moon-move-down",
                "icon-moon-sort-alpha-asc",
                "icon-moon-sort-alpha-desc",
                "icon-moon-sort-numeric-asc",
                "icon-moon-sort-numberic-desc",
                "icon-moon-sort-amount-asc",
                "icon-moon-sort-amount-desc",
                "icon-moon-command",
                "icon-moon-shift",
                "icon-moon-ctrl",
                "icon-moon-opt",
                "icon-moon-checkbox-checked",
                "icon-moon-checkbox-unchecked",
                "icon-moon-radio-checked",
                "icon-moon-radio-checked2",
                "icon-moon-radio-unchecked",
                "icon-moon-crop",
                "icon-moon-make-group",
                "icon-moon-ungroup",
                "icon-moon-scissors",
                "icon-moon-filter",
                "icon-moon-font",
                "icon-moon-ligature",
                "icon-moon-ligature2",
                "icon-moon-text-height",
                "icon-moon-text-width",
                "icon-moon-font-size",
                "icon-moon-bold",
                "icon-moon-underline",
                "icon-moon-italic",
                "icon-moon-strikethrough",
                "icon-moon-omega",
                "icon-moon-sigma",
                "icon-moon-page-break",
                "icon-moon-superscript",
                "icon-moon-subscript",
                "icon-moon-superscript2",
                "icon-moon-subscript2",
                "icon-moon-text-color",
                "icon-moon-pagebreak",
                "icon-moon-clear-formatting",
                "icon-moon-table",
                "icon-moon-table2",
                "icon-moon-insert-template",
                "icon-moon-pilcrow",
                "icon-moon-ltr",
                "icon-moon-rtl",
                "icon-moon-section",
                "icon-moon-paragraph-left",
                "icon-moon-paragraph-center",
                "icon-moon-paragraph-right",
                "icon-moon-paragraph-justify",
                "icon-moon-indent-increase",
                "icon-moon-indent-decrease",
                "icon-moon-share",
                "icon-moon-new-tab",
                "icon-moon-embed",
                "icon-moon-embed2",
                "icon-moon-terminal",
                "icon-moon-share2",
                "icon-moon-mail",
                "icon-moon-mail2",
                "icon-moon-mail3",
                "icon-moon-mail4",
                "icon-moon-amazon",
                "icon-moon-google",
                "icon-moon-google2",
                "icon-moon-google3",
                "icon-moon-google-plus",
                "icon-moon-google-plus2",
                "icon-moon-google-plus3",
                "icon-moon-hangouts",
                "icon-moon-google-drive",
                "icon-moon-facebook",
                "icon-moon-facebook2",
                "icon-moon-instagram",
                "icon-moon-whatsapp",
                "icon-moon-spotify",
                "icon-moon-telegram",
                "icon-moon-twitter",
                "icon-moon-vine",
                "icon-moon-vk",
                "icon-moon-renren",
                "icon-moon-sina-weibo",
                "icon-moon-rss",
                "icon-moon-rss2",
                "icon-moon-youtube",
                "icon-moon-youtube2",
                "icon-moon-twitch",
                "icon-moon-vimeo",
                "icon-moon-vimeo2",
                "icon-moon-lanyrd",
                "icon-moon-flickr",
                "icon-moon-flickr2",
                "icon-moon-flickr3",
                "icon-moon-flickr4",
                "icon-moon-dribbble",
                "icon-moon-behance",
                "icon-moon-behance2",
                "icon-moon-deviantart",
                "icon-moon-500px",
                "icon-moon-steam",
                "icon-moon-steam2",
                "icon-moon-dropbox",
                "icon-moon-onedrive",
                "icon-moon-github",
                "icon-moon-npm",
                "icon-moon-basecamp",
                "icon-moon-trello",
                "icon-moon-wordpress",
                "icon-moon-joomla",
                "icon-moon-ello",
                "icon-moon-blogger",
                "icon-moon-blogger2",
                "icon-moon-tumblr",
                "icon-moon-tumblr2",
                "icon-moon-yahoo",
                "icon-moon-yahoo2",
                "icon-moon-tux",
                "icon-moon-appleinc",
                "icon-moon-finder",
                "icon-moon-android",
                "icon-moon-windows",
                "icon-moon-windows8",
                "icon-moon-soundcloud",
                "icon-moon-soundcloud2",
                "icon-moon-skype",
                "icon-moon-reddit",
                "icon-moon-hackernews",
                "icon-moon-wikipedia",
                "icon-moon-linkedin",
                "icon-moon-linkedin2",
                "icon-moon-lastfm",
                "icon-moon-lastfm2",
                "icon-moon-delicious",
                "icon-moon-stumbleupon",
                "icon-moon-stumbleupon2",
                "icon-moon-stackoverflow",
                "icon-moon-pinterest",
                "icon-moon-pinterest2",
                "icon-moon-xing",
                "icon-moon-xing2",
                "icon-moon-flattr",
                "icon-moon-foursquare",
                "icon-moon-yelp",
                "icon-moon-paypal",
                "icon-moon-chrome",
                "icon-moon-firefox",
                "icon-moon-IE",
                "icon-moon-edge",
                "icon-moon-safari",
                "icon-moon-opera",
                "icon-moon-file-pdf",
                "icon-moon-file-openoffice",
                "icon-moon-file-word",
                "icon-moon-file-excel",
                "icon-moon-libreoffice",
                "icon-moon-html-five",
                "icon-moon-html-five2",
                "icon-moon-css3",
                "icon-moon-git",
                "icon-moon-codepen",
                "icon-moon-svg"
            ];
            this.hawline = [
                "icon-line-mail-envelope",
                "icon-line-mail-envelope-open",
                "icon-line-mail-envelope-closed",
                "icon-line-mail-envelope-open2",
                "icon-line-mail-envelope-open3",
                "icon-line-mail-envelope-closed2",
                "icon-line-mail-envelope-open4",
                "icon-line-mail-error",
                "icon-line-mail-checked",
                "icon-line-mail-cancel",
                "icon-line-mail--forbidden",
                "icon-line-mail-add",
                "icon-line-mail-remove",
                "icon-line-flag",
                "icon-line-flag2",
                "icon-line-flag3",
                "icon-line-flag4",
                "icon-line-bookmark",
                "icon-line-bookmark-add",
                "icon-line-bookmark-remove",
                "icon-line-eye-hidden",
                "icon-line-eye",
                "icon-line-star",
                "icon-line-key",
                "icon-line-key2",
                "icon-line-trash-can",
                "icon-line-trash-can2",
                "icon-line-information",
                "icon-line-information2",
                "icon-line-book",
                "icon-line-book-bookmark",
                "icon-line-clipboard-edit",
                "icon-line-clipboard-add",
                "icon-line-clipboard-remove",
                "icon-line-clipboard",
                "icon-line-clipboard-download",
                "icon-line-clipboard-upload",
                "icon-line-clipboard-checked",
                "icon-line-clipboard-text",
                "icon-line-clipboard-list",
                "icon-line-note",
                "icon-line-note-add",
                "icon-line-note-remove",
                "icon-line-note-text",
                "icon-line-note-list",
                "icon-line-note-checked",
                "icon-line-note-important",
                "icon-line-notebook",
                "icon-line-notebook2",
                "icon-line-notebook3",
                "icon-line-notebook4",
                "icon-line-notebook-text",
                "icon-line-notebook-list",
                "icon-line-document",
                "icon-line-document-text",
                "icon-line-document-text2",
                "icon-line-document-download",
                "icon-line-document-upload",
                "icon-line-document-bookmark",
                "icon-line-document-diagrams",
                "icon-line-document-recording",
                "icon-line-document-table",
                "icon-line-document-music",
                "icon-line-document-movie",
                "icon-line-document-play",
                "icon-line-document-graph",
                "icon-line-document-time",
                "icon-line-document-text3",
                "icon-line-document-code",
                "icon-line-document-cloud",
                "icon-line-documents",
                "icon-line-documents2",
                "icon-line-document-search",
                "icon-line-document-star",
                "icon-line-document-unlocked",
                "icon-line-document-locked",
                "icon-line-document-error",
                "icon-line-document-cancel",
                "icon-line-document-checked",
                "icon-line-document-add",
                "icon-line-document-remove",
                "icon-line-document-forbidden",
                "icon-line-document-information",
                "icon-line-folder-information",
                "icon-line-document-list",
                "icon-line-document-font",
                "icon-line-inbox",
                "icon-line-inboxes",
                "icon-line-inbox-document",
                "icon-line-inbox-document-text",
                "icon-line-inbox-download",
                "icon-line-inbox-upload",
                "icon-line-folder",
                "icon-line-folder2",
                "icon-line-folders",
                "icon-line-folder-download",
                "icon-line-folder-upload",
                "icon-line-folder-unlocked",
                "icon-line-folder-locked",
                "icon-line-folder-search",
                "icon-line-folder-error",
                "icon-line-folder-cancel",
                "icon-line-folder-checked",
                "icon-line-folder-add",
                "icon-line-folder-remove",
                "icon-line-folder-forbidden",
                "icon-line-folder-bookmark",
                "icon-line-document-zip",
                "icon-line-zip",
                "icon-line-search",
                "icon-line-search-plus",
                "icon-line-search-minus",
                "icon-line-lock",
                "icon-line-lock-open",
                "icon-line-lock-open2",
                "icon-line-lock-stripes",
                "icon-line-lock-rounded",
                "icon-line-lock-rounded-open",
                "icon-line-lock-rounded-open2",
                "icon-line-combination-lock",
                "icon-line-printer",
                "icon-line-printer2",
                "icon-line-printer-text",
                "icon-line-printer-text2",
                "icon-line-document-shred",
                "icon-line-shredder",
                "icon-line-document-scan",
                "icon-line-cloud-download",
                "icon-line-cloud-upload",
                "icon-line-cloud-error",
                "icon-line-cloud",
                "icon-line-inbox-filled",
                "icon-line-pen",
                "icon-line-pen-angled",
                "icon-line-document-edit",
                "icon-line-document-certificate",
                "icon-line-certificate",
                "icon-line-package",
                "icon-line-box",
                "icon-line-box-filled",
                "icon-line-box2",
                "icon-line-box3",
                "icon-line-box-bookmark",
                "icon-line-tag-cord",
                "icon-line-tag",
                "icon-line-tags",
                "icon-line-tag-add",
                "icon-line-tag-remove",
                "icon-line-tag-checked",
                "icon-line-tag-cancel",
                "icon-line-paperclip",
                "icon-line-document-file-numbers",
                "icon-line-document-file-pages",
                "icon-line-document-file-app",
                "icon-line-document-file-png",
                "icon-line-document-file-pdf",
                "icon-line-document-file-mp3",
                "icon-line-document-file-mp4",
                "icon-line-document-file-mov",
                "icon-line-document-file-jpg",
                "icon-line-document-file-key",
                "icon-line-document-file-html",
                "icon-line-document-file-css",
                "icon-line-document-file-java",
                "icon-line-document-file-psd",
                "icon-line-document-file-ai",
                "icon-line-document-file-bmp",
                "icon-line-document-file-dwg",
                "icon-line-document-file-eps",
                "icon-line-document-file-tiff",
                "icon-line-document-file-ots",
                "icon-line-document-file-php",
                "icon-line-document-file-py",
                "icon-line-document-file-c",
                "icon-line-document-file-sql",
                "icon-line-document-file-rb",
                "icon-line-document-file-cpp",
                "icon-line-document-file-tga",
                "icon-line-document-file-dxf",
                "icon-line-document-file-doc",
                "icon-line-document-file-odt",
                "icon-line-document-file-xls",
                "icon-line-document-file-docx",
                "icon-line-document-file-ppt",
                "icon-line-document-file-asp",
                "icon-line-document-file-ics",
                "icon-line-document-file-dat",
                "icon-line-document-file-xml",
                "icon-line-document-file-yml",
                "icon-line-document-file-h",
                "icon-line-document-file-exe",
                "icon-line-document-file-avi",
                "icon-line-document-file-odp",
                "icon-line-document-file-dotx",
                "icon-line-document-file-xlsx",
                "icon-line-document-file-ods",
                "icon-line-document-file-pps",
                "icon-line-document-file-dot",
                "icon-line-document-file-txt",
                "icon-line-document-file-rtf",
                "icon-line-document-file-m4v",
                "icon-line-document-file-flv",
                "icon-line-document-file-mpg",
                "icon-line-document-file-qt",
                "icon-line-document-file-mid",
                "icon-line-document-file-3gp",
                "icon-line-document-file-aiff",
                "icon-line-document-file-aac",
                "icon-line-document-file-wav",
                "icon-line-document-file-zip",
                "icon-line-document-file-ott",
                "icon-line-document-file-tgz",
                "icon-line-document-file-dmg",
                "icon-line-document-file-iso",
                "icon-line-document-file-rar",
                "icon-line-document-file-gif"
            ];
            this.hawfill = [
                "icon-fill-mail-envelope",
                "icon-fill-mail-envelope-open",
                "icon-fill-mail-envelope-closed",
                "icon-fill-mail-envelope-open2",
                "icon-fill-mail-envelope-open3",
                "icon-fill-mail-envelope-closed2",
                "icon-fill-mail-envelope-open4",
                "icon-fill-mail-error",
                "icon-fill-mail-checked",
                "icon-fill-mail-cancel",
                "icon-fill-mail--forbidden",
                "icon-fill-mail-add",
                "icon-fill-mail-remove",
                "icon-fill-flag",
                "icon-fill-flag2",
                "icon-fill-flag3",
                "icon-fill-flag4",
                "icon-fill-bookmark",
                "icon-fill-bookmark-add",
                "icon-fill-bookmark-remove",
                "icon-fill-eye-hidden",
                "icon-fill-eye",
                "icon-fill-star",
                "icon-fill-key",
                "icon-fill-key2",
                "icon-fill-trash-can",
                "icon-fill-trash-can2",
                "icon-fill-information",
                "icon-fill-information2",
                "icon-fill-book",
                "icon-fill-book-bookmark",
                "icon-fill-clipboard-edit",
                "icon-fill-clipboard-add",
                "icon-fill-clipboard-remove",
                "icon-fill-clipboard",
                "icon-fill-clipboard-download",
                "icon-fill-clipboard-upload",
                "icon-fill-clipboard-checked",
                "icon-fill-clipboard-text",
                "icon-fill-clipboard-list",
                "icon-fill-note",
                "icon-fill-note-add",
                "icon-fill-note-remove",
                "icon-fill-note-text",
                "icon-fill-note-list",
                "icon-fill-note-checked",
                "icon-fill-note-important",
                "icon-fill-notebook",
                "icon-fill-notebook2",
                "icon-fill-notebook3",
                "icon-fill-notebook4",
                "icon-fill-notebook-text",
                "icon-fill-notebook-list",
                "icon-fill-document",
                "icon-fill-document-text",
                "icon-fill-document-text2",
                "icon-fill-document-download",
                "icon-fill-document-upload",
                "icon-fill-document-bookmark",
                "icon-fill-document-diagrams",
                "icon-fill-document-recording",
                "icon-fill-document-table",
                "icon-fill-document-music",
                "icon-fill-document-movie",
                "icon-fill-document-play",
                "icon-fill-document-graph",
                "icon-fill-document-time",
                "icon-fill-document-text3",
                "icon-fill-document-code",
                "icon-fill-document-cloud",
                "icon-fill-documents",
                "icon-fill-documents2",
                "icon-fill-document-search",
                "icon-fill-document-star",
                "icon-fill-document-unlocked",
                "icon-fill-document-locked",
                "icon-fill-document-error",
                "icon-fill-document-cancel",
                "icon-fill-document-checked",
                "icon-fill-document-add",
                "icon-fill-document-remove",
                "icon-fill-document-forbidden",
                "icon-fill-document-information",
                "icon-fill-folder-information",
                "icon-fill-document-list",
                "icon-fill-document-font",
                "icon-fill-inbox",
                "icon-fill-inboxes",
                "icon-fill-inbox-document",
                "icon-fill-inbox-document-text",
                "icon-fill-inbox-download",
                "icon-fill-inbox-upload",
                "icon-fill-folder",
                "icon-fill-folder2",
                "icon-fill-folders",
                "icon-fill-folder-download",
                "icon-fill-folder-upload",
                "icon-fill-folder-unlocked",
                "icon-fill-folder-locked",
                "icon-fill-folder-search",
                "icon-fill-folder-error",
                "icon-fill-folder-cancel",
                "icon-fill-folder-checked",
                "icon-fill-folder-add",
                "icon-fill-folder-remove",
                "icon-fill-folder-forbidden",
                "icon-fill-folder-bookmark",
                "icon-fill-document-zip",
                "icon-fill-zip",
                "icon-fill-search",
                "icon-fill-search-plus",
                "icon-fill-search-minus",
                "icon-fill-lock",
                "icon-fill-lock-open",
                "icon-fill-lock-open2",
                "icon-fill-lock-stripes",
                "icon-fill-lock-rounded",
                "icon-fill-lock-rounded-open",
                "icon-fill-lock-rounded-open2",
                "icon-fill-combination-lock",
                "icon-fill-printer",
                "icon-fill-printer2",
                "icon-fill-printer-text",
                "icon-fill-printer-text2",
                "icon-fill-document-shred",
                "icon-fill-shredder",
                "icon-fill-document-scan",
                "icon-fill-cloud-download",
                "icon-fill-cloud-upload",
                "icon-fill-cloud-error",
                "icon-fill-cloud",
                "icon-fill-inbox-filled",
                "icon-fill-pen",
                "icon-fill-pen-angled",
                "icon-fill-document-edit",
                "icon-fill-document-certificate",
                "icon-fill-certificate",
                "icon-fill-package",
                "icon-fill-box",
                "icon-fill-box-filled",
                "icon-fill-box2",
                "icon-fill-box3",
                "icon-fill-box-bookmark",
                "icon-fill-tag-cord",
                "icon-fill-tag",
                "icon-fill-tags",
                "icon-fill-tag-add",
                "icon-fill-tag-remove",
                "icon-fill-tag-checked",
                "icon-fill-tag-cancel",
                "icon-fill-paperclip",
                "icon-fill-document-file-numbers",
                "icon-fill-document-file-pages",
                "icon-fill-document-file-app",
                "icon-fill-document-file-png",
                "icon-fill-document-file-pdf",
                "icon-fill-document-file-mp3",
                "icon-fill-document-file-mp4",
                "icon-fill-document-file-mov",
                "icon-fill-document-file-jpg",
                "icon-fill-document-file-key",
                "icon-fill-document-file-html",
                "icon-fill-document-file-css",
                "icon-fill-document-file-java",
                "icon-fill-document-file-psd",
                "icon-fill-document-file-ai",
                "icon-fill-document-file-bmp",
                "icon-fill-document-file-dwg",
                "icon-fill-document-file-eps",
                "icon-fill-document-file-tiff",
                "icon-fill-document-file-ots",
                "icon-fill-document-file-php",
                "icon-fill-document-file-py",
                "icon-fill-document-file-c",
                "icon-fill-document-file-sql",
                "icon-fill-document-file-rb",
                "icon-fill-document-file-cpp",
                "icon-fill-document-file-tga",
                "icon-fill-document-file-dxf",
                "icon-fill-document-file-doc",
                "icon-fill-document-file-odt",
                "icon-fill-document-file-xls",
                "icon-fill-document-file-docx",
                "icon-fill-document-file-ppt",
                "icon-fill-document-file-asp",
                "icon-fill-document-file-ics",
                "icon-fill-document-file-dat",
                "icon-fill-document-file-xml",
                "icon-fill-document-file-yml",
                "icon-fill-document-file-h",
                "icon-fill-document-file-exe",
                "icon-fill-document-file-avi",
                "icon-fill-document-file-odp",
                "icon-fill-document-file-dotx",
                "icon-fill-document-file-xlsx",
                "icon-fill-document-file-ods",
                "icon-fill-document-file-pps",
                "icon-fill-document-file-dot",
                "icon-fill-document-file-txt",
                "icon-fill-document-file-rtf",
                "icon-fill-document-file-m4v",
                "icon-fill-document-file-flv",
                "icon-fill-document-file-mpg",
                "icon-fill-document-file-qt",
                "icon-fill-document-file-mid",
                "icon-fill-document-file-3gp",
                "icon-fill-document-file-aiff",
                "icon-fill-document-file-aac",
                "icon-fill-document-file-wav",
                "icon-fill-document-file-zip",
                "icon-fill-document-file-ott",
                "icon-fill-document-file-tgz",
                "icon-fill-document-file-dmg",
                "icon-fill-document-file-iso",
                "icon-fill-document-file-rar",
                "icon-fill-document-file-gif"
            ];
        }
        StyleGlyphs.prototype.attached = function () { this.filter(); };
        StyleGlyphs.prototype.filter = function () {
            var _this = this;
            this.fIcomoon = _.filter(this.icomoon, function (c) { return c.indexOf(_this.filterText.toLowerCase()) > -1; });
            this.fHawLine = _.filter(this.hawline, function (c) { return c.indexOf(_this.filterText.toLowerCase()) > -1; });
            this.fHawFill = _.filter(this.hawfill, function (c) { return c.indexOf(_this.filterText.toLowerCase()) > -1; });
        };
        StyleGlyphs = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], StyleGlyphs);
        return StyleGlyphs;
    }());
    exports.StyleGlyphs = StyleGlyphs;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/styles/home',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StylesHome = (function () {
        function StylesHome(httpClient) {
            this.httpClient = httpClient;
            this.themes = aurelia_ui_framework_1.UIConstants['themes'].split(',');
            this.colors = aurelia_ui_framework_1.UIConstants['colors'].split(',');
            this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>abcdefghijklmnopqrstuvwxyz<br/>1234567890!@#$%^&*()';
        }
        StylesHome.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/styles/overview.md').then(function (md) { return _this.wiki = md; });
        };
        StylesHome = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], StylesHome);
        return StylesHome;
    }());
    exports.StylesHome = StylesHome;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/styles/typo',["require", "exports", "aurelia-framework", "aurelia-ui-framework"], function (require, exports, aurelia_framework_1, aurelia_ui_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StyleTypo = (function () {
        function StyleTypo(httpClient) {
            this.httpClient = httpClient;
        }
        StyleTypo.prototype.activate = function () {
            var _this = this;
            this.httpClient.text('docs/styles/typography.md').then(function (md) { return _this.wiki = md; });
        };
        StyleTypo = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_ui_framework_1.UIHttpService])
        ], StyleTypo);
        return StyleTypo;
    }());
    exports.StyleTypo = StyleTypo;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/styles/view',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StylesView = (function () {
        function StylesView() {
        }
        StylesView.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                {
                    route: 'home',
                    moduleId: './home',
                    title: 'Overview',
                    nav: true,
                    auth: false,
                    name: 'home'
                }, {
                    route: 'typo',
                    moduleId: './typo',
                    title: 'Typography',
                    nav: true,
                    auth: false,
                    name: 'typo'
                }, {
                    route: 'glyphs',
                    moduleId: './glyphs',
                    title: 'SVG Glyphs',
                    nav: true,
                    auth: false,
                    name: 'glyphs'
                }, {
                    route: 'flags',
                    moduleId: './flags',
                    title: 'Flag Icons',
                    nav: true,
                    auth: false,
                    name: 'flag'
                }, {
                    route: 'colors',
                    moduleId: './colors',
                    title: 'Color Charts',
                    nav: true,
                    auth: false,
                    name: 'colors'
                }
            ]);
        };
        StylesView = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], StylesView);
        return StylesView;
    }());
    exports.StylesView = StylesView;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/resources/elements/container',["require", "exports", "aurelia-framework", "kramed"], function (require, exports, aurelia_framework_1, kramed) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = (function () {
        function Container() {
            this.source = '';
            this.wiki = '';
            this.needRtl = false;
            this.dir = "ltr";
            this.currentView = 0;
            this.elSource = {};
            this.elWiki = {};
        }
        Container.prototype.attached = function () {
            if (this.source)
                this.elSource.innerHTML = this.renderHtml(this.source);
            if (this.wiki)
                this.elWiki.innerHTML = this.renderHtml(this.wiki);
        };
        Container.prototype.sourceChanged = function (newValue) {
            if (newValue)
                this.elSource.innerHTML = this.renderHtml(newValue);
        };
        Container.prototype.wikiChanged = function (newValue) {
            if (newValue)
                this.elWiki.innerHTML = this.renderHtml(newValue);
        };
        Container.prototype.renderHtml = function (html, hilight) {
            if (hilight === void 0) { hilight = true; }
            var rend = new kramed.Renderer();
            rend.code = function (code, lang) {
                if (hilight && window.hljs) {
                    code = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
                    window.hljs.configure({
                        useBR: true,
                        tabReplace: '    '
                    });
                    return "<pre><code class=\"hljs " + lang + " lang-" + lang + "\">" + window.hljs.highlightAuto(code, [lang]).value + '</code></pre>';
                }
                else {
                    return "<pre><code class=\"hljs " + lang + " lang-" + lang + "\">" + code + "</code></pre>";
                }
            };
            return kramed(html, {
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                renderer: rend
            });
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], Container.prototype, "pageTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], Container.prototype, "source", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], Container.prototype, "wiki", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], Container.prototype, "needRtl", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], Container.prototype, "dir", void 0);
        Container = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('x-container')
        ], Container);
        return Container;
    }());
    exports.Container = Container;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/samples/dashboard/dashboard',["require", "exports", "aurelia-framework", "amcharts"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SampleAdminDashboard = (function () {
        function SampleAdminDashboard() {
        }
        SampleAdminDashboard = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], SampleAdminDashboard);
        return SampleAdminDashboard;
    }());
    exports.SampleAdminDashboard = SampleAdminDashboard;
});



var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('src/samples/dashboard/view',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SampleAdmin = (function () {
        function SampleAdmin() {
        }
        SampleAdmin.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.map([
                {
                    route: '', redirect: 'home'
                },
                {
                    route: 'home',
                    moduleId: './dashboard',
                    title: 'Dashboard',
                    nav: true,
                    auth: false,
                    name: 'home'
                }
            ]);
        };
        SampleAdmin = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [])
        ], SampleAdmin);
        return SampleAdmin;
    }());
    exports.SampleAdmin = SampleAdmin;
});



define('src/samples/desktop/view',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SampleDesktop = (function () {
        function SampleDesktop() {
        }
        return SampleDesktop;
    }());
    exports.SampleDesktop = SampleDesktop;
});



define('text!src/app.html', ['module'], function(module) { module.exports = "<template><compose view=../glyphs/icomoon.svg></compose><compose view=../glyphs/hawcons-linear.svg></compose><compose view=../glyphs/hawcons-filled.svg></compose><div dir=ltr><ui-drawer ref=appDrawer close-on-click scroll close-glyph=glyph-none class=x-app-menu><a href=#/ class=x-app-menu-title slot=drawer-head><ui-row><ui-column auto class=ui-pad-h><img src=examples/images/logo.png width=36></ui-column><ui-column fill class=ui-margin-none><h6 class=ui-strong text-primary>${constants.Title} <small text-muted>Version ${constants.Version}</small></h6></ui-column></ui-row></a><ui-menu><ui-menu-group label.bind=routes.key repeat.for=\"routes of router.navigation | group:'settings.section'\" collapsible.bind=!!routes.key><ui-menu-item repeat.for=\"route of routes.items\" href.bind=route.href active.bind=\"app.routeActive(route, router.currentInstruction)\" icon.bind=route.settings.icon disabled.bind=route.settings.disabled>${route.settings.title || route.title}</ui-menu-item></ui-menu-group></ui-menu></ui-drawer><ui-viewport ribbon=\"message:v4 Work in Progress;theme:blue\"><ui-app-header><ui-drawer-toggle drawer.bind=appDrawer></ui-drawer-toggle><ui-app-title href=#/ class=\"${hideTitle && router.currentInstruction.fragment=='/'?'x-hide':''}\" src=examples/images/logo.png>${constants.Title}</ui-app-title></ui-app-header><ui-router-view></ui-router-view><ui-app-footer><span>&copy; 2017, Adarsh Pastakia<br><small>Version ${constants.Version}</small></span><div><a class=\"ui-link ui-hover-warning\" href=https://stackoverflow.com/questions/tagged/aurelia-ui-framework target=_blank css.bind=\"{fontSize: '2rem'}\"><ui-glyph glyph=icon-moon-stackoverflow></ui-glyph></a><span css.bind=\"{padding: '0 .7rem'}\"></span><a class=\"ui-link ui-hover-info\" href=https://github.com/adarshpastakia/aurelia-ui-framework target=_blank css.bind=\"{fontSize: '2rem'}\"><ui-glyph glyph=icon-moon-github></ui-glyph></a><span css.bind=\"{padding: '0 .7rem'}\"></span></div></ui-app-footer></ui-viewport></div></template>"; });
define('text!src/api/application.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=Application view-model.ref=container><p>Singleton class that provides application level methods and sharing of data between routes</p><hr><div class=ui-markdown><h6 class=x-title>Data Sharing</h6><ul><li><code>shared(propertyName)</code><p>Get shared property value</p></li><li><code>shared(propertyName, propertyValue)</code><p>Set shared property, pass &nbsp;<code>null</code>&nbsp; as value to delete property</p></li><li><code>session(propertyName)</code><p>Get session property value.<small class=\"ui-strong ui-text-red\">Uses sessionStorage</small></p></li><li><code>session(propertyName, propertyValue)</code><p>Set session property, pass &nbsp;<code>null</code>&nbsp; as value to delete property</p></li><li><code>persist(propertyName)</code><p>Get persistant property value.<small class=\"ui-strong ui-text-red\">Uses localStorage</small></p></li><li><code>persist(propertyName, propertyValue)</code><p>Set persistant property, pass &nbsp;<code>null</code>&nbsp; as value to delete property</p></li><li><code>clearSession()</code><p>Clear session state</p></li><li><code>clearPersist()</code><p>Clear persistant state</p></li></ul><h6 class=x-title>Event Loggers</h6><ul><li><code>log(tag, msg, ...rest)</code></li><li><code>info(tag, msg, ...rest)</code></li><li><code>warn(tag, msg, ...rest)</code></li><li><code>error(tag, msg, ...rest)</code></li></ul><h6 class=x-title>Authentication Methods</h6><ul><li><code>login({ username, token, remember }, nextRoute)</code><p>This method broadcasts event<code>auf:login</code></p></li><li><code>logout()</code><p>This method broadcasts event<code>auf:logout</code></p></li></ul></div><hr><h4 class=x-title>Basic Usage</h4><div class=\"ui-markdown x-section\" ref=basicUsage></div></x-container></ui-page></template>"; });
define('text!src/api/datamodel.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=\"Data Model\" wiki.bind=wiki source.bind=source><h4 class=x-title>DataModel Tester</h4><ui-row><ui-column size=lg-6><ui-form class=ui-border-all><div class=ui-pad-all><p text-muted>Personal Info</p><ui-input-group plain><ui-input-label>Model State?</ui-input-label><ui-input-addon if.bind=model.isDirty glyph=glyph-icon-no text-theme=red></ui-input-addon><ui-input-addon if.bind=!model.isDirty glyph=glyph-icon-yes text-theme=green></ui-input-addon><span>${model.isDirty ? 'Dirty' : 'Unchanged'}</span></ui-input-group><ui-input-group><ui-input-label required>First Name</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.firstName?'red':'green'\" glyph.bind=\"model.dirtyProps.firstName?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.firstName maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label required>Last Name</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.lastName?'red':'green'\" glyph.bind=\"model.dirtyProps.lastName?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.lastName maxlength=99 counter clear></ui-input></ui-input-group><ui-row nogutter><ui-column><ui-input-group><ui-input-label>Date of Birth</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.dob?'red':'green'\" glyph.bind=\"model.dirtyProps.dob?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-date date.bind=model.dob clear></ui-date></ui-input-group></ui-column><ui-column><ui-input-group><ui-input-label>Age</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.age?'red':'green'\" glyph.bind=\"model.dirtyProps.age?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input number.bind=model.age clear></ui-input></ui-input-group></ui-column></ui-row><hr><p text-muted>Contact Info</p><ui-input-group><ui-input-label required>Address</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.address1?'red':'green'\" glyph.bind=\"model.dirtyProps.address1?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.address1 maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label></ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.address2?'red':'green'\" glyph.bind=\"model.dirtyProps.address2?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.address2 maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label>City</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.city?'red':'green'\" glyph.bind=\"model.dirtyProps.city?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.city maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label>Country</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.model.country?'red':'green'\" glyph.bind=\"model.dirtyProps.country?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input value.bind=model.country maxlength=99 counter clear></ui-input></ui-input-group><hr><ui-input-group><ui-input-label>Email</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.email?'red':'green'\" glyph.bind=\"model.dirtyProps.email?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-input email value.bind=model.email maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label>Mobile</ui-input-label><ui-input-addon text-theme.bind=\"model.dirtyProps.phone?'red':'green'\" glyph.bind=\"model.dirtyProps.phone?'glyph-icon-no':'glyph-icon-yes'\"></ui-input-addon><ui-phone value.bind=model.phone clear></ui-phone></ui-input-group></div><ui-toolbar muted><ui-button-group separator=or><ui-button muted width=6em click.trigger=model.update()>Update</ui-button><ui-button light width=6em click.trigger=model.discard()>Discard</ui-button></ui-button-group><ui-filler></ui-filler><ui-button-group separator=or><ui-button muted width=6em click.trigger=model.reset()>Reset</ui-button><ui-button dark width=6em click.trigger=model.save()>Save</ui-button></ui-button-group></ui-toolbar></ui-form></ui-column><ui-column size=lg-6 padded><h6 class=x-title text-primary>Local Changes</h6><p><strong text-info>Update</strong><br>Update form changes locally. Model is still dirty since the data has not yet been saved.</p><p><strong text-info>Discard</strong><br>Discard any changes made since last update.</p><h6 class=x-title text-primary>Remote Changes</h6><p><strong text-info>Save</strong><br>Save form changes will update all field values and reset model dirty.</p><p><strong text-info>Reset</strong><br>Reset form changes back to original, regardless of update.</p><div class=x-section><blockquote><strong>NOTE</strong>Model dirty check works on &nbsp;<code>serializable</code>&nbsp; properties only.</blockquote></div></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/api/event.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=\"Event Manager\" view-model.ref=container><h4 class=x-title>Eventing Operations</h4><div class=ui-markdown><h6 class=x-title>Event Broadcast</h6><ul><li><code>broadcast(eventName, eventData)</code><p>Broadcast event</p></li><li><code>subscribe(eventName, callbackFn):Disposable</code><p>Subscribe for broadcasted event</p></li></ul><h6 class=x-title>Property Observers</h6><ul><li><code>observe(object, propertyName, callbackFn):Disposable</code><p>Observe property changes</p></li><li><code>collection(collection, callbackFn):Disposable</code><p>Observe collection mutations</p></li></ul><h6 class=x-title>Aurelia Task Queues<small>Queues a task on the macro task queue for turn-based execution.</small></h6><ul><li><code>queueTask(taskFn)</code></li></ul></div><br><div class=x-section><blockquote><strong>NOTE</strong>Use &nbsp;<code>queueTask</code>&nbsp; when property changes affect DOM tree.</blockquote></div><hr><h4 class=x-title>Basic Usage</h4><div class=\"ui-markdown x-section\" ref=basicUsage></div></x-container></ui-page></template>"; });
define('text!src/api/http.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=\"HTTP Service\" wiki.bind=wiki source.bind=source><h4 class=x-title>Tester</h4><h6 class=x-title>Authenticate</h6><div class=ui-font-big><strong>Token:</strong> ${token}</div><h6 class=x-title>Send Request</h6><div><ui-button success icon-hilight glyph=icon-moon-checkmark click.trigger=testAuthenticator() busy.bind=\"fetching === 2\">Send actual Request</ui-button><ui-button danger icon-hilight glyph=icon-moon-cancel-circle click.trigger=testAuthenticator(true) busy.bind=\"fetching === 1\">Send bad Request</ui-button></div><h6 class=x-title>Response</h6><div><p class=ui-text-success if.bind=\"authPassed===true\">PASS</p><p class=ui-text-danger if.bind=\"authPassed===false\">FAIL</p><pre>${authResponse | json}</pre></div><hr><h5 class=x-title>Get Users</h5><h6 class=x-title>Send Request</h6><div><ui-button success icon-hilight glyph=icon-moon-checkmark click.trigger=testUsers() busy.bind=\"fetching === 4\">Send actual Request</ui-button><ui-button danger icon-hilight glyph=icon-moon-cancel-circle click.trigger=testUsers(true) busy.bind=\"fetching === 3\">Send unauthorized Request</ui-button></div><h6 class=x-title>Response</h6><div><p class=ui-text-success if.bind=\"usersPassed===true\">PASS</p><p class=ui-text-danger if.bind=\"usersPassed===false\">FAIL</p><pre>${usersResponse | json}</pre></div><hr><h5 class=x-title>Get User</h5><small>Missing query call, should fail on server and respond with 404</small><h6 class=x-title>Send Request</h6><div><ui-button success icon-hilight glyph=icon-moon-checkmark click.trigger=testUser() busy.bind=\"fetching === 7\">Send actual Request</ui-button><ui-button danger icon-hilight glyph=icon-moon-cancel-circle click.trigger=testUser(true) busy.bind=\"fetching === 6\">Send unauthorized Request</ui-button><ui-button info icon-hilight glyph=icon-moon-stop click.trigger=testUser(0) busy.bind=\"fetching === 5\">Send bad Route</ui-button></div><h6 class=x-title>Response</h6><div><p class=ui-text-success if.bind=\"userPassed===true\">PASS</p><p class=ui-text-danger if.bind=\"userPassed===false\">FAIL</p><pre>${userResponse | json}</pre></div></x-container></ui-page></template>"; });
define('text!src/api/view.html', ['module'], function(module) { module.exports = "<template><ui-section row-layout animate><ui-sidebar label=\"API Classes\" collapsible scroll class=ui-hidden-lg-down><ui-menu><ui-menu-item repeat.for=\"route of router.navigation\" href.bind=route.href active.bind=route.isActive icon.bind=route.settings.icon disabled.bind=route.settings.disabled>${route.settings.title || route.title}</ui-menu-item></ui-menu></ui-sidebar><ui-router-view></ui-router-view></ui-section></template>"; });
define('text!src/components/alerts.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Alerts need-rtl=true><h4 class=x-title>Toast Messages</h4><div ref=alertHolder></div><ui-fieldset legend=Toasts><ui-row><ui-column fill padded><ui-input-group><ui-input-label>Title</ui-input-label><ui-input value.bind=toast.title clear></ui-input></ui-input-group></ui-column><ui-column fill padded><ui-input-group><ui-input-label>Message</ui-input-label><ui-input value.bind=toast.message></ui-input></ui-input-group></ui-column></ui-row><ui-row><ui-column fill padded><ui-option-group name=theme value.bind=toast.theme cols=4><ui-input-label>Theme</ui-input-label><ui-radio value=light>Light</ui-radio><ui-radio value=dark>Dark</ui-radio><ui-radio value=primary>Primary</ui-radio><ui-radio value=secondary>Secondary</ui-radio><ui-radio value=info>Info</ui-radio><ui-radio value=danger>Danger</ui-radio><ui-radio value=success>Success</ui-radio><ui-radio value=warning>Warning</ui-radio></ui-option-group></ui-column><ui-column fill padded><ui-row><ui-column fill><ui-input-group plain><ui-input-label>Glyph</ui-input-label><ui-dropdown value.bind=toast.glyph glyph.bind=toast.glyph width=10em><ui-list-item value=\"\">None</ui-list-item><ui-list-item value=glyph-alert-info glyph=glyph-alert-info>Info</ui-list-item><ui-list-item value=glyph-alert-exclaim glyph=glyph-alert-exclaim>Exclaim</ui-list-item><ui-list-item value=glyph-alert-question glyph=glyph-alert-question>Question</ui-list-item><ui-list-item value=glyph-alert-error glyph=glyph-alert-error>Error</ui-list-item><ui-list-item value=glyph-alert-notif glyph=glyph-alert-notif>Notification</ui-list-item></ui-dropdown></ui-input-group></ui-column><ui-column width=14em><ui-input-group><ui-input-label width=7em>Timeout</ui-input-label><ui-input number.bind=toast.timeout></ui-input></ui-input-group></ui-column></ui-row></ui-column></ui-row><ui-toolbar><ui-button small click.trigger=toastAlert()>Viewport Toast</ui-button><ui-button small click.trigger=inlineToast()>Inline Toast</ui-button></ui-toolbar></ui-fieldset><h4 class=x-title>Alerts</h4><ui-fieldset legend=Alerts><ui-row><ui-column fill padded><ui-input-group><ui-input-label>Title</ui-input-label><ui-input value.bind=alert.title clear></ui-input></ui-input-group></ui-column><ui-column fill padded><ui-input-group><ui-input-label>Message</ui-input-label><ui-input value.bind=alert.message></ui-input></ui-input-group></ui-column></ui-row><ui-row><ui-column fill padded><ui-input-group><ui-input-label>Button Labels</ui-input-label><ui-input-addon glyph=glyph-icon-yes bg-light text-success></ui-input-addon><ui-input value.bind=alert.okLabel info=\"Ok Label\"></ui-input><ui-input-addon glyph=glyph-icon-no bg-light text-danger></ui-input-addon><ui-input value.bind=alert.cancelLabel info=\"Cancel Label\"></ui-input></ui-input-group></ui-column><ui-column fill padded><ui-input-group plain><ui-input-label>Glyph</ui-input-label><ui-dropdown value.bind=alert.glyph glyph.bind=alert.glyph width=8em><ui-list-item value=\"\">None</ui-list-item><ui-list-item value=glyph-alert-info glyph=glyph-alert-info>Info</ui-list-item><ui-list-item value=glyph-alert-exclaim glyph=glyph-alert-exclaim>Exclaim</ui-list-item><ui-list-item value=glyph-alert-question glyph=glyph-alert-question>Question</ui-list-item><ui-list-item value=glyph-alert-error glyph=glyph-alert-error>Error</ui-list-item></ui-dropdown></ui-input-group></ui-column></ui-row><ui-toolbar><ui-button light small click.trigger=openAlert()>Show Alert</ui-button><ui-button light small click.trigger=openPrompt()>Show Prompt</ui-button><ui-button light small click.trigger=openConfirm()>Show Confirm</ui-button></ui-toolbar></ui-fieldset></x-container></ui-page></template>"; });
define('text!src/components/dialogs.html', ['module'], function(module) { module.exports = "<template><ui-page animate><style>.event-console{border:1px solid #f0f0f0;border-radius:5px;font-size:13px;height:400px;line-height:2;overflow:auto;font-family:monospace;background:#333;color:#fff}.event-console .tag{color:tomato;padding:0 10px}.event-console .time{color:#4682b4;padding:0 10px}.event-console .event{color:#708090;padding:0 10px}</style><x-container source.bind=source wiki.bind=wiki page-title=Dialogs need-rtl=true dir.bind=dir><ui-row dir=ltr><ui-column fill padded><ui-button light click.trigger=openDialog(true)>Show Modal</ui-button><ui-button light click.trigger=openDialog(false)>Open Dialog</ui-button></ui-column><ui-column fill padded><div class=ui-text-primary>Lifecycle Console</div><div class=event-console ref=evtConsole></div></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/components/dlg-view.html', ['module'], function(module) { module.exports = "<template><require from=./dlg-lifecycle></require><ui-content padded scroll><dlg-lifecycle lifecycle.trigger=\"printConsole('Child View', $event.detail)\"></dlg-lifecycle><compose view=../home/lipsum-small.html></compose></ui-content><ui-loader busy.bind=closing></ui-loader></template>"; });
define('text!src/components/drawer.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Drawers need-rtl=true><div class=x-view><ui-section><ui-toolbar class=ui-font-large><ui-drawer-toggle drawer.bind=drawerLeft></ui-drawer-toggle><ui-filler></ui-filler><ui-drawer-toggle drawer.bind=drawerRight glyph=glyph-handle-overflow></ui-drawer-toggle></ui-toolbar><ui-drawer ref=drawerLeft position=start scroll padded><compose view=../home/lipsum-small.html></compose></ui-drawer><ui-drawer ref=drawerRight position=end scroll padded><compose view=../home/lipsum-small.html></compose></ui-drawer><ui-content padded scroll><compose view=../home/lipsum-big.html></compose></ui-content></ui-section></div></x-container></ui-page></template>"; });
define('text!src/components/indicators.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=\"Breadcrumbs & Chips\" need-rtl=true><h4 class=x-title>Value Chips</h4><h6 class=x-title>Themed</h6><ui-row middle><ui-chip repeat.for=\"c of themes\" theme.bind=c label.bind=c>99</ui-chip></ui-row><h6 class=x-title>Extra Colors</h6><ui-row middle><ui-chip width=9em repeat.for=\"c of colors\" theme.bind=c label.bind=c removable>99</ui-chip></ui-row><h6 class=x-title>Styles</h6><ui-row middle><ui-chip primary label=Large large removable>99</ui-chip><ui-chip theme=pink label=Normal normal removable>99</ui-chip><ui-chip secondary label=Small small removable>99</ui-chip></ui-row><hr><h4 class=x-title>Breadcrumbs</h4><ui-row><ui-column fill><ui-breadcrumb change.trigger=changeTab($event) theme.bind=c repeat.for=\"c of themes\"><ui-crumb repeat.for=\"c of 4\" id.bind=c>${crumbs[c]}</ui-crumb></ui-breadcrumb></ui-column><ui-column fill><ui-breadcrumb class=ui-themed change.trigger=changeTab($event) repeat.for=\"c of themes\" theme.bind=c><ui-crumb repeat.for=\"c of 4\" id.bind=c>${crumbs[c]}</ui-crumb></ui-breadcrumb></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/components/menu.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Menus need-rtl=true><h4 class=x-title>Menubar</h4><ui-menubar class=ui-border-all><ui-menu-item active.bind=!mbactive click.trigger=\"mbactive=0\" glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item active.bind=\"mbactive==1\" click.trigger=\"mbactive=1\" glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item active.bind=\"mbactive==2\" click.trigger=\"mbactive=2\" glyph=icon-moon-bin>Delete</ui-menu-item><ui-divider></ui-divider><ui-menu-item active.bind=\"mbactive==3\" click.trigger=\"mbactive=3\" glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item active.bind=\"mbactive==4\" click.trigger=\"mbactive=4\" glyph=icon-moon-cog>Settings</ui-menu-item></ui-menubar><br><ui-menubar class=ui-border-all><ui-menu-group label=Actions><ui-menu-item active.bind=\"mgactive==1\" click.trigger=\"mgactive=1\" glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item active.bind=\"mgactive==2\" click.trigger=\"mgactive=2\" glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item active.bind=!mgactive click.trigger=\"mgactive=0\" glyph=icon-moon-bin>Delete</ui-menu-item></ui-menu-group><ui-menu-group label=Options><ui-menu-item active.bind=\"mgactive==3\" click.trigger=\"mgactive=3\" glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item active.bind=\"mgactive==4\" click.trigger=\"mgactive=4\" glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu-group><ui-menu-group label=\"Social Networking\"><ui-menu-item glyph=icon-moon-google-plus>Google</ui-menu-item><ui-menu-item glyph=icon-moon-facebook>Facebook</ui-menu-item><ui-menu-item glyph=icon-moon-twitter>Twitter</ui-menu-item><ui-menu-item glyph=icon-moon-linkedin2>LinkedIn</ui-menu-item><ui-menu-item glyph=icon-moon-instagram>Instagram</ui-menu-item></ui-menu-group><ui-menu-group label=\"Other Sites\"><ui-menu-item glyph=icon-moon-yahoo2>Yahoo!</ui-menu-item><ui-menu-item glyph=icon-moon-youtube>YouTube</ui-menu-item><ui-menu-item glyph=icon-moon-dribbble>Dribbble</ui-menu-item><ui-menu-item glyph=icon-moon-flickr>Flickr</ui-menu-item><ui-menu-item glyph=icon-moon-pinterest>Pinterest</ui-menu-item></ui-menu-group></ui-menubar><br><div class=x-section><blockquote><strong>Known Issue</strong>Menubar overflow broken in RTL layout</blockquote></div><hr><h4 class=x-title>Menus</h4><ui-menu ref=btnMenu><ui-menu-section>Actions</ui-menu-section><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item glyph=icon-moon-bubbles4 badge-dark=9>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu><ui-menu ref=btnColumnMenu><ui-row><ui-column><ui-menu-section>Actions</ui-menu-section><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-column><ui-column><ui-menu-section>Social Networking</ui-menu-section><ui-menu-item glyph=icon-moon-google-plus>Google</ui-menu-item><ui-menu-item glyph=icon-moon-facebook>Facebook</ui-menu-item><ui-menu-item glyph=icon-moon-twitter>Twitter</ui-menu-item><ui-menu-item glyph=icon-moon-linkedin2>LinkedIn</ui-menu-item><ui-menu-item glyph=icon-moon-instagram>Instagram</ui-menu-item></ui-column><ui-column><ui-menu-section>Other Sites</ui-menu-section><ui-menu-item glyph=icon-moon-yahoo2>Yahoo!</ui-menu-item><ui-menu-item glyph=icon-moon-youtube>YouTube</ui-menu-item><ui-menu-item glyph=icon-moon-dribbble>Dribbble</ui-menu-item><ui-menu-item glyph=icon-moon-flickr>Flickr</ui-menu-item><ui-menu-item glyph=icon-moon-pinterest>Pinterest</ui-menu-item></ui-column></ui-row></ui-menu><ui-row><ui-column size=md-4 padded><h6 class=x-title>Button Menu</h6><ui-button light dropdown.bind=btnMenu>Open Me</ui-button><hr><h6 class=x-title>Button Menu Columns</h6><ui-button light dropdown.bind=btnColumnMenu>Open Me</ui-button></ui-column><ui-column size=md-4 padded><h6 class=x-title>Inline Menu</h6><ui-menu class=\"ui-border-all ui-inline\"><ui-menu-section>Actions</ui-menu-section><ui-menu-item active.bind=\"mnactive==1\" click.trigger=\"mnactive=1\" glyph=icon-moon-pencil2 description=\"Edit user profile\">Edit</ui-menu-item><ui-menu-item active.bind=\"mnactive==2\" click.trigger=\"mnactive=2\" glyph=icon-moon-search description=\"Search user by username/email\">Search</ui-menu-item><ui-menu-item active.bind=\"mnactive==3\" click.trigger=\"mnactive=3\" glyph=icon-moon-bin description=\"Delete user profile\">Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item active.bind=!mnactive click.trigger=\"mnactive=0\" glyph=icon-moon-bubbles4 badge-dark=9>Notifications</ui-menu-item><ui-menu-item active.bind=\"mnactive==4\" click.trigger=\"mnactive=4\" glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu></ui-column><ui-column size=md-4 padded><h6 class=x-title>Simple Dropdown</h6><ui-dropdown width=10em value=1><ui-list-item value=1>Mobile</ui-list-item><ui-list-item value=2>Work</ui-list-item><ui-list-item value=3>Home</ui-list-item></ui-dropdown><ui-dropdown width=10em glyph=glyph-icon-email value=1><ui-list-item value=1>Mobile</ui-list-item><ui-list-item value=2>Work</ui-list-item><ui-list-item value=3>Home</ui-list-item></ui-dropdown><ui-dropdown width=10em glyph=glyph-icon-email class=ui-invalid><ui-list-item value=1>Mobile</ui-list-item><ui-list-item value=2>Work</ui-list-item><ui-list-item value=3>Home</ui-list-item></ui-dropdown></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/components/panel.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Panels need-rtl=true><h4 class=x-title>Basic Panels</h4><ui-row><ui-column size=lg-6 padded><ui-panel height=20em><ui-panel-body padded scroll><compose view=../home/lipsum-small.html></compose></ui-panel-body></ui-panel></ui-column><ui-column size=lg-6 padded><ui-panel height=20em><ui-header><ui-header-title>Panel Title</ui-header-title><ui-header-tool refresh disabled.bind=1></ui-header-tool><ui-header-tool collapse></ui-header-tool></ui-header><ui-panel-body padded scroll><compose view=../home/lipsum-small.html></compose></ui-panel-body></ui-panel></ui-column><ui-column size=lg-6 padded><ui-panel height=20em><ui-header dark><ui-header-title glyph=glyph-icon-page>Panel Title</ui-header-title><ui-dropdown value=page><ui-list-item value=page>Page</ui-list-item><ui-list-item value=site>Site</ui-list-item></ui-dropdown><ui-header-tool expand></ui-header-tool><ui-header-tool collapse></ui-header-tool></ui-header><ui-panel-body padded scroll><compose view=../home/lipsum-small.html></compose></ui-panel-body></ui-panel></ui-column><ui-column size=lg-6 padded><ui-panel height=20em><ui-header primary><ui-header-title glyph=glyph-icon-page icon-hilight>Panel Title</ui-header-title><ui-dropdown value=page><ui-list-item value=page>Page</ui-list-item><ui-list-item value=site>Site</ui-list-item></ui-dropdown><ui-header-tool expand></ui-header-tool><ui-header-tool collapse></ui-header-tool></ui-header><ui-panel-body padded scroll><compose view=../home/lipsum-small.html></compose></ui-panel-body></ui-panel></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/components/sidebar.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Sidebars need-rtl=true><h4 class=x-title>Basic Sidebars</h4><div class=x-view><ui-section row-layout><ui-sidebar label=Sidebar padded scroll><compose view=../home/lipsum-small.html></compose></ui-sidebar><ui-content padded scroll><compose view=../home/lipsum-big.html></compose></ui-content><ui-sidebar collapsible label=Sidebar scroll padded position=end><compose view=../home/lipsum-small.html></compose></ui-sidebar></ui-section></div><hr><h4 class=x-title>Variant Sidebars</h4><div class=x-view><ui-section row-layout><ui-sidebar label=Sidebar mini-display scroll collapsible width=15em><ui-menu ref=btnMenu><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-divider></ui-divider><ui-menu-item glyph=icon-moon-bubbles4 badge-dark=9>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu></ui-sidebar><ui-content padded scroll><compose view=../home/lipsum-big.html></compose></ui-content><ui-sidebar compact scroll position=end><ui-menu ref=btnMenu><ui-menu-item glyph=icon-moon-pencil2></ui-menu-item><ui-menu-item glyph=icon-moon-search></ui-menu-item><ui-menu-item glyph=icon-moon-bin></ui-menu-item><ui-divider></ui-divider><ui-menu-item glyph=icon-moon-bubbles4></ui-menu-item><ui-menu-item glyph=icon-moon-cog></ui-menu-item></ui-menu></ui-sidebar></ui-section></div></x-container></ui-page></template>"; });
define('text!src/components/statsbar.html', ['module'], function(module) { module.exports = "<template><ui-page animate><ui-section row-layout><ui-statsbar vertical><ui-stat primary label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat secondary label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat info label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat danger label=Bugs glyph=\"fa fa-bug\">18.24K</ui-stat><ui-stat success label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat warning label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar><x-container wiki.bind=wiki source.bind=source page-title=Statsbar need-rtl=true><h6 class=x-title>Themed</h6><div class=ui-border-all><ui-statsbar><ui-stat primary icon-only label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat secondary icon-only label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat info icon-only label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat danger icon-only label=Likes glyph=icon-moon-heart>18.24K</ui-stat><ui-stat success icon-only label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat theme=teal icon-only label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar light><ui-stat bg-primary label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat bg-secondary label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat bg-info label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat bg-danger label=Likes glyph=icon-moon-heart>18.24K</ui-stat><ui-stat bg-success label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat bg-theme=teal label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar bg-primary><ui-stat label=Visits glyph=icon-moon-cloud>5.04K</ui-stat><ui-stat label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat label=Likes glyph=icon-moon-heart>18.24K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar bg-secondary><ui-stat label=Visits glyph=icon-moon-cloud>5.04K</ui-stat><ui-stat label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat label=Likes glyph=icon-moon-heart>18.24K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar bg-theme=lime dark><ui-stat label=Visits glyph=icon-moon-cloud>5.04K</ui-stat><ui-stat label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat label=Likes glyph=icon-moon-heart>18.24K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar theme=lime bg-dark><ui-stat label=Visits glyph=icon-moon-cloud>5.04K</ui-stat><ui-stat label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat label=Likes glyph=icon-moon-heart>18.24K</ui-stat></ui-statsbar></div><br><h6 class=x-title>Small</h6><div class=ui-border-all><ui-statsbar light small><ui-stat primary label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat secondary label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat info label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat danger label=Likes glyph=icon-moon-heart>18.24K</ui-stat><ui-stat success label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat theme=teal label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar></div><br><div class=ui-border-all><ui-statsbar light small><ui-stat bg-primary label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat bg-secondary label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat bg-info label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat bg-danger label=Likes glyph=icon-moon-heart>18.24K</ui-stat><ui-stat bg-success label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat bg-theme=teal label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar></div></x-container><ui-statsbar vertical small><ui-stat primary icon-only label=Users glyph=icon-moon-user>7.11K</ui-stat><ui-stat secondary icon-only label=Downloads glyph=icon-moon-download3>11.18K</ui-stat><ui-stat info icon-only label=Messages glyph=icon-moon-bubbles3>9.24K</ui-stat><ui-stat danger icon-only label=Likes glyph=icon-moon-heart>18.24K</ui-stat><ui-stat success icon-only label=Purchases glyph=icon-moon-star-full>2.49K</ui-stat><ui-stat theme=teal icon-only label=Visits glyph=icon-moon-cloud>5.04K</ui-stat></ui-statsbar></ui-section></ui-page></template>"; });
define('text!src/components/tabpanel.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=\"Tab Panels\" need-rtl=true><h4 class=x-title>Simple Tab Panel</h4><ui-row><ui-column size=\"md-6 sm-12\"><h6 class=x-title>Top</h6><div class=\"x-view ui-border-none\"><ui-tab-panel><ui-tab label=\"Tab 1\" padded scroll><compose view=../home/lipsum-big.html></compose></ui-tab><ui-tab label=\"Tab 2\" disabled></ui-tab><ui-tab label=\"Tab 3\" closeable padded scroll><compose view=../home/lipsum-small.html></compose></ui-tab></ui-tab-panel></div></ui-column><ui-column size=\"md-6 sm-12\"><h6 class=x-title>Bottom</h6><div class=\"x-view ui-border-none\"><ui-tab-panel bottom><ui-tab label=\"Tab 1\" padded scroll><compose view=../home/lipsum-big.html></compose></ui-tab><ui-tab label=\"Tab 2\" padded scroll><compose view=../home/lipsum-big.html></compose></ui-tab><ui-tab label=\"Tab 3\" padded scroll><compose view=../home/lipsum-big.html></compose></ui-tab></ui-tab-panel></div></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/components/toolbar.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Toolbars need-rtl=true><ui-menu ref=btnMenu><ui-menu-section>Actions</ui-menu-section><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu><h6 class=x-title>Default</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button glyph=icon-moon-bubbles4 badge-danger=9></ui-button><ui-divider></ui-divider><ui-button width=9em glyph=glyph-icon-page icon-hilight split theme=info split-theme=blue dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button success width=6em>Save</ui-button><ui-button danger width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Muted</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar muted><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split muted dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button muted width=6em>Save</ui-button><ui-button light width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Dark</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar dark><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split dark dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button dark width=6em>Save</ui-button><ui-button muted width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Primary</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar primary><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split primary dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button primary width=6em>Save</ui-button><ui-button theme=pink width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Secondary</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar secondary><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split secondary dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button theme=pink width=6em>Save</ui-button><ui-button secondary width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Info</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar info><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split info dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button theme=blue width=6em>Save</ui-button><ui-button info width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Danger</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar danger><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split danger dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button theme=red width=6em>Save</ui-button><ui-button danger width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Success</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar success><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split success dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button theme=green width=6em>Save</ui-button><ui-button success width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div><h6 class=x-title>Warning</h6><div class=\"ui-border-all ui-border-light\"><ui-toolbar warning><ui-input-group><ui-input width=12em><ui-input-addon glyph=icon-fill-search></ui-input-addon></ui-input><ui-dropdown value=0><ui-list-item value=0>Site</ui-list-item><ui-list-item value=1>Posts</ui-list-item><ui-list-item value=2>Docs</ui-list-item></ui-dropdown></ui-input-group><ui-filler></ui-filler><ui-button width=9em glyph=glyph-icon-page icon-hilight split warning dropdown.bind=btnMenu>Click</ui-button><ui-divider></ui-divider><ui-button-group separator=or><ui-button theme=amber width=6em>Save</ui-button><ui-button warning width=6em>Cancel</ui-button></ui-button-group></ui-toolbar></div></x-container></ui-page></template>"; });
define('text!src/core/grid.html', ['module'], function(module) { module.exports = "<template><x-container source.bind=source wiki.bind=wiki page-title=\"Responsive Layout\"><style>.col-view{border:1px solid #f877a8;background:#9777a8;min-height:3rem;line-height:3rem;text-align:center;color:#fff}.col-visi{border:1px dashed #f877a8;background:#efcbdd;line-height:3rem;text-align:center;color:#454545}</style><h4 class=x-title>Viewport Sizes</h4><div class=x-viewports><div class=x-xl></div><div class=x-lg></div><div class=x-md></div><div class=x-sm></div><div class=x-xs></div></div><h6 class=x-title>X-Large Viewport</h6><ui-row><ui-column size=xl-3><div class=col-view>X-Large 3</div></ui-column><ui-column size=xl-3><div class=col-view>X-Large 3</div></ui-column><ui-column size=xl-3><div class=col-view>X-Large 3</div></ui-column><ui-column size=xl-3><div class=col-view>X-Large 3</div></ui-column></ui-row><h6 class=x-title>Large Viewport</h6><ui-row><ui-column size=lg-3><div class=col-view>Large 3</div></ui-column><ui-column size=lg-3><div class=col-view>Large 3</div></ui-column><ui-column size=lg-3><div class=col-view>Large 3</div></ui-column><ui-column size=lg-3><div class=col-view>Large 3</div></ui-column></ui-row><h6 class=x-title>Medium Viewport</h6><ui-row><ui-column size=md-3><div class=col-view>Medium 3</div></ui-column><ui-column size=md-3><div class=col-view>Medium 3</div></ui-column><ui-column size=md-3><div class=col-view>Medium 3</div></ui-column><ui-column size=md-3><div class=col-view>Medium 3</div></ui-column></ui-row><h6 class=x-title>Small Viewport</h6><ui-row><ui-column size=sm-3><div class=col-view>Small 3</div></ui-column><ui-column size=sm-3><div class=col-view>Small 3</div></ui-column><ui-column size=sm-3><div class=col-view>Small 3</div></ui-column><ui-column size=sm-3><div class=col-view>Small 3</div></ui-column></ui-row><hr><h4 class=x-title>Visibility</h4><ui-row class=x-cards><ui-column size=sm-3><div class=\"col-visi ui-hide-sm-down\">Hidden >SM</div><div class=\"col-view ui-hide-sm-up\">Visible &lt;SM</div><p>ui-hide-sm-up</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-md-down\">Hidden >MD</div><div class=\"col-view ui-hide-md-up\">Visible &lt;MD</div><p>ui-hide-md-up</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-lg-down\">Hidden >LG</div><div class=\"col-view ui-hide-lg-up\">Visible &lt;LG</div><p>ui-hide-lg-up</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-xl-down\">Hidden >XL</div><div class=\"col-view ui-hide-xl-up\">Visible &lt;XL</div><p>ui-hide-xl-up</p></ui-column></ui-row><ui-row class=x-cards><ui-column size=sm-3><div class=\"col-visi ui-hide-sm-up\">Hidden &lt;SM</div><div class=\"col-view ui-hide-sm-down\">Visible >SM</div><p>ui-hide-sm-down</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-md-up\">Hidden &lt;MD</div><div class=\"col-view ui-hide-md-down\">Visible >MD</div><p>ui-hide-md-down</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-lg-up\">Hidden &lt;LG</div><div class=\"col-view ui-hide-lg-down\">Visible >LG</div><p>ui-hide-lg-down</p></ui-column><ui-column size=sm-3><div class=\"col-visi ui-hide-xl-up\">Hidden &lt;XL</div><div class=\"col-view ui-hide-xl-down\">Visible >XL</div><p>ui-hide-xl-down</p></ui-column></ui-row></x-container></template>"; });
define('text!src/core/page.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=\"Page Layouts\" need-rtl=true><h4 class=x-title>Simple Page</h4><div class=x-view><ui-page page-title=\"My Title\"><ui-content padded scroll><compose view=../home/lipsum-big.html></compose></ui-content></ui-page></div><h4 class=x-title>Page w/ Sidebar</h4><div class=x-view><ui-page page-title=\"My Title\"><ui-section row-layout><ui-sidebar collapsible label=Sidebar padded scroll><compose view=../home/lipsum-small.html></compose></ui-sidebar><ui-content padded scroll><compose view=../home/lipsum-small.html></compose></ui-content><ui-sidebar position=end collapsible label=Sidebar padded scroll><ui-loader busy.bind=true large></ui-loader><compose view=../home/lipsum-small.html></compose></ui-sidebar></ui-section></ui-page></div><h4 class=x-title>Page w/ Toolbar</h4><div class=x-view><ui-page page-title=\"My Title\"><ui-section column-layout><ui-content padded scroll><compose view=../home/lipsum-big.html></compose></ui-content><ui-toolbar><ui-button dark>Save</ui-button><ui-button>Cancel</ui-button></ui-toolbar></ui-section></ui-page></div><h4 class=x-title>Page w/ multiple sections</h4><div class=x-view><ui-page page-title=\"My Title\"><ui-section column-layout><ui-section row-layout><ui-sidebar collapsible label=Sidebar padded scroll><compose view=../home/lipsum-small.html></compose></ui-sidebar><ui-content padded scroll><compose view=../home/lipsum-small.html></compose></ui-content><ui-sidebar position=end collapsible label=Sidebar padded scroll><compose view=../home/lipsum-small.html></compose></ui-sidebar></ui-section><ui-toolbar><ui-button dark>Save</ui-button><ui-button>Cancel</ui-button></ui-toolbar></ui-section></ui-page></div></x-container></ui-page></template>"; });
define('text!src/core/viewport.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Viewport><div class=x-view><div class=\"ui-viewport ui-row ui-row-v ui-align-stretch\" css.bind=\"{position: 'relative', width:'100%', height:'100%'}\"><ui-app-header><ui-app-title href=#>Application</ui-app-title></ui-app-header><ui-content padded><h6>Router View goes here</h6></ui-content><ui-app-footer><span>&copy; 2017, Company</span></ui-app-footer></div></div></x-container></ui-page></template>"; });
define('text!src/home/lipsum-big.html', ['module'], function(module) { module.exports = "<template><div class=ui-text-justify><p class=\"ui-para ui-emphasis\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac enim eget lectus consequat feugiat. Integer eu fermentum lacus, et feugiat mi. Mauris quis ex odio. Nulla ex ex, suscipit quis purus ut, sollicitudin consequat nulla. Vivamus pretium tellus dolor. Nulla ex mi, faucibus ut rhoncus quis, rhoncus ut lorem. In interdum id neque in dapibus. Nulla dignissim sagittis luctus. Quisque odio enim, vehicula vel lectus vel, scelerisque elementum felis. Aliquam pulvinar, ex eu pharetra consectetur, mi arcu consectetur ex, quis euismod nibh magna vitae ante. Maecenas finibus finibus ligula, ut ultrices sem convallis vel. Curabitur neque neque, bibendum ut est non, dapibus egestas eros. Suspendisse potenti. Maecenas tristique suscipit quam, quis consectetur ante. Morbi a mi eu dolor condimentum accumsan id in tellus. Cras mi mauris, egestas sit amet tortor faucibus, sagittis euismod metus.</p><p class=ui-para>Aliquam vestibulum vestibulum mauris. Sed nisl ipsum, consectetur vel purus eget, euismod aliquam velit. Suspendisse id consequat magna. Cras ultrices libero eu maximus ornare. Vivamus vulputate ipsum ut scelerisque pellentesque. Praesent sed est urna. Curabitur venenatis laoreet urna at rhoncus. Integer blandit eros mollis, sagittis sem id, dictum tortor. Quisque convallis ornare erat ut laoreet.</p><p class=ui-para>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nec neque rhoncus, sollicitudin purus lacinia, aliquam nibh. Nunc aliquam ex sed ligula varius, in porttitor ipsum feugiat. Pellentesque gravida enim ipsum, in fermentum felis ullamcorper id. Sed leo nibh, rutrum vitae dapibus eget, fermentum in diam. Maecenas dignissim ante et lorem ornare, at bibendum tellus tristique. Mauris sagittis erat tellus, ac accumsan sapien tristique ac. Duis nibh nisl, imperdiet non egestas eget, blandit id orci. Vivamus luctus sit amet dolor eget cursus. Maecenas orci nulla, rhoncus quis erat in, ornare euismod neque. Quisque vulputate elementum turpis, ac finibus leo. Donec nec nibh suscipit purus tristique elementum ac sed massa. Suspendisse sit amet dapibus ligula. Quisque lacinia erat vitae odio porttitor, nec dictum justo imperdiet.</p><p class=ui-para>Phasellus dolor tortor, scelerisque id rhoncus volutpat, scelerisque eu lorem. Quisque id nisi eget justo laoreet suscipit. Donec porttitor enim ipsum, sed semper urna gravida sed. Fusce scelerisque nisi sit amet massa imperdiet, a sollicitudin purus elementum. Sed justo nibh, mollis sed venenatis at, blandit vitae ligula. Vestibulum ac diam venenatis, lobortis metus vel, gravida mauris. Morbi porta, nisi sit amet efficitur dignissim, ex mauris dapibus metus, quis interdum massa urna quis purus. Fusce consectetur dolor et nunc pharetra gravida. Aliquam tempor, est eget tempus faucibus, magna turpis pharetra tortor, at accumsan enim leo vel ex. Cras malesuada libero vehicula erat vestibulum, in rhoncus magna rutrum.</p><p class=ui-para>Aliquam erat volutpat. Nunc mollis venenatis porttitor. Etiam bibendum sapien sit amet justo ultricies, nec pretium nibh dignissim. Vivamus efficitur dictum urna, ut posuere nunc hendrerit nec. Nullam pellentesque enim orci, non scelerisque eros ornare ac. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ac lorem sapien. Vestibulum sed elit eu arcu euismod sodales a quis lorem. Nunc gravida ac lectus non tempus. Aliquam id vestibulum ex. Aenean egestas rutrum dignissim. Donec et lacus et mauris porttitor commodo. Vestibulum massa orci, egestas ac aliquam id, vestibulum et erat.</p></div></template>"; });
define('text!src/home/lipsum-small.html', ['module'], function(module) { module.exports = "<template><div class=ui-text-justify><p class=\"ui-para ui-emphasis\"><span class=\"ui-text-info ui-bold\">Lorem ipsum</span>&nbsp;dolor sit amet, consectetur adipiscing elit. Duis ac enim eget lectus consequat feugiat. Integer eu fermentum lacus, et feugiat mi. Mauris quis ex odio. Nulla ex ex, suscipit quis purus ut, sollicitudin consequat nulla. Vivamus pretium tellus dolor. Nulla ex mi, faucibus ut rhoncus quis, rhoncus ut lorem. In interdum id neque in dapibus. Nulla dignissim sagittis luctus. Quisque odio enim, vehicula vel lectus vel, scelerisque elementum felis. Aliquam pulvinar, ex eu pharetra consectetur, mi arcu consectetur ex, quis euismod nibh magna vitae ante. Maecenas finibus finibus ligula, ut ultrices sem convallis vel. Curabitur neque neque, bibendum ut est non, dapibus egestas eros. Suspendisse potenti. Maecenas tristique suscipit quam, quis consectetur ante. Morbi a mi eu dolor condimentum accumsan id in tellus. Cras mi mauris, egestas sit amet tortor faucibus, sagittis euismod metus.</p></div></template>"; });
define('text!src/home/view.html', ['module'], function(module) { module.exports = "<template><ui-page animate class=x-home-page><ui-content class=ui-scroll scroll.trigger=\"hideTitle(container.scrollTop<48)\" ref=container><div class=x-banner><ui-container padded><h1 class=\"ui-display-1 ui-text-center\"><img src=examples/images/logo.png height=72 align=absmiddle> Aurelia UI Framework</h1><hr><h1 class=\"ui-display-3 ui-text-center ui-text-light\">A bespoke UI Framework for business applications</h1></ui-container></div><div class=\"x-banner ui-bg-secondary\"><ui-container padded><h4 class=ui-text-center>Features</h4><br><ui-row class=\"ui-text-start ui-pad-h\" middle space-around><ui-column size=\"md-5 sm-8\"><ui-row middle><ui-column padded auto><img align=left src=examples/images/feature-layout.svg width=64></ui-column><ui-column padded fill>Layout elements for creating pages with drawers, sidebars, tabs</ui-column></ui-row></ui-column><ui-column size=\"md-5 sm-8\"><ui-row middle><ui-column padded auto><img align=left src=examples/images/feature-input.svg width=64></ui-column><ui-column padded fill>Custom input elements for dates, phone numbers and markdown content</ui-column></ui-row></ui-column></ui-row><ui-row class=\"ui-text-start ui-pad-h\" middle space-around><ui-column size=\"md-5 sm-8\"><ui-row middle><ui-column padded auto><img align=left src=examples/images/feature-grid.svg width=64></ui-column><ui-column padded fill>Functional datagrid with sorting and resizeable column</ui-column></ui-row></ui-column><ui-column size=\"md-5 sm-8\"><ui-row middle><ui-column padded auto><img align=left src=examples/images/feature-theme.svg width=64></ui-column><ui-column padded fill>Completely themeable</ui-column></ui-row></ui-column></ui-row><br><br><ui-row center middle><a href=#/start class=big-button ribbon=\"message:Added;theme:primary ui-small\"><span t=home:start.title>Getting Started</span></a><a href=#/examples class=big-button ribbon=\"message:Todo;theme:danger ui-small\"><span t=home:examples.title>Examples</span></a><a href=https://adarshpastakia.github.io/auf-demo-v3 target=_blank class=\"noarrow big-button\"><span>Demo version 3</span></a></ui-row></ui-container></div><div class=x-body><ui-container padded><div class=ui-pad-all><h4 class=ui-text-primary>Styles &amp; Theme</h4></div><ui-row><ui-column auto repeat.for=\"route of router.navigation | filter:'settings.section':'Styling'\"><div class=ui-pad-all><a class=ui-link href.bind=route.href>${route.settings.title || route.title}</a></div></ui-column></ui-row><hr><div class=ui-pad-all><h4 class=ui-text-primary>Core Components</h4></div><ui-row><ui-column auto repeat.for=\"route of router.navigation | filter:'settings.section':'Core'\"><div class=ui-pad-all><a class=ui-link href.bind=route.href>${route.settings.title || route.title}</a></div></ui-column></ui-row><hr><div class=ui-pad-all><h4 class=ui-text-primary>Input Elements</h4></div><ui-row><ui-column auto repeat.for=\"route of router.navigation | filter:'settings.section':'Inputs'\"><div class=ui-pad-all><a href.bind=route.href class=\"ui-link ${route.settings.disabled?'disabled':''}\">${route.settings.title || route.title}</a></div></ui-column></ui-row><hr><div class=ui-pad-all><h4 class=ui-text-primary>Components</h4></div><ui-row><ui-column auto repeat.for=\"route of router.navigation | filter:'settings.section':'Components'\"><div class=ui-pad-all><a href.bind=route.href class=\"ui-link ${route.settings.disabled?'disabled':''}\">${route.settings.title || route.title}</a></div></ui-column></ui-row><hr><div class=ui-pad-all><h4 class=ui-text-primary>API Classes</h4></div><ui-row><ui-column auto repeat.for=\"route of router.navigation | filter:'settings.section':'API Classes'\"><div class=ui-pad-all><a href.bind=route.href class=\"ui-link ${route.settings.disabled?'disabled':''}\">${route.settings.title || route.title}</a></div></ui-column></ui-row><br><br></ui-container></div></ui-content></ui-page></template>"; });
define('text!src/inputs/buttons.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Buttons need-rtl=true><h4 class=x-title>Themes</h4><ui-row class=ui-titlecase><ui-button width=8em repeat.for=\"c of themes\" theme.bind=c>${c}</ui-button></ui-row><h6 class=x-title>Extras</h6><ui-row class=ui-titlecase><ui-button width=8em repeat.for=\"c of colors\" theme.bind=c>${c}</ui-button></ui-row><hr><h4 class=x-title>Variations</h4><h6 class=x-title>Sizes</h6><ui-row bottom class=x-cards><ui-column auto><ui-button glyph=\"fa fa-id-card\" width=7em small badge=value:9;theme:blue>Click</ui-button><p>small</p></ui-column><ui-column auto><ui-button glyph=\"fa fa-user-circle\" width=7em normal badge-success=9>Click</ui-button><p>normal</p></ui-column><ui-column auto><ui-button glyph=\"fa fa-handshake-o\" width=7em large badge-info=9>Click</ui-button><p>large</p></ui-column><ui-column auto><ui-button glyph=\"fa fa-bar-chart\" width=7em xlarge badge-danger=9>Click</ui-button><p>xlarge</p></ui-column></ui-row><h6 class=x-title>Icons</h6><ui-row middle class=x-cards><ui-column auto><ui-button glyph=glyph-icon-page></ui-button><p>only glyph</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page>Click</ui-button><p>glyph</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page>Click</ui-button><p>icon-start</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page icon-end>Click</ui-button><p>icon-end</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page icon-hilight>Click</ui-button><p>icon-hilight</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page icon-hilight icon-end>Click</ui-button><p>icon-hilight</p></ui-column><ui-column auto><ui-button width=7em glyph=glyph-icon-page icon-top>Click</ui-button><p>icon-top</p></ui-column></ui-row><h6 class=x-title>Badges</h6><ui-row bottom class=x-cards><ui-column auto><ui-button badge=value:9;theme:blue>Click</ui-button></ui-column><ui-column auto><ui-button width=7em badge-dark=9>Click</ui-button></ui-column><ui-column auto><ui-button width=7em badge-primary=9 glyph=glyph-icon-page icon-hilight>Click</ui-button></ui-column><ui-column auto><ui-button width=7em badge-secondary=9 glyph=glyph-icon-page icon-hilight icon-end>Click</ui-button></ui-column></ui-row><h6 class=x-title>Other Variants</h6><ui-row middle class=x-cards><ui-column auto><ui-button disabled.bind=true width=10em glyph=glyph-icon-page icon-hilight badge-dark=9>Click</ui-button><p>disabled</p></ui-column><ui-column auto><ui-button width=10em glyph=glyph-icon-page icon-hilight theme=info dropdown.bind=btnMenu>Click</ui-button><p>dropdown</p></ui-column><ui-column auto><ui-button width=10em glyph=glyph-icon-page split theme=success split-theme=green dropdown.bind=btnMenuColumned>Click</ui-button><p>split</p></ui-column><ui-column auto><ui-button-group separator=or><ui-button width=7em success width=\"\">Proceed</ui-button><ui-button width=7em info width=\"\">Recheck</ui-button><ui-button width=7em danger width=\"\">Cancel</ui-button></ui-button-group><p>grouped with separator</p></ui-column><ui-column auto><ui-button width=7em busy.bind=isBusy glyph=glyph-icon-page icon-hilight theme=info>Click</ui-button><ui-button width=7em busy.bind=isBusy glyph=glyph-icon-page icon-end icon-hilight theme=info>Click</ui-button><ui-switch theme=info on-label=busy checked.bind=isBusy></ui-switch><p>busy</p></ui-column></ui-row><div class=x-section><blockquote><strong>NOTE</strong>For button-group with separator use equal width buttons</blockquote></div><ui-menu ref=btnMenu><ui-menu-section>Actions</ui-menu-section><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu><ui-menu ref=btnMenuColumned><ui-row><ui-column><ui-menu-section>Actions</ui-menu-section><ui-menu-item glyph=icon-moon-pencil2>Edit</ui-menu-item><ui-menu-item glyph=icon-moon-search>Search</ui-menu-item><ui-menu-item glyph=icon-moon-bin>Delete</ui-menu-item><ui-menu-section>Options</ui-menu-section><ui-menu-item glyph=icon-moon-bubbles4>Notifications</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-column><ui-column><ui-menu-section>Social Networking</ui-menu-section><ui-menu-item glyph=icon-moon-google-plus>Google</ui-menu-item><ui-menu-item glyph=icon-moon-facebook>Facebook</ui-menu-item><ui-menu-item glyph=icon-moon-twitter>Twitter</ui-menu-item><ui-menu-item glyph=icon-moon-linkedin2>LinkedIn</ui-menu-item><ui-menu-item glyph=icon-moon-instagram>Instagram</ui-menu-item></ui-column><ui-column><ui-menu-section>Other Sites</ui-menu-section><ui-menu-item glyph=icon-moon-yahoo2>Yahoo!</ui-menu-item><ui-menu-item glyph=icon-moon-youtube>YouTube</ui-menu-item><ui-menu-item glyph=icon-moon-dribbble>Dribbble</ui-menu-item><ui-menu-item glyph=icon-moon-flickr>Flickr</ui-menu-item><ui-menu-item glyph=icon-moon-pinterest>Pinterest</ui-menu-item></ui-column></ui-row></ui-menu><hr><h4 class=x-title>Button Groups</h4><ui-row middle class=x-cards><ui-column auto><ui-button-group><ui-button secondary>Grouped</ui-button><ui-button success>Grouped</ui-button><ui-button warning>Grouped</ui-button><ui-button danger>Grouped</ui-button></ui-button-group><p>horizontal</p></ui-column><ui-column auto><ui-button-group vertical><ui-button secondary>Grouped</ui-button><ui-button success>Grouped</ui-button><ui-button warning>Grouped</ui-button><ui-button danger>Grouped</ui-button></ui-button-group><p>vertical</p></ui-column><ui-column auto><ui-button-group value=1 toggle><ui-button value=0 secondary>Grouped</ui-button><ui-button value=1 success>Grouped</ui-button><ui-button value=2 warning>Grouped</ui-button><ui-button value=3 danger>Grouped</ui-button></ui-button-group><p>toggle</p></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/inputs/content.html', ['module'], function(module) { module.exports = "<template><ui-page animate=animate><x-container source.bind=source wiki.bind=wiki page-title=\"Content Editor\" need-rtl=true><ui-form><ui-row><ui-column full=full><div style=width:24em><ui-input-group><ui-input-label align-top>Language</ui-input-label><ui-language value.bind=language dir.bind=dir languages.bind=\"model.languages | keys\" add.trigger=addLanguage($event.detail) remove.trigger=addLanguage($event.detail)></ui-language></ui-input-group></div><ui-input-group><ui-input-label align-top>Summary</ui-input-label><ui-input counter=counter clear=clear value.bind=model.languages[language].summary dir.bind=dir disabled.bind=!language></ui-input></ui-input-group><ui-input-group><ui-input-label align-top>Description</ui-input-label><ui-markdown info=\"GitHub Flavoured Markdown\" counter=counter clear=clear value.bind=model.languages[language].description dir.bind=dir disabled.bind=!language rows=20></ui-markdown></ui-input-group></ui-column></ui-row></ui-form></x-container></ui-page></template>"; });
define('text!src/inputs/dates.html', ['module'], function(module) { module.exports = "<template><ui-page animate=animate><x-container source.bind=source wiki.bind=wiki page-title=\"Date/Time Inputs\" need-rtl=true><ui-row><ui-column fill=fill padded=padded><ui-date-view datetime date.bind=date></ui-date-view><p>${date}</p><p>${date | date}</p><p>${date | date} ${date | time}</p></ui-column><ui-column fill=fill padded=padded><ui-input-group><ui-input-label>Date</ui-input-label><ui-date date.bind=date></ui-date></ui-input-group><ui-input-group><ui-input-label>Time</ui-input-label><ui-input-addon><small>Local Time</small></ui-input-addon><ui-date time=time date.bind=time></ui-date><ui-input-info if.bind=time>${time | utc | time} GMT</ui-input-info></ui-input-group><ui-input-group><ui-input-label>Date/Time</ui-input-label><ui-input-addon><small>Local Time</small></ui-input-addon><ui-date datetime=datetime date.bind=dttime min-date.bind=minDate></ui-date><ui-input-info if.bind=dttime>${dttime | utc | datetime} GMT</ui-input-info></ui-input-group><ui-input-group><ui-input-label>Date Range</ui-input-label><ui-date date.bind=date1></ui-date><ui-input-addon><small>TO</small></ui-input-addon><ui-date date.bind=date2 min-date.bind=date1></ui-date></ui-input-group></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/inputs/inputs.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=\"Textual Inputs\" need-rtl=true><ui-form><ui-row><ui-column full><ui-fieldset legend=\"Basic Inputs\"><div ref=inlineContainer></div><ui-row><ui-column form padded><ui-input-group><ui-input-label required>Text</ui-input-label><ui-input placeholder=\"Any text...\"><ui-input-addon><small class=ui-strong text-info>User</small></ui-input-addon></ui-input><ui-button secondary glyph=glyph-arrow-right></ui-button></ui-input-group><ui-input-group><ui-input-label>Password</ui-input-label><ui-input password placeholder=\"Any text...\"><ui-input-addon><small class=ui-strong text-success>Strong</small></ui-input-addon></ui-input></ui-input-group><ui-input-group><ui-input-label>Number</ui-input-label><ui-input number placeholder=\"Any number...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Decimal</ui-input-label><ui-input decimal placeholder=\"Any decimal...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Email</ui-input-label><ui-input email placeholder=user@domain.com><ui-input-addon text-info glyph=icon-moon-envelop></ui-input-addon></ui-input></ui-input-group><ui-input-group><ui-input-label>URL</ui-input-label><ui-input url placeholder=http://domain.com><ui-input-addon text-info glyph=icon-moon-link></ui-input-addon></ui-input></ui-input-group><ui-input-group><ui-input-label>Double Input</ui-input-label><ui-input decimal placeholder=Latitude... help-text=Latitude><ui-input-addon text-warning glyph=icon-moon-location></ui-input-addon></ui-input><ui-input decimal placeholder=Longitude... help-text=Longitude><ui-input-addon text-warning glyph=icon-moon-location></ui-input-addon></ui-input></ui-input-group></ui-column><ui-column form padded><ui-input-group><ui-input-label>Readonly</ui-input-label><ui-input readonly value=\"Input value...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Disabled</ui-input-label><ui-input disabled value=\"Input value...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Invalid</ui-input-label><ui-input value=\"Errored input...\" class=ui-invalid errors.bind=\"['Input required', 'Input must be minimum 5 characters']\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Clear</ui-input-label><ui-input clear value=\"Text value\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Counter</ui-input-label><ui-input counter value=\"Text value\"></ui-input><ui-input-info text-muted><ui-glyph text-danger glyph=icon-moon-lifebuoy></ui-glyph>Display remaining length</ui-input-info></ui-input-group></ui-column></ui-row><ui-row><ui-column form padded><hr><div text-primary>Phone Input</div><ui-input-group><ui-input-label>International</ui-input-label><ui-phone><ui-input-addon glyph=icon-moon-phone></ui-input-addon></ui-phone></ui-input-group><ui-input-group><ui-input-label>National</ui-input-label><ui-dropdown value=2><ui-list-item value=0>Home</ui-list-item><ui-list-item value=1>Work</ui-list-item><ui-list-item value=2>Mobile</ui-list-item></ui-dropdown><ui-phone country=us><ui-input-addon glyph=icon-line-phone></ui-input-addon></ui-phone></ui-input-group><hr><div text-primary>Multiline Input</div><ui-input-group><ui-input-label>Textarea</ui-input-label><ui-input-addon glyph=icon-moon-pencil></ui-input-addon><ui-textarea clear counter value=\"With auto-complete...\" auto-complete=Alpha,Bravo,Alfa-Bravo,Charlie,Delta,Echo,Foxtrot,Lima,Omega,Sigma,Theta,Zulu></ui-textarea><ui-button info>Go!</ui-button></ui-input-group><div class=x-section><blockquote><strong>Known Issue</strong>Auto-Complete list positioning broken in RTL layout</blockquote></div></ui-column><ui-column form padded><hr><div text-primary>File Inputs</div><ui-input-group><ui-input-label>File</ui-input-label><ui-input file placeholder=\"Any file...\"><ui-input-addon glyph=icon-moon-file-zip></ui-input-addon></ui-input></ui-input-group><ui-input-group><ui-input-label>File</ui-input-label><ui-file view-model.ref=files></ui-file></ui-input-group></ui-column></ui-row></ui-fieldset></ui-column><ui-column full><ui-fieldset legend=\"Optional Inputs\" checked><ui-row><ui-column form padded><h6 text-primary>Single</h6><ui-input-group><ui-input-label>Microsoft Live</ui-input-label><ui-input-addon><ui-radio name=rdis value=0 checked.bind=rdis change.trigger=\"ropt2=(ropt3='')\"></ui-radio></ui-input-addon><ui-input disabled.bind=\"rdis!=0\" value.bind=ropt1></ui-input></ui-input-group><ui-input-group><ui-input-label>Google</ui-input-label><ui-input-addon><ui-radio name=rdis value=1 checked.bind=rdis change.trigger=\"ropt1=(ropt3='')\"></ui-radio></ui-input-addon><ui-input disabled.bind=\"rdis!=1\" value.bind=ropt2></ui-input></ui-input-group><ui-input-group><ui-input-label>Facebook</ui-input-label><ui-input-addon><ui-radio name=rdis value=2 checked.bind=rdis change.trigger=\"ropt1=(ropt2='')\"></ui-radio></ui-input-addon><ui-input disabled.bind=\"rdis!=2\" value.bind=ropt3></ui-input></ui-input-group></ui-column><ui-column form padded><h6 text-primary>Multiple</h6><ui-input-group><ui-input-label>Google+</ui-input-label><ui-input-addon><ui-checkbox checked.bind=dis1 change.trigger=\"opt1=''\"></ui-checkbox></ui-input-addon><ui-input disabled.bind=!dis1 value.bind=opt1 placeholder=\"Google+ profile...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Facebook</ui-input-label><ui-input-addon><ui-checkbox checked.bind=dis2 change.trigger=\"opt2=''\"></ui-checkbox></ui-input-addon><ui-input disabled.bind=!dis2 value.bind=opt2 placeholder=\"Facebook profile...\"></ui-input></ui-input-group><ui-input-group><ui-input-label>Twitter</ui-input-label><ui-input-addon><ui-checkbox checked.bind=dis3 change.trigger=\"opt3=''\"></ui-checkbox></ui-input-addon><ui-input disabled.bind=!dis3 value.bind=opt3 placeholder=\"Twitter handle...\"></ui-input></ui-input-group></ui-column></ui-row></ui-fieldset></ui-column></ui-row></ui-form></x-container></ui-page></template>"; });
define('text!src/inputs/options.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container source.bind=source wiki.bind=wiki page-title=Options need-rtl=true><ui-row><ui-column fill><h4 class=x-title>Checkboxes</h4><ui-option-group cols=4><ui-input-label>Checkboxes</ui-input-label><ui-checkbox checked>Red</ui-checkbox><ui-checkbox>Green</ui-checkbox><ui-checkbox>Blue</ui-checkbox><ui-checkbox>Orange</ui-checkbox><ui-checkbox>Yellow</ui-checkbox><ui-checkbox>Purple</ui-checkbox><ui-checkbox>Indigo</ui-checkbox><ui-checkbox>Brown</ui-checkbox></ui-option-group></ui-column><ui-column fill><h4 class=x-title>Radios</h4><ui-option-group cols=3 value=square name=shapes><ui-input-label>Radios</ui-input-label><ui-radio value=line>Line</ui-radio><ui-radio value=square>Square</ui-radio><ui-radio value=circle>Circle</ui-radio><ui-radio value=ellipse>Ellipse</ui-radio><ui-radio value=star>Star</ui-radio><ui-radio value=triangle>Triangle</ui-radio></ui-option-group></ui-column></ui-row><hr><h4 class=x-title>Switches</h4><h6 class=x-title>Themed</h6><ui-row class=ui-titlecase><ui-column width=10em repeat.for=\"c of themes\"><ui-switch theme.bind=c value=1>${c}</ui-switch></ui-column><ui-column width=10em><ui-switch theme=ampm on-label=PM off-label=AM>AM/PM</ui-switch></ui-column><ui-column width=10em><ui-switch theme=gender on-label=Female off-label=Male size=4em>Gender</ui-switch></ui-column></ui-row><h6 class=x-title>Extras</h6><ui-row class=ui-titlecase><ui-column width=10em repeat.for=\"c of colors\"><ui-switch theme.bind=c value=1>${c}</ui-switch></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/inputs/validation.html', ['module'], function(module) { module.exports = "<template><ui-page animate=animate><x-container source.bind=source wiki.bind=wiki page-title=Validation need-rtl=true><ui-form><ui-toast danger glyph=glyph-alert-error timeout=0>Aurelia Validation seems to be broken</ui-toast><ui-row><ui-column fill><ui-fieldset legend=\"Personal Info\"><ui-input-group><ui-input-label required>First Name</ui-input-label><ui-dropdown value.bind=\"model.salutation & validate\"><ui-list-item repeat.for=\"s of salutations\" value.bind=s>${s}</ui-list-item></ui-dropdown><ui-input value.bind=\"model.firstName & validate\" maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group required><ui-input-label>Last Name</ui-input-label><ui-input value.bind=\"model.lastName & validate\" maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label>Location</ui-input-label><ui-input-addon glyph=icon-moon-location></ui-input-addon><ui-input decimal.bind=\"model.latitude & validate\" placeholder=Latitude... info=Latitude></ui-input><ui-input-addon glyph=icon-moon-location></ui-input-addon><ui-input decimal.bind=\"model.longitude & validate\" placeholder=Longitude... info=Longitude></ui-input></ui-input-group></ui-fieldset></ui-column><ui-column fill><ui-fieldset legend=Address><ui-input-group><ui-input-label required>Address</ui-input-label><ui-input value.bind=\"model.address1 & validate\" placeholder=Address... maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label></ui-input-label><ui-input value.bind=\"model.address2 & validate\" maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label required>City</ui-input-label><ui-input value.bind=\"model.city & validate\" placeholder=City... maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label>State</ui-input-label><ui-input value.bind=\"model.state & validate\" placeholder=State/Province... maxlength=99 counter clear></ui-input></ui-input-group><ui-input-group><ui-input-label required>Country</ui-input-label><ui-combo value.bind=\"model.country & validate\" options.bind=countries display-property=name value-property=iso2 icon-property=iso2 icon-class=ui-flag><ui-input-addon><span class=\"ui-flag ${model.country}\"></span></ui-input-addon></ui-combo></ui-input-group></ui-fieldset><ui-fieldset legend=\"Contact Info\"><ui-input-group><ui-input-label required>Email</ui-input-label><ui-input email name=email placeholder=user@domain.com value.bind=\"model.email & validate\"><ui-input-addon glyph=icon-moon-envelop></ui-input-addon></ui-input></ui-input-group><ui-input-group><ui-input-label required>Phone</ui-input-label><ui-dropdown value.bind=\"model.phoneType & validate\" default-text=--Choose--><ui-list-item value=home>Home</ui-list-item><ui-list-item value=work>Work</ui-list-item><ui-list-item value=mobile>Mobile</ui-list-item></ui-dropdown><ui-phone country.bind=model.country name=mobile value.bind=\"model.phone & validate\"></ui-phone></ui-input-group><ui-input-group><ui-input-label>Secondary Contact</ui-input-label><ui-input-addon><ui-checkbox checked.bind=model.hasSecondContact change.trigger=\"model.secondContact=''\"></ui-checkbox></ui-input-addon><ui-dropdown disabled.bind=!model.hasSecondContact value.bind=model.secondContactType><ui-list-item value=home>Home</ui-list-item><ui-list-item value=work>Work</ui-list-item><ui-list-item value=mobile>Mobile</ui-list-item></ui-dropdown><ui-phone disabled.bind=!model.hasSecondContact country.bind=model.country value.bind=\"model.secondContact & validate\"></ui-phone></ui-input-group></ui-fieldset></ui-column></ui-row></ui-form><ui-row end><ui-button click.trigger=validate() secondary>Validate</ui-button></ui-row></x-container></ui-page></template>"; });
define('text!src/samples/home.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=\"Sample Applications\"><ui-row around stretch><a href=#/examples:dashboard class=\"ui-border-all ui-column ui-column-auto ui-text-center\" css.bind=\"{width: '256px'}\"><img src=examples/images/app-dashboard.png width=100% height=192><h4>Executive Dashboard</h4><p text-dark>A simple executive dashboard, layout build using responsive grid and panels.</p></a><a href=#/examples:tabbed class=\"ui-border-all ui-column ui-column-auto ui-text-center\" css.bind=\"{width: '256px'}\"><img src=examples/images/wireframes/image.png width=100% height=192><h4>Tabbed Application</h4><p text-dark>A simple admin application, layout built using closable tabs.</p></a><a href=#/examples:desktop class=\"ui-border-all ui-column ui-column-auto ui-text-center\" css.bind=\"{width: '256px'}\"><img src=examples/images/app-desktop.png width=100% height=192><h4>Desktop Application</h4><p text-dark>A simple classic desktop styled application.</p></a></ui-row></x-container></ui-page></template>"; });
define('text!src/start/install.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=Installation><div class=x-started-guide><ol><li><h5 class=x-title-alt><span>Install NPM Modules</span></h5><p class=ui-para>To get started we will need to install some global npm modules.</p><div class=ui-markdown><pre><code class=lang-shell><span text-muted># Use npm to install yarn package manager and aurelia-cli.</span>\n\nnpm install yarn aurelia-cli -g</code></pre></div></li><li><h5 class=x-title-alt><span>Create an Aurelia application</span></h5><div class=ui-markdown><pre><code class=lang-shell><span text-muted># Create an application folder.</span>\n<span text-muted># Within your application folder</span>\n\n<span text-muted># Create a new aurelia application</span>\nau new --here</code></pre></div><div class=x-section><blockquote>Use SASS css pre-compiler</blockquote></div></li><li><h5 class=x-title-alt><span>Install the UI Framework</span></h5><div class=ui-markdown><pre><code class=lang-shell><span text-muted># Add the aurelia-ui-framework module.</span>\n\nyarn add aurelia-ui-framework</code></pre></div></li><li><h5 class=x-title-alt><span>Update the aurelia project</span></h5><div class=ui-markdown><p>Update the&nbsp;<code>aurelia_project/aurelia.json</code>&nbsp;file to include the framework and its dependencies<br>Add the following code to the&nbsp;<code>bundles</code>&nbsp;array.</p><pre><code class=lang-json>{\n  \"name\": \"framework-bundle.js\",\n  \"dependencies\": [\n    \"lodash\",\n    \"moment\",\n    \"numeral\",\n    \"aurelia-animator-css\",\n    \"aurelia-fetch-client\",\n    {\n      \"name\": \"auf-utility-library\",\n      \"path\": \"../node_modules/auf-utility-library\",\n      \"main\": \"index\"\n    },\n    {\n      \"name\": \"aurelia-ui-framework\",\n      \"path\": \"../node_modules/aurelia-ui-framework/dist/amd\",\n      \"main\": \"aurelia-ui-framework\"\n    },\n    {\n      \"name\": \"aurelia-validation\",\n      \"path\": \"../node_modules/aurelia-validation/dist/amd\",\n      \"main\": \"aurelia-validation\"\n    },\n    {\n      \"name\": \"kramed\",\n      \"path\": \"../node_modules/kramed/lib\",\n      \"main\": \"kramed\"\n    }\n  ]\n}</code></pre></div></li></ol></div></x-container></ui-page></template>"; });
define('text!src/start/prereq.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=\"Required Knowledge\"><div class=x-started-read><h5 class=x-title-alt><span>Get to know Aurelia</span></h5><p class=\"ui-para ui-emphasis\"><a href=//aurelia.io/ target=_blank class=\"ui-link ui-external\">Aurelia</a>&nbsp;is at the heart of this UI Framework. Getting to know aurelia would be a good place to start, to understand the framework and how it fits in the modern Single-Page-Application world of web development. Here are some useful links to help you get started, happy reading ☺︎.</p><ul class=x-checklist><li><a href=//aurelia.io/docs target=_blank class=\"ui-link ui-external\">Aurelia.io Docs</a><p class=x-explain>Aurelia documentation and usage guides</p></li><li><a href=//blog.aurelia.io target=_blank class=\"ui-link ui-external\">Aurelia Blog</a><p class=x-explain>Blogs by Aurelia core team to keep upto date with the latest happenings on aurelia</p></li><li><a href=//www.syncfusion.com/resources/techportal/details/ebooks/aurelia_succinctly target=_blank class=\"ui-link ui-external\">Aurelia Succintly</a><p class=x-explain>Aurelia Succintly is a free e-book for learning aurelia core concepts and main components useful for building aurelia applications</p></li></ul><hr><h5 class=x-title-alt><span>Node.js</span></h5><p class=\"ui-para ui-emphasis\"><a href=//nodejs.org/ target=_blank class=\"ui-link ui-external\">Node.js</a>&nbsp;is a program written in C++ that allows us to run JavaScript in the shell. It uses Chrome’s V8 JavaScript engine, and is essentially a runtime environment.</p><p>When it was first created, it was primarily targeted towards developing web servers in JavaScript. This was somewhat radical since JavaScript has traditionally been restricted to the client. However web developers recognized the benefits of using it for tooling and dependency management.</p><hr><h5 class=x-title-alt><span>SASS</span></h5><p class=\"ui-para ui-emphasis\"><a href=//sass-lang.com/ target=_blank class=\"ui-link ui-external\">SASS</a>&nbsp;, they call it CSS with superpowers. It is an extension of CSS that is used to add power and elegance to the basic language. It facilitates you to add variables, nested rules, mixins, inline imports, inheritance and more, all with fully CSS-compatible syntax.</p></div></x-container></ui-page></template>"; });
define('text!src/start/view.html', ['module'], function(module) { module.exports = "<template><ui-section row-layout animate><ui-sidebar label=\"Getting Started\" collapsible scroll class=ui-hidden-lg-down><ui-menu><ui-menu-item repeat.for=\"route of router.navigation\" href.bind=route.href active.bind=route.isActive icon.bind=route.settings.icon disabled.bind=route.settings.disabled>${route.settings.title || route.title}</ui-menu-item></ui-menu></ui-sidebar><ui-router-view></ui-router-view></ui-section></template>"; });
define('text!src/styles/colors.html', ['module'], function(module) { module.exports = "<template><style>.color-card{height:50px;position:relative;border:1px solid #e5e5e5}.color-card span{display:none;background:rgba(0,0,0,.5);color:#fff;left:0;right:0;bottom:0;top:0;line-height:1;height:2em;width:5em;cursor:pointer;text-transform:uppercase;text-align:center;font-size:1.2em;padding:.5em;margin:auto;position:absolute}.color-card:before{opacity:0;position:absolute;background:rgba(255,255,255,.65);color:#000;left:0;right:0;bottom:0;top:0;line-height:32px;padding:.5em;font-size:1.2em;margin:auto;text-align:center;content:'Copied!';transition:opacity .5s}.color-card.copied:before{opacity:1;z-index:10}.color-card:not(.copied):hover span{display:block}.offscreen{position:fixed;top:-100vh;left:-100vw}</style><ui-page animate><input ref=copyEl class=offscreen><x-container page-title=\"Color Charts\"><h4 class=x-title>Flat UI</h4><ui-row><ui-column padded style=max-width:120px width=120px repeat.for=\"key of flat | keys\"><div css.bind=\"{background: flat[key]}\" class=color-card><span class=ui-selectable click.trigger=\"doCopy($event, flat[key])\">${flat[key]}</span></div><div class=\"ui-ellipsis ui-text-center ui-font-small\">${key}</div></ui-column></ui-row><h4 class=x-title>Copic© Colors</h4><ui-row><ui-column padded style=max-width:120px width=120px repeat.for=\"key of copic | keys\"><div css.bind=\"{background: copic[key]}\" class=color-card><span class=ui-selectable click.trigger=\"doCopy($event, copic[key])\">${copic[key]}</span></div><div class=\"ui-ellipsis ui-text-center ui-font-small\">${key}</div></ui-column></ui-row><h4 class=x-title>Crayola© Colors</h4><ui-row><ui-column padded style=max-width:120px width=120px repeat.for=\"key of crayola | keys\"><div css.bind=\"{background: crayola[key]}\" class=color-card><span class=ui-selectable click.trigger=\"doCopy($event, crayola[key])\">${crayola[key]}</span></div><div class=\"ui-ellipsis ui-text-center ui-font-small\">${key}</div></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/styles/flags.html', ['module'], function(module) { module.exports = "<template><style>.flag-card{display:inline-block;border-radius:.5em;margin:.5em;width:128px;text-align:center}.flag-card .ui-flag{margin:.5rem auto;width:32px;height:21px}.flag-card .name{font-size:.8rem;overflow:hidden;line-height:1.5;white-space:nowrap;text-overflow:ellipsis}.flag-card .code{font-size:.6rem}.x-search-box{transition:width .5s}</style><ui-page animate><x-container page-title=\"Flag Icons\"><ui-input-group slot=x-search-bar class=x-search-box css.bind={width:elWidth} plain><ui-input value.bind=filterText focus.trigger=\"elWidth='20em'\" blur.trigger=\"elWidth='8em'\" input.trigger=\"filter() & debounce\" clear placeholder=Search...><ui-input-addon text-muted glyph=glyph-search></ui-input-addon></ui-input></ui-input-group><div><div class=ui-markdown><pre><code class=\"hljs lang-html\"><span class=hljs-tag>&lt;<span class=hljs-name>ui-glyph</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\"ui-flag {iso-code}\"</span>&gt;</span><span class=hljs-tag>&lt;/<span class=hljs-name>ui-glyph</span>&gt;</span></code></pre></div><div repeat.for=\"group of fCountries | sort:['continent','name'] | group:'continent'\"><h6 class=x-title>${group.key}</h6><ui-row><div class=\"flag-card ui-border-all ui-border-light\" repeat.for=\"c of group.items\"><ui-glyph class=\"ui-flag ${c.iso2}\"></ui-glyph><div class=name>${c.name}</div><div class=\"code ui-text-info ui-selectable\">${c.iso2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${c.iso3}</div></div></ui-row></div></div></x-container></ui-page></template>"; });
define('text!src/styles/glyphs.html', ['module'], function(module) { module.exports = "<template><style>.glyph-card{display:inline-block;border-radius:.5em;margin:.5em;width:8rem;height:8rem;text-align:center}.glyph-card .ui-icon{margin:1.5rem auto;font-size:2rem}.glyph-card .name{font-size:.8rem;line-height:1.5}.x-search-box{transition:width .5s}</style><ui-page animate><x-container page-title=\"SVG Glyphs\"><ui-input-group slot=x-search-bar class=x-search-box css.bind={width:elWidth} plain><ui-input value.bind=filterText focus.trigger=\"elWidth='20em'\" blur.trigger=\"elWidth='8em'\" input.trigger=\"filter() & debounce\" clear placeholder=Search...><ui-input-addon text-muted glyph=glyph-search></ui-input-addon></ui-input></ui-input-group><div><h4 show.bind=!filterText class=x-title>Framework Glyphs</h4><div show.bind=!filterText><div repeat.for=\"key of glyphs | keys\"><h6 class=x-title>${key}</h6><ui-row><div class=\"glyph-card ui-border-all ui-border-light\" repeat.for=\"c of glyphs[key]\"><ui-glyph glyph.bind=c class=ui-text-primary></ui-glyph><div class=\"name ui-selectable\">${c}</div></div></ui-row></div></div></div><h4 class=x-title>Add-On Glyphs</h4><h6 class=x-title><a href=https://icomoon.io target=_blank class=\"ui-link ui-external\">Icomoon Icons</a></h6><ui-row><div class=\"glyph-card ui-border-all ui-border-light\" repeat.for=\"c of fIcomoon | sort\" animate><ui-glyph class=ui-text-primary glyph.bind=c></ui-glyph><div class=\"name ui-selectable\">${c}</div></div></ui-row><h6 class=x-title><a href=http://hawcons.com target=_blank class=\"ui-link ui-external\">Hawcons Linear Icons</a></h6><ui-row><div class=\"glyph-card ui-border-all ui-border-light\" repeat.for=\"c of fHawLine | sort\"><ui-glyph class=ui-text-primary glyph.bind=c></ui-glyph><div class=\"name ui-selectable\">${c}</div></div></ui-row><h6 class=x-title><a href=http://hawcons.com target=_blank class=\"ui-link ui-external\">Hawcons Filled Icons</a></h6><ui-row><div class=\"glyph-card ui-border-all ui-border-light\" repeat.for=\"c of fHawFill | sort\"><ui-glyph class=ui-text-primary glyph.bind=c></ui-glyph><div class=\"name ui-selectable\">${c}</div></div></ui-row></x-container></ui-page></template>"; });
define('text!src/styles/home.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=Overview wiki.bind=wiki><style>.color-card{min-width:8rem;font-size:.9rem;text-align:center;padding:.5rem 1rem;margin:.25rem;line-height:1.5;display:inline-block;color:#fff}.ui-bg-light{color:#454545}</style><h4 class=x-title>Theme Colors</h4><div class=ui-pad-all><div class=\"color-card ui-titlecase ui-bg-${c}\" repeat.for=\"c of themes\">${c}</div></div><h6 class=x-title>Extra Colors</h6><div class=ui-pad-all><div class=\"color-card ui-titlecase ui-bg-${c}\" repeat.for=\"c of colors\">${c}</div></div><hr><h4 class=x-title>Fonts</h4><h6 class=x-title>Default</h6><p class=\"ui-pad-all ui-font-large\" innerhtml.bind=chars></p><h6 class=x-title>Serif</h6><p class=\"ui-pad-all ui-font-large ui-font-serif\" innerhtml.bind=chars></p><h6 class=x-title>Input</h6><p class=\"ui-pad-all ui-font-large ui-font-input\" innerhtml.bind=chars></p><h6 class=x-title>Fixed Width</h6><p class=\"ui-pad-all ui-font-large ui-font-fixed\" innerhtml.bind=chars></p></x-container></ui-page></template>"; });
define('text!src/styles/typo.html', ['module'], function(module) { module.exports = "<template><ui-page animate><x-container page-title=Typography wiki.bind=wiki><h6 class=x-title>Display Headings</h6><div class=ui-pad-all><h1 class=ui-display-1>Display Heading 1</h1><h1 class=ui-display-2>Display Heading 2</h1><h1 class=ui-display-3>Display Heading 3</h1></div><ui-row><ui-column size=md-6><h6 class=x-title>Headers</h6><div class=ui-pad-all><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3</h3><h4>Header 4</h4><h5>Header 5</h5><h6>Header 6</h6></div></ui-column><ui-column size=md-6 style=line-height:1.5><h6 class=x-title>Styles</h6><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Bold</div><div class=\"ui-col-fill ui-bold\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Strong</div><div class=\"ui-col-fill ui-strong\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Normal</div><div class=\"ui-col-fill ui-normal\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Italic</div><div class=\"ui-col-fill ui-italic\">Lorem ipsum dolor sit amet</div></div><h6 class=x-title>Sizes</h6><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Large</div><div class=\"ui-col-fill ui-font-large\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Big</div><div class=\"ui-col-fill ui-font-big\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Normal</div><div class=\"ui-col-fill ui-normal\">Lorem ipsum dolor sit amet</div></div><div class=\"ui-row ui-row-middle\"><div style=width:10em class=\"ui-thin ui-font-small\">Small</div><div class=\"ui-col-fill ui-font-small\">Lorem ipsum dolor sit amet</div></div></ui-column></ui-row><hr><h6 class=x-title>Paragraphs</h6><div class=ui-pad-all><p class=\"ui-para emphasis-large\"><b class=ui-text-info>Lorem ipsum</b>&nbsp; dolor sit amet, consectetur adipiscing elit. Etiam vel tincidunt eros, nec venenatis ipsum. Nulla hendrerit urna ex, id sagittis mi scelerisque vitae. Vestibulum posuere rutrum interdum. Sed ut ullamcorper odio, non pharetra eros. Aenean sed lacus sed enim ornare vestibulum quis a felis. Sed cursus nunc sit amet mauris sodales tempus.</p><p class=ui-para><em>Fusce mollis</em>&nbsp; sagittis elit ut maximus. Nullam blandit lacus sit amet luctus euismod. Duis luctus leo vel consectetur consequat. Phasellus ex ligula, pellentesque et neque vitae, elementum placerat eros. Proin eleifend odio nec velit lacinia suscipit. Morbi mollis ante nec dapibus gravida. In tincidunt augue eu elit porta, vel condimentum purus posuere.</p><p class=ui-para><u>Ut imperdiet</u>&nbsp; dignissim feugiat. Phasellus tristique odio eu justo dapibus, nec rutrum ipsum luctus. Ut posuere nec tortor eu ullamcorper. Etiam pellentesque tincidunt tortor, non sagittis nibh pretium sit amet. Sed neque dolor, blandit eu ornare vel, lacinia porttitor nisi. Vestibulum sit amet diam rhoncus, consectetur enim sit amet, interdum mauris. Praesent feugiat finibus quam, porttitor varius est egestas id.</p></div><hr><h6 class=x-title>Contextual Colors</h6><ui-row><ui-column size=md-6><div class=\"ui-text-primary ui-pad-all\">Primary Text</div><div class=\"ui-text-secondary ui-pad-all\">Secondary Text</div><div class=\"ui-text-light ui-pad-all\"><span class=ui-bg-dark>Light Text</span></div><div class=\"ui-text-muted ui-pad-all\">Muted Text</div><div class=\"ui-text-dark ui-pad-all\">Dark Text</div><div class=\"ui-text-info ui-pad-all\">Info Text</div><div class=\"ui-text-danger ui-pad-all\">Danger Text</div><div class=\"ui-text-success ui-pad-all\">Success Text</div><div class=\"ui-text-warning ui-pad-all\">Warning Text</div></ui-column><ui-column size=md-6><div class=\"ui-bg-primary ui-pad-all ui-text-white\">Primary Bg</div><div class=\"ui-bg-secondary ui-pad-all ui-text-white\">Secondary Bg</div><div class=\"ui-bg-light ui-pad-all ui-text-dark\">Light Bg</div><div class=\"ui-bg-muted ui-pad-all ui-text-white\">Muted Bg</div><div class=\"ui-bg-dark ui-pad-all ui-text-white\">Dark Bg</div><div class=\"ui-bg-info ui-pad-all ui-text-white\">Info Bg</div><div class=\"ui-bg-danger ui-pad-all ui-text-white\">Danger Bg</div><div class=\"ui-bg-success ui-pad-all ui-text-white\">Success Bg</div><div class=\"ui-bg-warning ui-pad-all ui-text-white\">Warning Bg</div></ui-column></ui-row></x-container></ui-page></template>"; });
define('text!src/styles/view.html', ['module'], function(module) { module.exports = "<template><ui-section row-layout animate><ui-sidebar label=\"Styles & Themes\" collapsible scroll class=ui-hidden-lg-down><ui-menu><ui-menu-item repeat.for=\"route of router.navigation\" href.bind=route.href active.bind=route.isActive icon.bind=route.settings.icon disabled.bind=route.settings.disabled>${route.settings.title || route.title}</ui-menu-item></ui-menu></ui-sidebar><ui-router-view></ui-router-view></ui-section></template>"; });
define('text!src/resources/elements/container.html', ['module'], function(module) { module.exports = "<template><ui-section column-layout><div class=\"ui-light-bg ui-border-b\"><ui-container><ui-row middle><ui-column fill><h4 class=ui-text-primary>${pageTitle}</h4></ui-column><div class=\"ui-column ui-column-auto\"><slot name=x-search-bar></slot></div><ui-column width=8em><ui-switch if.bind=needRtl class=ui-themed value.bind=dir on-label=rtl off-label=ltr on-value=rtl off-value=ltr></ui-switch></ui-column><a class=\"x-tab ${currentView==0?'x-tab-active':''}\" click.trigger=\"currentView=0\" tooltip-dark=Examples if.bind=\"source || wiki\"><ui-glyph glyph=icon-moon-eye></ui-glyph></a><a class=\"x-tab ${currentView==1?'x-tab-active':''}\" click.trigger=\"currentView=1\" tooltip-dark=Source if.bind=source><ui-glyph glyph=icon-moon-embed2></ui-glyph></a><a class=\"x-tab ${currentView==2?'x-tab-active':''}\" click.trigger=\"currentView=2\" tooltip-dark=Wiki if.bind=wiki><ui-glyph glyph=icon-moon-lab></ui-glyph></a></ui-row></ui-container></div><ui-content padded scroll show.bind=\"currentView===0\"><ui-container dir.bind=dir><slot></slot><br><br></ui-container></ui-content><ui-content padded scroll show.bind=\"currentView===1\"><ui-container><div class=\"x-section ui-markdown\" ref=elSource></div></ui-container></ui-content><ui-content padded scroll show.bind=\"currentView===2\"><ui-container><div class=\"x-section ui-markdown\" ref=elWiki></div></ui-container></ui-content></ui-section></template>"; });
define('text!src/samples/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template><ui-page animated><ui-row stretch class=\"ui-scroll ui-column-fill x-dash-grid\"><ui-column size=\"lg-9 md-6 sm-12\"><ui-panel class=\"x-dash-card bgDark\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-3 md-6 sm-12\"><ui-panel class=\"x-dash-card bgMedium\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-3 lg-6 md-12\" row=\"row stretch\"><ui-column size=\"lg-12 md-6 sm-12\"><ui-panel class=\"x-dash-card bgLight\" minheight=10em height=100%><ui-header><ui-header-title>Orders / Week</ui-header-title><ui-header-tool glyph=glyph-icon-cog></ui-header-tool></ui-header><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-12 md-6 sm-12\"><ui-panel class=\"x-dash-card bgLighter\" minheight=10em height=100%><ui-header><ui-header-title>Orders / Region</ui-header-title><ui-header-tool glyph=glyph-icon-cog></ui-header-tool></ui-header><ui-panel-body></ui-panel-body></ui-panel></ui-column></ui-column><ui-column size=\"lg-6 md-12\" row=\"row stretch\"><ui-column size=\"lg-6 md-3 sm-12\"><ui-panel class=\"x-dash-card bgMedium\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-6 md-3 sm-12\"><ui-panel class=\"x-dash-card bgLighter\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-6 md-3 sm-12\"><ui-panel class=\"x-dash-card bgDark\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column><ui-column size=\"lg-6 md-3 sm-12\"><ui-panel class=\"x-dash-card bgDarker\" minheight=10em height=100%><ui-panel-body></ui-panel-body></ui-panel></ui-column></ui-column></ui-row></ui-page></template>"; });
define('text!src/samples/dashboard/view.html', ['module'], function(module) { module.exports = "<template><require from=css/sample.admin.css></require><ui-viewport class=\"x-sample-viewport x-admin-layout\" bg-dark><ui-row class=x-app-header middle nogutter><ui-glyph ref=headIcon glyph=icon-moon-rocket></ui-glyph><div class=\"ui-app-title ui-font-large ui-pad-h\">Administrative Dashboard</div><ui-filler></ui-filler><div class=ui-pad-all><a href=#/examples class=\"ui-text-white ui-pad-v\"><ui-glyph glyph=glyph-arrow-left></ui-glyph>&nbsp;Back to Website</a></div></ui-row><ui-section row-layout><ui-sidebar mini-display collapsed=true css.bind=\"{maxWidth: '10em'}\"><ui-menu><ui-menu-item class=\"ui-text-white ui-active\" glyph=icon-moon-calculator>Dashboard</ui-menu-item><ui-menu-item class=ui-text-white glyph=icon-moon-history>History</ui-menu-item><ui-menu-item class=ui-text-white glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu></ui-sidebar><ui-router-view></ui-router-view></ui-section><ui-app-footer><span>&copy; 2017, Adarsh Pastakia</span><span>Sample Application, version 0.1 (Build 1)</span></ui-app-footer></ui-viewport></template>"; });
define('text!src/samples/desktop/view.html', ['module'], function(module) { module.exports = "<template><require from=css/sample.desktop.css></require><ui-viewport class=\"x-sample-viewport x-desktop-layout\" bg-theme=white><ui-row class=x-app-header middle nogutter><ui-glyph ref=headIcon glyph=icon-moon-rocket></ui-glyph><div class=\"ui-app-title ui-font-large ui-pad-h\">Desktop Application</div><ui-filler></ui-filler><div class=ui-pad-all><a href=#/examples class=\"ui-text-white ui-pad-v\"><ui-glyph glyph=glyph-arrow-left></ui-glyph>&nbsp;Back to Website</a></div></ui-row><ui-content padded scroll><ui-row vertical><ui-button text-theme=green class=x-desktop-icon icon-top glyph=icon-moon-book>New Sale</ui-button><ui-button text-theme=blue class=x-desktop-icon icon-top glyph=icon-moon-file-excel>Open Query</ui-button><ui-button text-theme=darkGray class=x-desktop-icon icon-top glyph=icon-moon-folder-open>Saved Queries</ui-button></ui-row></ui-content><div ref=startMenu class=\"x-start-menu ui-menu\"><div class=\"ui-scroll x-menu-frequent\"><ui-menu><ui-menu-item glyph=icon-moon-calculator>Dashboard</ui-menu-item><ui-menu-item glyph=icon-moon-history>History</ui-menu-item><ui-menu-item glyph=icon-moon-book>Sales Form</ui-menu-item></ui-menu></div><div class=x-side-section><div class=x-profilename><ui-glyph glyph=icon-moon-cool></ui-glyph><span>&nbsp;Username</span></div><ui-column fill><ui-menu><ui-menu-item glyph=icon-moon-profile>Profile</ui-menu-item><ui-menu-item glyph=icon-moon-cog>Settings</ui-menu-item></ui-menu></ui-column><ui-column auto class=x-toolbar><ui-button glyph=icon-moon-switch class=x-btn-logout dark>Logout</ui-button></ui-column></div></div><ui-app-quick-links><ui-button secondary icon-hilight class=x-btn-start dropdown.bind=startMenu glyph=icon-moon-basecamp>Start</ui-button></ui-app-quick-links></ui-viewport></template>"; });
//# sourceMappingURL=app-bundle.js.map