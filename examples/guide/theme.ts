/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class ThemePage {
  protected theming = `@import "~aurelia-ui-framework/sass/colors";

$primary: $indigo;
$secondary: $pink;

$info: $blue;
$danger: $red;
$success: $green;
$warning: $orange;

// Framework colors
$base-theme: $white; // Change to $black for dark theme
$base-invert: $black; // Change to $white for dark theme

//**
//* Calculate base background using gray as a base
//* 
//* $base-bg: mix($gray, $base-theme, 15%);
//* $base-color: mix($gray, $base-invert, 15%);
//**

@import "~aurelia-ui-framework/sass/aurelia-ui-framework";
`;
}
