###### Simple TabPanel with Composed Views

```html
<ui-tab-panel active-tab.bind="activeTab">
  <ui-tab view-model="anyViewModel">View Model</ui-tab>
  <ui-tab closeable view="any.html">View</ui-tab>
  <ui-tab disabled="true">Disabled</ui-tab>

  <compose view.bind="activeTab.view" view-model.bind="activeTab.viewModel"></compose>
</ui-tab-panel>
```

----

###### Simple TabPanel with Router Views

```html
<ui-tab-panel>
  <ui-tab repeat.for="route of router.navigation" active.bind="route.isActive" href.bind="route.href">${route.title}</ui-tab>

  <ui-router-view></ui-router-view>
</ui-tab-panel>
```
