/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { UIBadge } from "./ui-badge";
import * as Helpers from "./ui-helpers";
import { UITooltip } from "./ui-tooltip";

export const Attributes = [UIBadge, UITooltip, ...Object.keys(Helpers).map(k => Helpers[k])];
