###### Checkboxes

```html
<ui-checkbox checked.bind="remember">Remember Me</ui-checkbox>
```

```html
<ui-option-group cols="4">
  <ui-input-label>Checkboxes</ui-input-label>
  <ui-checkbox checked>Red</ui-checkbox>
  <ui-checkbox>Green</ui-checkbox>
  <ui-checkbox>Blue</ui-checkbox>
  <ui-checkbox>Orange</ui-checkbox>
  <ui-checkbox>Yellow</ui-checkbox>
  <ui-checkbox>Purple</ui-checkbox>
  <ui-checkbox>Indigo</ui-checkbox>
  <ui-checkbox>Brown</ui-checkbox>
</ui-option-group>
```

###### Radio Buttons

```html
<ui-option-group cols="3" value="square" name="shapes">
  <ui-input-label>Radios</ui-input-label>
  <ui-radio value="line">Line</ui-radio>
  <ui-radio value="square">Square</ui-radio>
  <ui-radio value="circle">Circle</ui-radio>
  <ui-radio value="ellipse">Ellipse</ui-radio>
  <ui-radio value="star">Star</ui-radio>
  <ui-radio value="triangle">Triangle</ui-radio>
</ui-option-group>
```

> NOTE: Radio buttons not within OptionGroup must contain name attribute

###### Switches

```html
<ui-switch primary></ui-switch>

<ui-switch theme="gender" on-label="Female" off-label="Male" on-value="female" off-value="male" size="4em">Gender</ui-switch>
```
