###### Combo Input

```html
<ui-input-group>
  <ui-input-label>Combo</ui-input-label>
  <ui-combo value.bind="ctr" options.bind="countries" tpl="\${name}<br/><small>\${capital}</small>"
  display-property="name" value-property="iso3" icon-property="iso3"
  icon-class="ui-flag" force-select="true" model.bind="country">
    <ui-input-addon glyph-class="ui-flag" glyph.bind="ctr"></ui-input-addon>
  </ui-combo>
</ui-input-group>
```

###### List Input

```html
<ui-input-group>
  <ui-input-label>Combo</ui-input-label>
  <ui-list value.bind="ctr" options.bind="countries" tpl="\${name}<br/><small>\${capital}</small>"
  display-property="name" value-property="iso3" icon-property="iso3"
  icon-class="ui-flag" force-select="true" model.bind="country">
    <ui-input-addon glyph-class="ui-flag" glyph.bind="ctr"></ui-input-addon>
  </ui-list>
</ui-input-group>
```


###### Tag Input

```html
<ui-input-group>
  <ui-input-label>Tags</ui-input-label>
  <ui-tags value='UAE,IND' force-select="true" options.bind="countries"
    display-property="name" value-property="iso3" icon-property="iso3" icon-class="ui-flag"></ui-tags>
</ui-input-group>
```

* Dont force select


```html
<ui-input-group>
  <ui-input-label>Emails</ui-input-label>
  <ui-tags value='user@email.com,user@gmail.com' force-select="false"
    options.bind="['user@email.com', 'user@hotmail.com']"></ui-tags>
</ui-input-group>
```
