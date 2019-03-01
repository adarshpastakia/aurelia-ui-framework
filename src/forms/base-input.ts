/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { computedFrom } from "aurelia-framework";
import { UIDrop } from "../shared/ui-drop";
import { UIInternal } from "../utils/ui-internal";

export class BaseInput {
  public value: AnyObject;

  protected inputEl: HTMLInputElement | HTMLTextAreaElement;

  protected errors: string | string[];
  protected maxlength: number = 0;
  protected allowClear: boolean = false;
  protected showCounter: boolean = false;

  protected readonly: string | boolean = false;
  protected disabled: string | boolean = false;
  protected isDisabled: string | boolean = false;

  protected dropHandle: string;
  protected dropEl: UIDrop;

  constructor(protected element: Element) {
    this.allowClear = element.hasAttribute("clear") || element.hasAttribute("clear.trigger");
    this.showCounter = element.hasAttribute("counter");
  }

  public focus() {
    this.inputEl.focus();
  }

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  @computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length")
  get classes(): string {
    const classes = [];
    if (this.errors && this.errors.length > 0) {
      classes.push("ui-input--invalid");
    }
    if (this.isTrue("readonly")) {
      classes.push("ui-input--readonly");
    }
    if (this.isTrue("disabled") || this.isDisabled) {
      classes.push("ui-input--disabled");
    }
    return classes.join(" ");
  }

  protected bind(): void {
    this.readonly = this.isTrue("readonly");
    this.disabled = this.isTrue("disabled");
  }

  protected clear(): void {
    this.value = "";
    this.inputEl.focus();
    this.element.dispatchEvent(UIInternal.createEvent("clear"));
    this.element.dispatchEvent(UIInternal.createEvent("change"));
  }

  protected fireEnter($event: KeyboardEvent): boolean {
    if ($event.keyCode === 13) {
      $event.stopEvent();
      this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
    }
    return true;
  }

  protected canToggleDrop(evt: FocusEvent): void {
    if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
      this.toggleDrop(false);
    }
  }

  protected toggleDrop(open?: boolean): boolean {
    if (open === true && this.dropEl.isOpen) {
      UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
      return;
    }
    const beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
    const afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop(open);
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
      if (this.dropEl.isOpen) {
        this.inputEl.select();
        return true;
      } else {
        return false;
      }
    }
  }

  private isTrue(prop: string): boolean {
    return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
  }
}
