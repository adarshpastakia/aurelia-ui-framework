###### Broadcasting Events
```ts
//MyClass.ts

import { autoinject } from 'aurelia-framework';
import { UIEvent } from 'aurelia-ui-framework';

@autoinject()
export class MyClass {
  constructor() { }

  activate() {
    ...
    ...
    ...
    UIEvent.broadcast('myview:loaded', data);
  }

  addLog(event) {
    ...
    ...
    ...
    UIEvent.broadcast('log:added', data);
  }
}
```

###### Observing property changes and broadcasted events
```ts
// MyParentView.ts

import { autoinject } from 'aurelia-framework';
import { UIEvent } from 'aurelia-ui-framework';

@autoinject()
export class MyParentView {
  constructor() { }

  systemName = '';
  systemLogs = [];

  obName;
  obLogs;
  obLoaded;
  activate() {
    // subscribe for broadcasted event
    this.obLoaded = UIEvent.subscribe('myview:loaded', data => this.doSomething(data));

    // observe property changes
    this.obName = UIEvent.observe(this, 'systemName', newValue => this.doSomething(newValue));

    // observe collection changes
    this.obLogs = UIEvent.collection(this.systemLogs, newValue => this.doSomething(newValue));
  }

  detached() {
    if(this.obLoaded) this.obLoaded.dispose();
    if(this.obName) this.obName.dispose();
    if(this.obLogs) this.obLogs.dispose();
  }
}
```
