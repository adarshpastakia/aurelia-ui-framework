###### Form

```html
<ui-form submit.trigger="doSomething()" busy.bind="postingForm">...</ui-form>
```

###### Fieldset

```html
<ui-fieldset legend="Fieldset Legend" checked.bind="showOptional">...</ui-fieldset>
```

###### Inputs

* Plain Text
```html
<ui-input-group>
  <ui-input-label required>Text</ui-input-label>
  <ui-input placeholder="Any text...">
    <ui-input-addon>
      <small class="ui-strong" text-info>User</small>
    </ui-input-addon>
  </ui-input>
  <ui-button secondary glyph="glyph-arrow-right"></ui-button>
</ui-input-group>
```

* Password
```html
<ui-input-group>
  <ui-input-label>Password</ui-input-label>
  <ui-input password placeholder="Any text...">
    <ui-input-addon glyph="glyph-icon-key"></ui-input-addon>
  </ui-input>
</ui-input-group>
```

* Number
```html
<ui-input-group>
  <ui-input-label>Number</ui-input-label>
  <ui-input number placeholder="Any number..."></ui-input>
</ui-input-group>
```

* Decimal
```html
<ui-input-group>
  <ui-input-label>Decimal</ui-input-label>
  <ui-input decimal placeholder="Any decimal..."></ui-input>
</ui-input-group>
```

* Email
```html
<ui-input-group>
  <ui-input-label>Email</ui-input-label>
  <ui-input email placeholder="user@domain.com">
    <ui-input-addon text-info glyph="icon-moon-envelop"></ui-input-addon>
  </ui-input>
</ui-input-group>
```
* URL
```html
<ui-input-group>
  <ui-input-label>URL</ui-input-label>
  <ui-input url placeholder="http://domain.com">
    <ui-input-addon text-info glyph="icon-moon-link"></ui-input-addon>
  </ui-input>
</ui-input-group>
```

* Double input fields
```html
<ui-input-group>
  <ui-input-label>Double Input</ui-input-label>

  <ui-input decimal placeholder="Latitude..." help-text="Latitude">
    <ui-input-addon text-warning glyph="icon-moon-location"></ui-input-addon>
  </ui-input>

  <ui-input decimal placeholder="Longitude..." help-text="Longitude">
    <ui-input-addon text-warning glyph="icon-moon-location"></ui-input-addon>
  </ui-input>
</ui-input-group>
```

* Textarea
```html
<ui-input-group>
  <ui-input-label>Textarea</ui-input-label>
  <ui-textarea clear counter value="With auto-complete..."
    auto-complete="Alpha,Bravo,Alfa-Bravo,Charlie,Delta,Echo,Foxtrot,Lima,Omega,Sigma,Theta,Zulu"></ui-textarea>
</ui-input-group>
```

* Single File
```html
<ui-input-group>
  <ui-input-label>File</ui-input-label>
  <ui-input file placeholder="Any file...">
    <ui-input-addon glyph="icon-moon-file-zip"></ui-input-addon>
  </ui-input>
</ui-input-group>
```

* Multiple File
```html
<ui-input-group>
  <ui-input-label>File</ui-input-label>
  <ui-file view-model.ref="files"></ui-file>
</ui-input-group>
```

* Input with checkbox
```html
<ui-input-group>
  <ui-input-label>Twitter</ui-input-label>
  <ui-input-addon><ui-checkbox checked.bind="hasTwitter" change.trigger="twitterHandle=''"></ui-checkbox></ui-input-addon>
  <ui-input disabled.bind="!hasTwitter" value.bind="twitterHandle" placeholder="Twitter handle..."></ui-input>
</ui-input-group>
```
