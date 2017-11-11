###### Injecting the HttpService
```ts
//MyClass.ts

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';

@autoinject()
export class MyClass {
  constructor(public httpClient: UIHttpService) { }

  activate() {
    // Fetch data results
    this.httpClient.get('/logs', json => this.json = json);
  }

  addLog(event) {
    this.httpClient.post('/logs', { timestamp: new Date().toJSON(), event });
  }

  getNonApiData() {
    this.httpClient.text('http://mydomain.com/help-text.md', md => this.helpMarkdown = md);
  }
}
```

###### Setting the API base URL and default headers
```ts
// main.ts

import { Aurelia } from 'aurelia-framework';
import environment from '../environment';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-ui-framework', config => {
      config
      .apiUrl('https://app.domain.com/api')
      .apiHeaders({ X-API-KEY: 'QWERTYSomeGiberrish=='});
    })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}

```
