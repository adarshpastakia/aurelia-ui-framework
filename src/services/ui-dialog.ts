/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, CompositionEngine, Container, singleton, View } from "aurelia-framework";
import { Origin } from "aurelia-metadata";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@singleton()
export class UIDialogService {
  private activeWin;
  private windows = [];
  private initialized = false;

  private dragObject = {
    dialog: undefined,
    dlgHeight: 0,
    dlgWidth: 0,
    isDragging: false,
    left: 0,
    maxHeight: 0,
    maxWidth: 0,
    startX: 0,
    startY: 0,
    top: 0
  };

  constructor(
    private appConfig: UIAppConfig,
    private container: Container,
    private compositionEngine: CompositionEngine
  ) {
  }

  public open(viewModel, model?) {
    return this.openDialog(viewModel, model);
  }

  public openModal(viewModel, model?) {
    return this.openDialog(viewModel, model, true);
  }

  private openDialog(viewModel, model, modal = false) {
    this.initialize();

    const instruction: AnyObject = {
      childContainer: this.container.createChild(),
      container: this.container,
      model,
      viewModel
    };

    return new Promise(resolve => {
      this.getViewModel(instruction)
        .then(newInstruction =>
          UIInternal.invokeLifecycle(newInstruction.viewModel, "canActivate", model)
        )
        .then(canActivate => {
          return canActivate !== false
            ? this.compositionEngine.createController(instruction)
            : Promise.reject(new Error("canActivate rejected"));
        })
        .then(controller => {
          controller.automate();
          const dialog = (controller.view as View & { controllers: AnyObject[] }).controllers.find(
            c => c.viewModel
          );
          dialog.viewModel.modal = modal;
          dialog.viewModel.viewController = controller;
          dialog.viewModel.returnPromise = resolve;
          this.appConfig.DialogContainer.add(controller.view);
          if (dialog.viewModel.taskButton) {
            this.appConfig.TaskbarContainer.add(dialog.viewModel.taskButton);
          }
          controller.attached();

          if (this.activeWin) {
            this.activeWin.active = false;
          }
          this.windows.unshift((this.activeWin = dialog.viewModel));
        });
    });
  }

  private initialize() {
    if (!this.initialized) {
      this.initialized = true;
      UIInternal.subscribe("dlg:close", d => this.closeDialog(d));
      UIInternal.subscribe("dlg:activate", d => this.activate(d.dialog));
      UIInternal.subscribe("dlg:minimize", d => this.minimizeDialog(d.dialog));
      UIInternal.subscribe("dlg:drag", d => this.startDrag(d));

      document.addEventListener("mousemove", e => this.drag(e));
      document.addEventListener("mouseup", () => this.stopDrag());

      if (this.appConfig.TaskbarContainer) {
        this.appConfig.TaskbarContainer.anchor.addEventListener("click", (e: AnyObject) => {
          try {
            const dialog = e.target.au.controller.scope.bindingContext;
            if (dialog.minimized || dialog.active) {
              dialog.minimize();
            } else {
              this.activate(dialog);
            }
          } catch (ex) {
            //
          }
        });
      }
    }
  }

  private startDrag(startObject): void {
    this.dragObject = {
      ...startObject,
      dlgHeight: startObject.dialog.dialogEl.offsetHeight,
      dlgWidth: startObject.dialog.dialogEl.offsetWidth,
      isDragging: true,
      left: parseInt(startObject.dialog.position.left, 10),
      maxHeight: this.appConfig.DialogContainer.anchor.offsetHeight,
      maxWidth: this.appConfig.DialogContainer.anchor.offsetWidth,
      top: parseInt(startObject.dialog.position.top, 10)
    };
  }

  private drag($event): void {
    if (this.dragObject.isDragging) {
      const leftDiff = ($event.x || $event.clientX) - this.dragObject.startX;
      const topDiff = ($event.y || $event.clientY) - this.dragObject.startY;

      if (this.dragObject.left + leftDiff + this.dragObject.dlgWidth > this.dragObject.maxWidth) {
        this.dragObject.dialog.position.left =
          this.dragObject.maxWidth - this.dragObject.dlgWidth + "px";
      } else if (this.dragObject.left + leftDiff > 0) {
        this.dragObject.dialog.position.left = this.dragObject.left + leftDiff + "px";
      }
      if (this.dragObject.top + topDiff + this.dragObject.dlgHeight > this.dragObject.maxHeight) {
        this.dragObject.dialog.position.top =
          this.dragObject.maxHeight - this.dragObject.dlgHeight + "px";
      } else if (this.dragObject.top + topDiff > 0) {
        this.dragObject.dialog.position.top = this.dragObject.top + topDiff + "px";
      }
    }
  }

  private stopDrag(): void {
    if (this.dragObject.isDragging) {
      this.dragObject.isDragging = false;
    }
  }

  private minimizeDialog(dialog): void {
    if (dialog) {
      if (dialog.minimized && this.activeWin === dialog) {
        this.activeWin = this.windows.find(d => !d.active && !d.minimized && d !== dialog);
        this.activeWin ? (this.activeWin.active = true) : fn();
      } else {
        this.activate(dialog);
      }
    }
  }

  private closeDialog(detail): void {
    if (detail && detail.dialog) {
      const { dialog, result } = detail;
      UIInternal.invokeLifecycle(dialog.viewController.viewModel, "canDeactivate", result).then(
        canDeactivate => {
          if (canDeactivate !== false) {
            UIInternal.invokeLifecycle(dialog.viewController.viewModel, "deactivate");
            this.appConfig.DialogContainer.remove(dialog.viewController.view);
            if (dialog.taskButton) {
              this.appConfig.TaskbarContainer.remove(dialog.taskButton);
            }
            dialog.viewController.unbind();
            dialog.returnPromise({ result, cancelled: result === undefined });

            this.windows.remove(dialog);
            this.activeWin = this.windows.find(win => !win.minimized);
            if (this.activeWin) {
              this.activeWin.active = true;
            }
          }
        }
      );
    }
  }

  private activate(dialog): void {
    if (this.activeWin) {
      this.activeWin.active = false;
    }
    this.activeWin = dialog;
    dialog.active = true;
  }

  private getViewModel(instruction): Promise<AnyObject> {
    if (isFunction(instruction.viewModel)) {
      const moduleId = Origin.get(instruction.viewModel).moduleId;
      if (moduleId) {
        instruction.viewModel = moduleId;
      }
    }
    return this.compositionEngine.ensureViewModel(instruction);
  }
}
