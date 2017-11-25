###### Using Application Class
```ts
//MyClass.ts

import { autoinject } from 'aurelia-framework';
import { UIApplication } from 'aurelia-ui-framework';

@autoinject()
export class MyClass {
  constructor(public app:UIApplication) { }

  activate() {
    ...
    ...
    ...
    this.prop = app.shared('myProperty');

    app.info('MyView', 'activated');
  }

  afterLogin(response) {
    ...
    ...
    ...
    app.log('MyView', 'afterLogin', response);
    app.login('dashboard', {'X-Authorization': `${response.User}:${response.token}`});
  }
}
```
