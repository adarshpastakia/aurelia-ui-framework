###### Horizontal Grid

```html
<ui-container padded>

  <ui-row middle nowrap>
    <ui-column padded auto>Auto width</ui-column>
    <ui-column padded fill>Fill remaining space</ui-column>
    <ui-column padded width="10em">Fixed width</ui-column>
  </ui-row>

  <ui-row>
    <ui-column size="md-6 lg-4 xl-2">First column</ui-column>
    <ui-column size="md-6 lg-4 xl-2">Second column</ui-column>
    <ui-column size="md-6 lg-4 xl-2">Third column</ui-column>
    <ui-column size="md-6 lg-4 xl-2">Fourth column</ui-column>
    <ui-column size="md-6 lg-4 xl-2">Fifth column</ui-column>
    <ui-column size="md-6 lg-4 xl-2">Sixth column</ui-column>
  </ui-row>

</ui-container>
```

> Sized columns will be laid out as follows
> `md`: two columns three rows
> `lg`: three columns two rows
> `xl`: six columns one row

---

###### Vertical Grid

```html
<ui-container padded>

  <ui-row-vertical middle nowrap>
    <ui-column padded auto>Auto width</ui-column>
    <ui-column padded fill>Fill remaining space</ui-column>
    <ui-column padded width="10em">Fixed width</ui-column>
  </ui-row>

</ui-container>
```

> __NOTE__ Do not use responsive size for vertical columns.

&nbsp;

> __NOTE__ For column with fixed size the width value will be applied to its `flex-basis`, which in this case will be affect its height

---
