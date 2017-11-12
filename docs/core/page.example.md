###### Simple Page

```html
<ui-page page-title="My Title">
  <ui-loader busy.bind="true" large></ui-loader>

  <ui-content scroll padded>
    <h1 class="ui-display-2">Page content goes here</h1>
  </ui-content>

</ui-page>
```

---

###### Page with Menubar/Toolbar

```html
<ui-page page-title="My Title">

  <ui-section column-layout>

    <ui-toolbar>
      <!-- Toolbar content goes here -->
    </ui-toolbar>

    <ui-content scroll padded>
      <h1 class="ui-display-2">Page content goes here</h1>
    </ui-content>

  </ui-section>

</ui-page>
```

---

###### Page with Sidebar

```html
<ui-page page-title="My Title">

  <ui-section row-layout>

    <ui-sidebar>
      <!-- Sidebar content goes here -->
    </ui-sidebar>

    <ui-content scroll padded>
      <h1 class="ui-display-2">Page content goes here</h1>
    </ui-content>

  </ui-section>

</ui-page>
```


---

###### Page with multiple sections

```html
<ui-page page-title="My Title">

  <ui-section column-layout>

    <ui-section row-layout>

      <ui-sidebar>
        <!-- Sidebar content goes here -->
      </ui-sidebar>

      <ui-content scroll padded>
        <h1 class="ui-display-2">Page content goes here</h1>
      </ui-content>

    </ui-section>

    <ui-toolbar>
      <!-- Toolbar content goes here -->
    </ui-toolbar>

  </ui-section>

</ui-page>
```
