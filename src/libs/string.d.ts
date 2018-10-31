/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

declare interface String {
  ascii(): string;
  interpolate(model: KeyValue): string;
}
