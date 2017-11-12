###### Inline Date

```html
<ui-date-view datetime date.bind="date"></ui-date-view>
```

###### Date Input

```html
<ui-input-group>
  <ui-input-label>Date</ui-input-label>
  <ui-date date.bind="date"></ui-date>
</ui-input-group>
```

###### Time Input

```html
<ui-input-group>
  <ui-input-label>Time</ui-input-label>
  <ui-input-addon>
    <small>Local Time</small>
  </ui-input-addon>
  <ui-date time="time" date.bind="time"></ui-date>
  <ui-input-info if.bind="time">${time | utc | time} GMT</ui-input-info>
</ui-input-group>
```
