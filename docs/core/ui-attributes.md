# UI Helper Attributes

### Color Helpers

> Markup

```html
<element ui-bg="color" ui-color="color">...</element>
```

- Colors
  - `white`
  - `black`
  - `light`
  - `dark`
  - `gray`
  - `primary`
  - `primary-light`
  - `primary-dark`
  - `primary-tint`
  - `secondary`
  - `secondary-light`
  - `secondary-dark`
  - `secondary-tint`
  - `info`
  - `info-light`
  - `info-dark`
  - `info-tint`
  - `danger`
  - `danger-light`
  - `danger-dark`
  - `danger-tint`
  - `success`
  - `success-light`
  - `success-dark`
  - `success-tint`
  - `warning`
  - `warning-light`
  - `warning-dark`
  - `warning-tint`

---

### Border Helpers

> Markup

```html
<element ui-border="?">...</element>
```

- Position: All, Left/Right, Top/Bottom, Start, End, Top, Bottom

  xy | x | y | s | e | t | b

- Sizes: sm | md | lg | xl
- Colors

  eg. `ui-border="y,md,primary"`

---

### Spacing Helpers

> Markup

```html
<element ui-padding="?" ui-margin="?">...</element>
```

- Position: All, Left/Right, Top/Bottom, Start, End, Top, Bottom

  xy | x | y | s | e | t | b

- Sizing: 0 | xs | sm | md | lg | xl
- Breakpoints: ?@[xs | sm | md | lg | xl | xxl]

  eg. `ui-margin="xs sm@md md@lg"`

  eg. `ui-padding="y 0@md"`

  eg. `ui-padding="x--xs x--sm@md x--md@lg"`

---

### Font Helpers

> Markup

```html
<element ui-font="?" ui-align="?" ui-weight="?" ui-text="?" ui-clip="n">...</element>
```

- Font
  - Sizes: _normal_ | xs | sm | md | lg | xl | h1 | h2 | h3 | h4 | h5 | h6
  - Family: _sans-serif_ | serif | mono
- Align: start | end | center | justify
- Weight: light | _normal_ | medium | bold | bolder
- Text: upper | lower | title | small-caps | drop-caps
- Clip: Clip text to _n_ lines

  eg. `ui-font="md,serif"`

  eg. `ui-align="end"`

  eg. `ui-weight="medium"`

  eg. `ui-text="title"`

  eg. `ui-clip="4"`

---

### Visibility Helpers

> Markup

```html
<element ui-hide="?" ui-visible="?">...</element>
```

- Values: [up | down]@[xs | sm | md | lg | xl | xxl]

  eg. `ui-hide="down@md"`
  eg. `ui-visible="up@md"`

---

### Misc Helpers

> Markup

```html
<element ui-scroll ui-paper>...</element>
```

- Paper: Add paper like shadow
- Scroll: Enable scrolling
