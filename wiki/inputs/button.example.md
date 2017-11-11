###### Simple Button

```html
<ui-button>Click Me</ui-button>
```

###### Icon Button

```html
<ui-button glyph="glyph-icon-page"></ui-button>
```

###### Icon Hilight Button

```html
<ui-button icon-hilight glyph="glyph-icon-page">Click Me!</ui-button>
```

###### Icon Top Button

```html
<ui-button icon-top glyph="glyph-icon-page">Click Me!</ui-button>
```

###### Button - Dropdown

```html
<ui-button dropdown.ref="menu" glyph="glyph-icon-page">Click Me!</ui-button>
<ui-menu ref="menu">...</ui-menu>
```

###### Button Group

```html
<ui-button-group>
  <ui-button secondary>Grouped</ui-button>
  <ui-button success>Grouped</ui-button>
  <ui-button warning>Grouped</ui-button>
  <ui-button danger>Grouped</ui-button>
</ui-button-group>
```

###### Button Group - Separator

```html
<ui-button-group separator="or">
  <ui-button success width="">Proceed</ui-button>
  <ui-button info width="">Recheck</ui-button>
  <ui-button danger width="">Cancel</ui-button>
</ui-button-group>
```


###### Button Group - Toggle

```html
<ui-button-group value="1" toggle>
  <ui-button value="0" secondary>Grouped</ui-button>
  <ui-button value="1" success>Grouped</ui-button>
  <ui-button value="2" warning>Grouped</ui-button>
  <ui-button value="3" danger>Grouped</ui-button>
</ui-button-group>
```
