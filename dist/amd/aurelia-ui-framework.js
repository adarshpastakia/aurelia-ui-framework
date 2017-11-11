define(["require", "exports", "aurelia-pal", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "./elements/core/ui-glyphs", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-indicators", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tabpanel", "./elements/inputs/ui-button", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-options", "./attributes/ui-badge", "./attributes/ui-colors", "./attributes/ui-ribbon", "./attributes/ui-tooltip", "./value-converters/ui-lodash", "./value-converters/ui-text"], function (require, exports, aurelia_pal_1, ui_constants_1, ui_utils_1, ui_application_1, ui_constants_2, ui_event_1, ui_format_1, ui_http_1) {
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
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options')
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
        ui_utils_1.lodashMixins();
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtdWktZnJhbWV3b3JrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQXVDQSwyQkFBdUM7SUFDdkMseUJBQXFDO0lBQ3JDLHFCQUFpQztJQUNqQyxzQkFBa0M7SUFDbEMsb0JBQWdDO0lBZWhDLG1CQUEwQixNQUE4QixFQUFFLGNBQWM7UUFDdEUsa0JBQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUN2QyxRQUFRLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFOUQsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQixzQkFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ3JCLHNCQUFRLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDO1lBQ3RELHNCQUFRLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDO1lBQ3BELHNCQUFRLENBQUMsVUFBVSxDQUFDLGlDQUFpQyxDQUFDO1lBQ3RELHNCQUFRLENBQUMsVUFBVSxDQUFDLG1DQUFtQyxDQUFDO1lBQ3hELHNCQUFRLENBQUMsVUFBVSxDQUFDLHFDQUFxQyxDQUFDO1lBQzFELHNCQUFRLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDO1lBQ3BELHNCQUFRLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDO1lBQ3JELHNCQUFRLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxDQUFDO1lBQ3ZELHNCQUFRLENBQUMsVUFBVSxDQUFDLG1DQUFtQyxDQUFDO1NBQ3pELENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxlQUFlLENBQUM7WUFDckIsc0JBQVEsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLENBQUM7WUFDbEQsc0JBQVEsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLENBQUM7WUFDaEQsc0JBQVEsQ0FBQyxVQUFVLENBQUMsNEJBQTRCLENBQUM7WUFDakQsc0JBQVEsQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNyQixzQkFBUSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQztZQUM3QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQztZQUM3QyxzQkFBUSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQztTQUMvQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsZUFBZSxDQUFDO1lBQ3JCLHNCQUFRLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1lBQ25ELHNCQUFRLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFHO1lBQ2QsS0FBSyxFQUFFLFVBQUMsQ0FBQztnQkFDUCwwQkFBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELFFBQVEsRUFBRSxVQUFDLENBQUM7Z0JBQ1YsMEJBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPLEVBQUUsVUFBQyxDQUFDO2dCQUNULDBCQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsTUFBTSxFQUFFLFVBQUMsQ0FBQztnQkFDUiwwQkFBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELE1BQU0sRUFBRSxVQUFDLENBQUM7Z0JBQ1IsMEJBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQixDQUFDO1lBQ0QsVUFBVSxFQUFFLFVBQUMsQ0FBQztnQkFDWiwwQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLENBQUM7WUFDRCxjQUFjLEVBQUUsVUFBQyxDQUFDO2dCQUNoQiwwQkFBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELFNBQVMsRUFBRSxVQUFDLENBQUM7Z0JBQ1gsMEJBQVcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ25CLENBQUM7U0FDRixDQUFDO1FBRUYsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxPQUFPLGNBQWMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBR0QsdUJBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFsRkQsOEJBa0ZDIiwiZmlsZSI6ImF1cmVsaWEtdWktZnJhbWV3b3JrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuXG5pbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgUExBVEZPUk0gfSBmcm9tICdhdXJlbGlhLXBhbCc7XG5pbXBvcnQgeyBVSUNvbnN0YW50cyB9IGZyb20gXCIuL3V0aWxzL3VpLWNvbnN0YW50c1wiO1xuaW1wb3J0IHsgVUlVdGlscywgbG9kYXNoTWl4aW5zIH0gZnJvbSBcIi4vdXRpbHMvdWktdXRpbHNcIjtcblxuaW1wb3J0ICcuL2VsZW1lbnRzL2NvcmUvdWktZ2x5cGhzJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb3JlL3VpLWdyaWQnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvcmUvdWktcGFnZSc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29yZS91aS12aWV3cG9ydCc7XG5cbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWFsZXJ0cyc7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1iYXJzJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLWRyYXdlcic7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1kcm9wZG93bic7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1pbmRpY2F0b3JzJztcbmltcG9ydCAnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLW1lbnUnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktcGFuZWwnO1xuaW1wb3J0ICcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktc2lkZWJhcic7XG5pbXBvcnQgJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS10YWJwYW5lbCc7XG5cbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktYnV0dG9uJztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktZm9ybSc7XG5pbXBvcnQgJy4vZWxlbWVudHMvaW5wdXRzL3VpLWlucHV0JztcbmltcG9ydCAnLi9lbGVtZW50cy9pbnB1dHMvdWktb3B0aW9ucyc7XG5cbmltcG9ydCAnLi9hdHRyaWJ1dGVzL3VpLWJhZGdlJztcbmltcG9ydCAnLi9hdHRyaWJ1dGVzL3VpLWNvbG9ycyc7XG5pbXBvcnQgJy4vYXR0cmlidXRlcy91aS1yaWJib24nO1xuaW1wb3J0ICcuL2F0dHJpYnV0ZXMvdWktdG9vbHRpcCc7XG5cbmltcG9ydCAnLi92YWx1ZS1jb252ZXJ0ZXJzL3VpLWxvZGFzaCc7XG5pbXBvcnQgJy4vdmFsdWUtY29udmVydGVycy91aS10ZXh0JztcblxuZXhwb3J0ICogZnJvbSAnLi91dGlscy91aS1hcHBsaWNhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWNvbnN0YW50cyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3VpLWV2ZW50JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktZm9ybWF0JztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvdWktaHR0cCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVUlDb25maWcge1xuICB0aXRsZSh0OiBzdHJpbmcpOiBVSUNvbmZpZztcbiAgc3ViVGl0bGUodDogc3RyaW5nKTogVUlDb25maWc7XG4gIHZlcnNpb24odDogc3RyaW5nKTogVUlDb25maWc7XG4gIGFwcEtleSh0OiBzdHJpbmcpOiBVSUNvbmZpZztcblxuICBhcGlVcmwodDogc3RyaW5nKTogVUlDb25maWc7XG4gIGFwaUhlYWRlcnModDogYW55KTogVUlDb25maWc7XG4gIHNlbmRBdXRoSGVhZGVyKHQ6IGJvb2xlYW4pOiBVSUNvbmZpZztcblxuICBsYW5ndWFnZXMobDogQXJyYXk8YW55Pik6IFVJQ29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgY29uZmlnQ2FsbGJhY2spIHtcbiAgVUlVdGlscy5hdUNvbnRhaW5lciA9IGNvbmZpZy5jb250YWluZXI7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKHdpbmRvdy5icm93c2VyQWdlbnQoKSk7XG5cbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhbXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb3JlL3VpLWdyaWQnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvcmUvdWktcGFnZScpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29yZS91aS12aWV3cG9ydCcpXG4gIF0pO1xuXG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1hbGVydHMnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktYmFycycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1kcmF3ZXInKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJvcGRvd24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktaW5kaWNhdG9ycycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vZWxlbWVudHMvY29tcG9uZW50cy91aS1tZW51JyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXBhbmVsJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9jb21wb25lbnRzL3VpLXNpZGViYXInKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2NvbXBvbmVudHMvdWktdGFicGFuZWwnKVxuICBdKTtcblxuICBjb25maWcuZ2xvYmFsUmVzb3VyY2VzKFtcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1idXR0b24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1mb3JtJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9lbGVtZW50cy9pbnB1dHMvdWktaW5wdXQnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2VsZW1lbnRzL2lucHV0cy91aS1vcHRpb25zJylcbiAgXSk7XG5cbiAgY29uZmlnLmdsb2JhbFJlc291cmNlcyhbXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9hdHRyaWJ1dGVzL3VpLWJhZGdlJyksXG4gICAgUExBVEZPUk0ubW9kdWxlTmFtZSgnLi9hdHRyaWJ1dGVzL3VpLWNvbG9ycycpLFxuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vYXR0cmlidXRlcy91aS1yaWJib24nKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL2F0dHJpYnV0ZXMvdWktdG9vbHRpcCcpXG4gIF0pO1xuXG4gIGNvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW1xuICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vdmFsdWUtY29udmVydGVycy91aS1sb2Rhc2gnKSxcbiAgICBQTEFURk9STS5tb2R1bGVOYW1lKCcuL3ZhbHVlLWNvbnZlcnRlcnMvdWktdGV4dCcpXG4gIF0pO1xuXG4gIHZhciBDb25maWd1cmUgPSB7XG4gICAgdGl0bGU6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5UaXRsZSA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgc3ViVGl0bGU6ICh0KSA9PiB7XG4gICAgICBVSUNvbnN0YW50cy5TdWJUaXRsZSA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgdmVyc2lvbjogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLlZlcnNpb24gPSB0O1xuICAgICAgcmV0dXJuIENvbmZpZ3VyZTtcbiAgICB9LFxuICAgIGFwcEtleTogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLkFwcEtleSA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgYXBpVXJsOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuSHR0cC5CYXNlVXJsID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBhcGlIZWFkZXJzOiAodCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuSHR0cC5IZWFkZXJzID0gdDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfSxcbiAgICBzZW5kQXV0aEhlYWRlcjogKHQpID0+IHtcbiAgICAgIFVJQ29uc3RhbnRzLkh0dHAuQXV0aG9yaXphdGlvbkhlYWRlciA9IHQ7XG4gICAgICByZXR1cm4gQ29uZmlndXJlO1xuICAgIH0sXG4gICAgbGFuZ3VhZ2VzOiAobCkgPT4ge1xuICAgICAgVUlDb25zdGFudHMuTGFuZ3VhZ2VzID0gbDtcbiAgICAgIHJldHVybiBDb25maWd1cmU7XG4gICAgfVxuICB9O1xuXG4gIGlmIChjb25maWdDYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjb25maWdDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbmZpZ0NhbGxiYWNrKENvbmZpZ3VyZSk7XG4gIH1cblxuICAvLyBsb2FkVmFsaWRhdG9ycygpO1xuICBsb2Rhc2hNaXhpbnMoKTtcbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
