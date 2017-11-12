//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from "aurelia-framework";

@autoinject()
export class InputContent {
  constructor() {
    this.model = new DataModel();
    (this.model.languages['en'] = new LangModel()).description = `# English Content ${this.md}`;
  }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  errors;
  dir = 'ltr';
  plain = '';
  language = '';
  model: DataModel;
  addLanguage(lang) {
    (this.model.languages[lang.id] = new LangModel()).description = `# ${lang.name} Content ${this.md}`;
  }
  removeLanguage(lang) {
    delete this.model.languages[lang.id];
  }

  md = `


##### I _Love_ ~~HTML~~ __Markdown__!

---

I can be __BOLD__, I can also be _ITALIC_, or you can ~~DELETE~~ me too!

Look at me I'm a list

-	Item
-	Item
-	Item

And I'm numbered

1.	Item
2.	Item
3.	Item

I can also be a link [Click Me](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) or show the whole url http://google.com

![Image](examples/images/heart.png) Dont you just love images!
`;
}

export class DataModel {
  title: string = '';
  languages = {};
}

export class LangModel {
  summary: string = '';
  description: string = '';
}
