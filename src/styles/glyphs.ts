// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';

@autoinject()
export class StyleGlyphs {
  constructor() { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  glyphs = {
    'Controls': [
      'bars-thin', 'bars-bold', 'ellipsis-v', 'ellipsis-v-line', 'ellipsis-h', 'ellipsis-h-line'
    ],
    'Arrows': [
      'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
      'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
      'chevron-left-2', 'chevron-right-2', 'chevron-up-2', 'chevron-down-2',
      'caret-left', 'caret-right', 'caret-up', 'caret-down'
    ],
    'Symbols': [
      'symbol-dollar', 'symbol-error', 'symbol-exclaim', 'symbol-info', 'symbol-questions', 'symbol-warning'
    ],
    'Icons': [
      'icon-add', 'icon-add-line', 'icon-anchor', 'icon-anchor-line', 'icon-bell', 'icon-bell-line', 'icon-calendar', 'icon-calendar-line',
      'icon-clip', 'icon-clip-line', 'icon-cog', 'icon-cog-line', 'icon-comments', 'icon-comments-line', 'icon-division', 'icon-division-line',
      'icon-download', 'icon-download-line', 'icon-edit', 'icon-edit-line', 'icon-email', 'icon-email-line', 'icon-equal', 'icon-equal-line',
      'icon-female', 'icon-female-line', 'icon-filter', 'icon-filter-line', 'icon-folder', 'icon-folder-line', 'icon-folder-open', 'icon-folder-open-line',
      'icon-heart', 'icon-heart-line', 'icon-home', 'icon-home-line', 'icon-image', 'icon-image-line', 'icon-key', 'icon-key-line',
      'icon-link', 'icon-link-line', 'icon-lock', 'icon-lock-line', 'icon-message', 'icon-message-line', 'icon-minus', 'icon-minus-line',
      'icon-notify', 'icon-notify-line', 'icon-page', 'icon-page-edit', 'icon-page-edit-line', 'icon-page-line', 'icon-page-search', 'icon-page-search-line',
      'icon-palette', 'icon-palette-line', 'icon-pencil', 'icon-pencil-line', 'icon-pencil-ruler', 'icon-pencil-ruler-line',
      'icon-phone', 'icon-phone-line', 'icon-placeholder', 'icon-placeholder-line', 'icon-printer', 'icon-printer-line',
      'icon-reload', 'icon-reload-left', 'icon-reload-left-line', 'icon-reload-line', 'icon-remove', 'icon-remove-line',
      'icon-search', 'icon-search-line', 'icon-search2', 'icon-search2-line', 'icon-star', 'icon-star-line', 'icon-tools', 'icon-tools-line',
      'icon-trash', 'icon-trash-line', 'icon-unlock', 'icon-unlock-line', 'icon-upload', 'icon-upload-line', 'icon-user', 'icon-user-line',
      'icon-web', 'icon-web-line',]
  }
}