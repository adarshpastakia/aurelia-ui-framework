# Resposive Flexbox Grid

### UIContainer

> Markup

```html
<ui-container ui-gutter="?" fluid>...</ui-container>
```

- Attributes
  - `ui-gutter`: 0 | xs | sm | md | lg
  - `fluid`: fullwidth container

---

### UIRow

> Markup

```html
<ui-row halign="?" valign="?" vertical reverse nowrap>...</ui-row>
```

- Attributes
  - `halign`: start | end | center | spaced | even
  - `valign`: top | bottom | middle | stretch
  - `vertical`: vertical row
  - `reverse`: reverse order
  - `nowrap`: no wrapping

---

### UIColumn

> Markup

```html
<ui-col align="?" size="?">...</ui-col>
```

- Attributes
  - `align`: top | bottom | middle | stretch
  - `size`: space separated sizes with breakpoint
    - values: auto | fill | 1-12 
    - breakpoints: ?@[xs | sm | md | lg | xl | xxl]
