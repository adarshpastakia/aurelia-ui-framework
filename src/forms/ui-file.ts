/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView, viewResources } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";
import { InputWrapper } from "./input-wrapper";
import view from "./ui-file.html";

@customElement("ui-file")
@viewResources(InputWrapper)
@inlineView(view)
export class UIFileInput extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";

  @bindable()
  public placeholder: string = "";
  @bindable()
  public errors: string | string[];

  @bindable()
  public maxFiles: number = 1;

  @bindable()
  public readonly: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  protected files = [];
  protected inputEl: HTMLInputElement & { draggedFiles: AnyObject[] };
  protected dragging = false;

  constructor(element: Element) {
    super(element);
  }

  protected attached() {
    this.files = [];
    this.inputEl.value = "";
    this.inputEl.draggedFiles = this.files;
  }

  protected dragEnter($event) {
    this.dragging = true;
    $event.preventDefault();
    return false;
  }

  protected dragExit() {
    this.dragging = false;
  }

  protected drop($event) {
    this.dragging = false;
    $event.preventDefault();
    this.mutateFiles($event.dataTransfer.files);
    return false;
  }

  protected fileChoose(evt) {
    evt.stopPropagation();
    this.mutateFiles(this.inputEl.files);
  }

  protected remove(index) {
    this.files.splice(index, 1);
    this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
  }

  private mutateFiles(files) {
    for (const file of files) {
      const f = {
        file,
        name: file.name,
        size: file.size || 0,
        ext: file.type
      };
      if (this.files.length === this.maxFiles) {
        this.files.splice(0, 1);
      }
      this.files.push(f);
    }
    this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
  }
}
