# UIViewport

Main application viewport


> Markup

```html
<ui-viewport>
  <ui-viewport-header>...</ui-viewport-header>

  <ui-viewport-body>
    <ui-router-view></ui-router-view>
  </ui-viewport-body>

  <ui-viewport-footer>...</ui-viewport-footer>
</ui-viewport>
```

> With Menubar

```html
<ui-viewport>
  <ui-viewport-header>...</ui-viewport-header>

  <ui-viewport-body>
    <ui-section>

      <ui-section-head>
        <ui-menubar>...</ui-menubar>
      </ui-section-head>

      <ui-router-view></ui-router-view>

    </ui-section>
  </ui-viewport-body>

  <ui-viewport-footer>...</ui-viewport-footer>
</ui-viewport>
```


> With Side Menu

```html
<ui-viewport>
  <ui-viewport-header>...</ui-viewport-header>

  <ui-viewport-body>
    <ui-section>

      <ui-sidebar>
        <ui-menu>...</ui-menu>
      </ui-sidebar>

      <ui-router-view></ui-router-view>

    </ui-section>
  </ui-viewport-body>

  <ui-viewport-footer>...</ui-viewport-footer>
</ui-viewport>
```
