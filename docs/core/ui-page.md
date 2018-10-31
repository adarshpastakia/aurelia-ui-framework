# Page Elements

### UIPage

> Markup

```html
<ui-page page-title="?">
  <ui-router-view>...</ui-router-view>
  <!-- OR -->
  <ui-section>...</ui-section>
  <!-- OR -->
  <ui-content ui-scroll ui-padding>...</ui-content>
</ui-page>
```

---

### UISection

|         |        |         |
| ------- | ------ | ------- |
| HEADER  | HEADER | HEADER  |
| SIDEBAR | BODY   | SIDEBAR |
| FOOTER  | FOOTER | FOOTER  |

> Markup

```html
<ui-section>
  <ui-section-head>...</ui-section-head>
  <ui-section-foot>...</ui-section-foot>

  <ui-sidebar align="start">...</ui-sidebar>
  <ui-sidebar align="end">...</ui-sidebar>

  <ui-content ui-scroll>...</ui-content>
</ui-section>
```
