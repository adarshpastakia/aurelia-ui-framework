###### Creating a data model
```ts
//MyModel.ts

import { UIDataModel, serialize } from 'aurelia-ui-framework';

export class MyModel extends UIDataModel {

  @serializable('user@email.com') username;
  @serializable() password;
  @serializable() firstName;
  @serializable() lastName;
  @serializable() dob;
  @serializable() age;
  @serializable() address1;
  @serializable() address2;
  @serializable() city;
  @serializable() country;
  @serializable() email;
  @serializable() phone;

  apiSlug = '/api/user';
}
```

###### Using the data model
```ts
//MyView.ts
import { MyModel } from './MyModel';

export class MyView {
  model = new MyModel();
}
```

```html
<!-- MyView.html -->
<template>
  <ui-input-group>
    <ui-input-label required>User Name</ui-input-label>
    <ui-input value.bind="model.username" maxlength="99" counter clear></ui-input>
    <ui-button info disabled.bind="!model.dirtyProps.username">Check</ui-button>
  </ui-input-group>

  <ui-input-group>
    <ui-input-label required>Password</ui-input-label>
    <ui-input password value.bind="model.password" maxlength="99" counter clear></ui-input>
  </ui-input-group>

  .
  .
  .
  <ui-button disabled.bind="!model.isDirty">Submit</ui-button>
</template>
```
