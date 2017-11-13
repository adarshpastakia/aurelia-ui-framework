// //
// // @description :
// // @author      : Adarsh Pastakia
// // @copyright   : 2017
// // @license     : MIT
// import { autoinject, NewInstance } from 'aurelia-framework';
// import { bootstrap } from 'aurelia-bootstrapper';
// import { PLATFORM } from 'aurelia-pal';
// import { StageComponent } from 'aurelia-testing';
// import { UIApplication } from '../../src/utils/ui-application';
//
// @autoinject()
// export class MyApp {
//   constructor(public app: UIApplication) {
//     console.log('Making viewport vm');
//   }
// }
//
// describe('Data Model', () => {
//   let component;
//   beforeAll(() => {
//     console.log('Making viewport');
//     component = StageComponent
//       .withResources(PLATFORM.moduleName('../../src/elements/core/ui-viewport'))
//       .inView('<ui-viewport></ui-viewport>')
//       .boundTo(MyApp);
//   });
//
//   it('Render viewport', done => {
//     component.create(bootstrap).then(c => {
//       console.log(c, component);
//       done();
//     });
//   });
//
// });
