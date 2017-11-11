define(["require", "exports", "aurelia-pal", "aurelia-validation", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-validation", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "auf-utility-library", "./elements/core/ui-glyphs", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-indicators", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tabpanel", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./attributes/ui-badge", "./attributes/ui-colors", "./attributes/ui-ribbon", "./attributes/ui-tooltip", "./value-converters/ui-lodash", "./value-converters/ui-text"], function (require, exports, aurelia_pal_1, aurelia_validation_1, ui_constants_1, ui_utils_1, ui_validation_1, ui_application_1, ui_constants_2, ui_event_1, ui_format_1, ui_http_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ui_application_1);
    __export(ui_constants_2);
    __export(ui_event_1);
    __export(ui_format_1);
    __export(ui_http_1);
    function configure(config, configCallback) {
        ui_utils_1.UIUtils.auContainer = config.container;
        document.documentElement.classList.add(window.browserAgent());
        aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-drawer'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dropdown'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-indicators'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-menu'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-panel'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-sidebar'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tabpanel')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-button'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-date'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-markdown'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-phone'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-textarea')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-badge'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-colors'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-ribbon'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-tooltip')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-lodash'),
            aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-text')
        ]);
        var Configure = {
            title: function (t) {
                ui_constants_1.UIConstants.Title = t;
                return Configure;
            },
            subTitle: function (t) {
                ui_constants_1.UIConstants.SubTitle = t;
                return Configure;
            },
            version: function (t) {
                ui_constants_1.UIConstants.Version = t;
                return Configure;
            },
            appKey: function (t) {
                ui_constants_1.UIConstants.AppKey = t;
                return Configure;
            },
            apiUrl: function (t) {
                ui_constants_1.UIConstants.Http.BaseUrl = t;
                return Configure;
            },
            apiHeaders: function (t) {
                ui_constants_1.UIConstants.Http.Headers = t;
                return Configure;
            },
            sendAuthHeader: function (t) {
                ui_constants_1.UIConstants.Http.AuthorizationHeader = t;
                return Configure;
            },
            languages: function (l) {
                ui_constants_1.UIConstants.Languages = l;
                return Configure;
            }
        };
        if (configCallback !== undefined && typeof configCallback === 'function') {
            configCallback(Configure);
        }
        ui_validation_1.loadValidators();
        ui_utils_1.lodashMixins();
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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akIsdUJBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUF6RkQsOEJBeUZDIiwiZmlsZSI6ImF1cmVsaWEtdWktZnJhbWV3b3JrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuXG5pbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgUExBVEZPUk0gfSBmcm9tICdhdXJlbGlhLXBhbCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udHJvbGxlciwgdmFsaWRhdGVUcmlnZ2VyIH0gZnJvbSAnYXVyZWxpYS12YWxpZGF0aW9uJztcblxuaW1wb3J0IHsgVUlDb25zdGFudHMgfSBmcm9tIFwiLi91dGlscy91aS1jb25zdGFudHNcIjtcbmltcG9ydCB7IFVJVXRpbHMsIGxvZGFzaE1peGlucyB9IGZyb20gXCIuL3V0aWxzL3VpLXV0aWxzXCI7XG5pbXBvcnQgeyBVSVZhbGlkYXRpb25SZW5kZXJlciwgbG9hZFZhbGlkYXRvcnMgfSBmcm9tIFwiLi91dGlscy91aS12YWxpZGF0aW9uXCI7XG5pbXBvcnQgXCJhdWYtdXRpbGl0eS1saWJyYXJ5XCI7XG5cbmltcG9ydCAnLi9lbGVtZW50cy9jb3JlL3VpLWdseXBocyc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29yZS91aS1ncmlkJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb3JlL3VpLXBhZ2UnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvcmUvdWktdmlld3BvcnQnO1xuXG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1hbGVydHMnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktYmFycyc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1kcmF3ZXInO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJvcGRvd24nO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktaW5kaWNhdG9ycyc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1tZW51JztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXBhbmVsJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXNpZGViYXInO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktdGFicGFuZWwnO1xuXG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLWJ1dHRvbic7XG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLWRhdGUnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1mb3JtJztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktaW5wdXQnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1tYXJrZG93bic7XG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLW9wdGlvbnMnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1waG9uZSc7XG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLXRleHRhcmVhJztcblxuaW1wb3J0ICcuL2F0dHJpYnV0ZXMvdWktYmFkZ2UnO1xuaW1wb3J0ICcuL2F0dHJpYnV0ZXMvdWktY29sb3JzJztcbmltcG9ydCAnLi9hdHRyaWJ1dGVzL3VpLXJpYmJvbic7XG5pbXBvcnQgJy4vYXR0cmlidXRlcy91aS10b29sdGlwJztcblxuaW1wb3J0ICcuL3ZhbHVlLWNvbnZlcnRlcnMvdWktbG9kYXNoJztcbmltcG9ydCAnLi92YWx1ZS1jb252ZXJ0ZXJzL3VpLXRleHQnO1xuXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWFwcGxpY2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktZXZlbnQnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy91aS1mb3JtYXQnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy91aS1odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBVSUNvbmZpZyB7XG4gIHRpdGxlKHQ6IHN0cmluZyk6IFVJQ29uZmlnO1xuICBzdWJUaXRsZSh0OiBzdHJpbmcpOiBVSUNvbmZpZztcbiAgdmVyc2lvbih0OiBzdHJpbmcpOiBVSUNvbmZpZztcbiAgYXBwS2V5KHQ6IHN0cmluZyk6IFVJQ29uZmlnO1xuXG4gIGFwaVVybCh0OiBzdHJpbmcpOiBVSUNvbmZpZztcbiAgYXBpSGVhZGVycyh0OiBhbnkpOiBVSUNvbmZpZztcbiAgc2VuZEF1dGhIZWFkZXIodDogYm9vbGVhbik6IFVJQ29uZmlnO1xuXG4gIGxhbmd1YWdlcyhsOiBBcnJheTxhbnk+KTogVUlDb25maWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoY29uZmlnOiBGcmFtZXdvcmtDb25maWd1cmF0aW9uLCBjb25maWdDYWxsYmFjaykge1xuICBVSVV0aWxzLmF1Q29udGFpbmVyID0gY29uZmlnLmNvbnRhaW5lcjtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQod2luZG93LmJyb3dzZXJBZ2VudCgpKTtcblxuICBWYWxpZGF0aW9uQ29udHJvbGxlci5wcm90b3R5cGUudmFsaWRhdGVUcmlnZ2VyID0gdmFsaWRhdGVUcmlnZ2VyLmNoYW5nZU9yQmx1cjtcbiAgY29uZmlnLmNvbnRhaW5lci5yZWdpc3RlckhhbmRsZXIoJ3VpLXZhbGlkYXRvcicsIGNvbnRhaW5lciA9PiBjb250YWluZXIuZ2V0KFVJVmFsaWRhdGlvblJlbmRlcmVyKSk7XG5cbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhbXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb3JlL3VpLWdyaWQnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvcmUvdWktcGFnZScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29yZS91aS12aWV3cG9ydCcpXG4gIF0pO1xuXG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1hbGVydHMnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktYmFycycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1kcmF3ZXInKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJvcGRvd24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktaW5kaWNhdG9ycycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1tZW51JyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXBhbmVsJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXNpZGViYXInKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktdGFicGFuZWwnKVxuICBdKTtcblxuICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKFtcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1idXR0b24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1kYXRlJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktZm9ybScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvaW5wdXRzL3VpLWlucHV0JyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktbWFya2Rvd24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1vcHRpb25zJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktcGhvbmUnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS10ZXh0YXJlYScpXG4gIF0pO1xuXG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vYXR0cmlidXRlcy91aS1iYWRnZScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vYXR0cmlidXRlcy91aS1jb2xvcnMnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2F0dHJpYnV0ZXMvdWktcmliYm9uJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9hdHRyaWJ1dGVzL3VpLXRvb2x0aXAnKVxuICBdKTtcblxuICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKFtcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL3ZhbHVlLWNvbnZlcnRlcnMvdWktbG9kYXNoJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi92YWx1ZS1jb252ZXJ0ZXJzL3VpLXRleHQnKVxuICBdKTtcblxuICB2YXIgQ29uZmlndXJlID0ge1xuICAgIHRpdGxlOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuVGl0bGUgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIHN1YlRpdGxlOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuU3ViVGl0bGUgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIHZlcnNpb246ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5WZXJzaW9uID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBhcHBLZXk6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5BcHBLZXkgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIGFwaVVybDogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLkh0dHAuQmFzZVVybCA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgYXBpSGVhZGVyczogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLkh0dHAuSGVhZGVycyA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgc2VuZEF1dGhIZWFkZXI6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5IdHRwLkF1dGhvcml6YXRpb25IZWFkZXIgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIGxhbmd1YWdlczogKGwpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLkxhbmd1YWdlcyA9IGw7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH1cbiAgfTtcblxuICBpZiAoY29uZmlnQ2FsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY29uZmlnQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25maWdDYWxsYmFjayhDb25maWd1cmUpO1xuICB9XG5cbiAgbG9hZFZhbGlkYXRvcnMoKTtcbiAgbG9kYXNoTWl4aW5zKCk7XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
