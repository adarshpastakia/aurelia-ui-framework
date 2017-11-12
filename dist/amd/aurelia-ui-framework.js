define(["require", "exports", "aurelia-pal", "aurelia-validation", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-validation", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "auf-utility-library", "./elements/core/ui-glyphs", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-indicators", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tabpanel", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./attributes/ui-badge", "./attributes/ui-colors", "./attributes/ui-ribbon", "./attributes/ui-tooltip", "./value-converters/ui-lodash", "./value-converters/ui-text"], function (require, exports, aurelia_pal_1, aurelia_validation_1, ui_constants_1, ui_utils_1, ui_validation_1, ui_application_1, ui_constants_2, ui_dialog_1, ui_event_1, ui_format_1, ui_http_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ui_application_1);
    __export(ui_constants_2);
    __export(ui_dialog_1);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtdWktZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQStDQSwyQkFBdUM7SUFDdkMseUJBQXFDO0lBQ3JDLHNCQUFrQztJQUNsQyxxQkFBaUM7SUFDakMsc0JBQWtDO0lBQ2xDLG9CQUFnQztJQWVoQyxtQkFBMEIsTUFBOEIsRUFBRSxjQUFjO1FBQ3RFLGtCQUFPLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRTlELHlDQUFvQixDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsb0NBQWUsQ0FBQyxZQUFZLENBQUM7UUFDOUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLFVBQUEsU0FBUyxJQUFJLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0IsQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7UUFFbkcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQixzQkFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ3JCLHNCQUFRLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDO1lBQ3RELHNCQUFRLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDO1lBQ3BELHNCQUFRLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDO1lBQ3RELHNCQUFRLENBQUMsVUFBVSxDQUFDLG1DQUFtQyxDQUFDO1lBQ3hELHNCQUFRLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDO1lBQzFELHNCQUFRLENBQUMsVUFBVSxDQUFDLCtCQUEr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RUFBRSxDQUFDO1FBQ2pCLHVCQUFZLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBekZELDhCQXlGQyIsImZpbGUiOiJhdXJlbGlhLXVpLWZyYW1ld29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcblxuaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFBMQVRGT1JNIH0gZnJvbSAnYXVyZWxpYS1wYWwnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRyb2xsZXIsIHZhbGlkYXRlVHJpZ2dlciB9IGZyb20gJ2F1cmVsaWEtdmFsaWRhdGlvbic7XG5cbmltcG9ydCB7IFVJQ29uc3RhbnRzIH0gZnJvbSBcIi4vdXRpbHMvdWktY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBVSVV0aWxzLCBsb2Rhc2hNaXhpbnMgfSBmcm9tIFwiLi91dGlscy91aS11dGlsc1wiO1xuaW1wb3J0IHsgVUlWYWxpZGF0aW9uUmVuZGVyZXIsIGxvYWRWYWxpZGF0b3JzIH0gZnJvbSBcIi4vdXRpbHMvdWktdmFsaWRhdGlvblwiO1xuaW1wb3J0IFwiYXVmLXV0aWxpdHktbGlicmFyeVwiO1xuXG5pbXBvcnQgJy4vZWxlbWVudHMvY29yZS91aS1nbHlwaHMnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvcmUvdWktZ3JpZCc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29yZS91aS1wYWdlJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb3JlL3VpLXZpZXdwb3J0JztcblxuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktYWxlcnRzJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWJhcnMnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJhd2VyJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWRyb3Bkb3duJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWluZGljYXRvcnMnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktbWVudSc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1wYW5lbCc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1zaWRlYmFyJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXRhYnBhbmVsJztcblxuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1idXR0b24nO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1kYXRlJztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktZm9ybSc7XG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLWlucHV0JztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktbWFya2Rvd24nO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS1vcHRpb25zJztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktcGhvbmUnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2lucHV0cy91aS10ZXh0YXJlYSc7XG5cbmltcG9ydCAnLi9hdHRyaWJ1dGVzL3VpLWJhZGdlJztcbmltcG9ydCAnLi9hdHRyaWJ1dGVzL3VpLWNvbG9ycyc7XG5pbXBvcnQgJy4vYXR0cmlidXRlcy91aS1yaWJib24nO1xuaW1wb3J0ICcuL2F0dHJpYnV0ZXMvdWktdG9vbHRpcCc7XG5cbmltcG9ydCAnLi92YWx1ZS1jb252ZXJ0ZXJzL3VpLWxvZGFzaCc7XG5pbXBvcnQgJy4vdmFsdWUtY29udmVydGVycy91aS10ZXh0JztcblxuZXhwb3J0ICogZnJvbSAnLi91dGlscy91aS1hcHBsaWNhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWNvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWRpYWxvZyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWV2ZW50JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktZm9ybWF0JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktaHR0cCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVUlDb25maWcge1xuICB0aXRsZSh0OiBzdHJpbmcpOiBVSUNvbmZpZztcbiAgc3ViVGl0bGUodDogc3RyaW5nKTogVUlDb25maWc7XG4gIHZlcnNpb24odDogc3RyaW5nKTogVUlDb25maWc7XG4gIGFwcEtleSh0OiBzdHJpbmcpOiBVSUNvbmZpZztcblxuICBhcGlVcmwodDogc3RyaW5nKTogVUlDb25maWc7XG4gIGFwaUhlYWRlcnModDogYW55KTogVUlDb25maWc7XG4gIHNlbmRBdXRoSGVhZGVyKHQ6IGJvb2xlYW4pOiBVSUNvbmZpZztcblxuICBsYW5ndWFnZXMobDogQXJyYXk8YW55Pik6IFVJQ29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgY29uZmlnQ2FsbGJhY2spIHtcbiAgVUlVdGlscy5hdUNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHdpbmRvdy5icm93c2VyQWdlbnQoKSk7XG5cbiAgVmFsaWRhdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLnZhbGlkYXRlVHJpZ2dlciA9IHZhbGlkYXRlVHJpZ2dlci5jaGFuZ2VPckJsdXI7XG4gIGNvbmZpZy5jb250YWluZXIucmVnaXN0ZXJIYW5kbGVyKCd1aS12YWxpZGF0b3InLCBjb250YWluZXIgPT4gY29udGFpbmVyLmdldChVSVZhbGlkYXRpb25SZW5kZXJlcikpO1xuXG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29yZS91aS1ncmlkJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb3JlL3VpLXBhZ2UnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvcmUvdWktdmlld3BvcnQnKVxuICBdKTtcblxuICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKFtcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktYWxlcnRzJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWJhcnMnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJhd2VyJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWRyb3Bkb3duJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWluZGljYXRvcnMnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktbWVudScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1wYW5lbCcpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1zaWRlYmFyJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXRhYnBhbmVsJylcbiAgXSk7XG5cbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhbXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktYnV0dG9uJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktZGF0ZScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvaW5wdXRzL3VpLWZvcm0nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1pbnB1dCcpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvaW5wdXRzL3VpLW1hcmtkb3duJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktb3B0aW9ucycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvaW5wdXRzL3VpLXBob25lJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktdGV4dGFyZWEnKVxuICBdKTtcblxuICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKFtcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2F0dHJpYnV0ZXMvdWktYmFkZ2UnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2F0dHJpYnV0ZXMvdWktY29sb3JzJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9hdHRyaWJ1dGVzL3VpLXJpYmJvbicpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vYXR0cmlidXRlcy91aS10b29sdGlwJylcbiAgXSk7XG5cbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhbXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi92YWx1ZS1jb252ZXJ0ZXJzL3VpLWxvZGFzaCcpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vdmFsdWUtY29udmVydGVycy91aS10ZXh0JylcbiAgXSk7XG5cbiAgdmFyIENvbmZpZ3VyZSA9IHtcbiAgICB0aXRsZTogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLlRpdGxlID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBzdWJUaXRsZTogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLlN1YlRpdGxlID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICB2ZXJzaW9uOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuVmVyc2lvbiA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgYXBwS2V5OiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuQXBwS2V5ID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBhcGlVcmw6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5IdHRwLkJhc2VVcmwgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIGFwaUhlYWRlcnM6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5IdHRwLkhlYWRlcnMgPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIHNlbmRBdXRoSGVhZGVyOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuSHR0cC5BdXRob3JpemF0aW9uSGVhZGVyID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBsYW5ndWFnZXM6IChsKSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5MYW5ndWFnZXMgPSBsO1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGNvbmZpZ0NhbGxiYWNrICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGNvbmZpZ0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uZmlnQ2FsbGJhY2soQ29uZmlndXJlKTtcbiAgfVxuXG4gIGxvYWRWYWxpZGF0b3JzKCk7XG4gIGxvZGFzaE1peGlucygpO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
