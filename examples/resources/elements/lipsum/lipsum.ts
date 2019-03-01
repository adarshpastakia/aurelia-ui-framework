/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { containerless, resource, view } from "aurelia-framework";

@containerless()
@resource({ name: "lipsum-title", bindables: ["class"] })
@view("<template><span class.bind='class'>Lorem ipsum dolor sit amet.</span></template>")
export class LipsumTitle {}

@containerless()
@resource({ name: "lipsum-line", bindables: ["class"] })
// tslint:disable
@view("<template><span class.bind='class'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dui arcu, tincidunt nec viverra a, mollis in ligula.</span></template>")
// tslint:enable
export class LipsumLine {}

@containerless()
@resource({ name: "lipsum-para", bindables: ["class"] })
// tslint:disable
@view("<template><span class.bind='class'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dui arcu, tincidunt nec viverra a, mollis in ligula. Morbi consequat, massa eu mollis tempor, libero lacus bibendum orci, aliquet pharetra quam dolor sit amet sem. Nunc fringilla, leo at ultrices porta, dolor ante semper nulla, vel egestas turpis felis vel felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras venenatis, nibh non sodales ultrices, elit elit faucibus nulla, id sodales arcu massa eu felis. Maecenas iaculis nunc eget sodales vestibulum. Pellentesque non auctor elit. Nam tincidunt tristique augue a placerat.</span></template>")
// tslint:enable
export class LipsumPara {}
