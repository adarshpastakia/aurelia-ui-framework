/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Colors } from "../resources/colors";

export class ColorsPage {
  protected colorClasses = {
    classes: [
      { name: "ui-bg--{color}", description: "Background color override" },
      { name: "ui-color--{color}", description: "Text color override" },
      { name: "ui-border--{color}", description: "Border color override" }
    ]
  };

  protected grayscale = [
    { color: "gray-dark", bg: "white" },
    { color: "gray-dark", bg: "gray-light" },
    { color: "white", bg: "gray" },
    { color: "white", bg: "gray-dark" },
    { color: "white", bg: "black" }
  ];
  protected baseColors = Colors.base;
  protected colorscale = ["shade", "dark", "light", "tint"];

  protected extraColors = Colors;
}
