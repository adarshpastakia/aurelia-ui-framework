###### Simple Viewport

```html
<ui-viewport appready.trigger="onReady()">

  <ui-app-banner>My banner content</ui-app-banner>

  <ui-app-header>
    <ui-app-title>Application<small>My description</small></ui-app-title>
  </ui-app-header>

  <ui-router-view></ui-router-view>

  <ui-app-footer>
    <span>&copy; 2017, Company</span>
  </ui-app-footer>

</ui-viewport>
```

###### Viewport with Navigation Drawer

```html
<ui-viewport appready.trigger="onReady()" fullscreen>

  <ui-app-header>
    <ui-drawer-toggle drawer.bind="menuDrawer"></ui-drawer-toggle>
    <ui-app-title>Application<small>My description</small></ui-app-title>
  </ui-app-header>

  <ui-drawer ref="menuDrawer" scroll close-on-click>
    <!-- Navigation menu goes here -->
  </ui-drawer>

  <ui-router-view></ui-router-view>

  <ui-app-footer>
    <span>&copy; 2017, Company</span>
  </ui-app-footer>

</ui-viewport>
```


###### Viewport with Menubar

```html
<ui-viewport appready.trigger="onReady()">
  <ui-app-header>
    <ui-app-title>Application<small>My description</small></ui-app-title>
  </ui-app-header>

  <ui-menubar>
    <!-- Navigation menu goes here -->
  </ui-menubar>

  <ui-router-view></ui-router-view>

  <ui-app-footer>
    <span>&copy; 2017, Company</span>
  </ui-app-footer>
</ui-viewport>
```
