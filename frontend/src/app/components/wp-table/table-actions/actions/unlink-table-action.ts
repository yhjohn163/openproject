import {
  contextColumnIcon,
  OpTableAction,
  OpTableActionFactory,
} from 'core-components/wp-table/table-actions/table-action';
import {opIconElement} from 'core-app/helpers/op-icon-builder';
import {Injector} from '@angular/core';
import {WorkPackageResource} from 'core-app/modules/hal/resources/work-package-resource';

export class OpUnlinkTableAction extends OpTableAction {

  constructor(public injector:Injector,
              public workPackage:WorkPackageResource,
              public readonly identifier:string,
              private title:string,
              readonly onClick:(workPackage:WorkPackageResource) => void) {
    super(injector, workPackage);

  }

  /**
   *  Returns a factory for this action with the given title and identifier for reusing
   *  remove actions.
   *
   * @param {string} identifier
   * @param {string} title
   */
  public static factoryFor(identifier:string,
                           title:string,
                           onClick:(workPackage:WorkPackageResource) => void):OpTableActionFactory {
    return (injector:Injector, workPackage:WorkPackageResource) => {
      return new OpUnlinkTableAction(injector,
        workPackage,
        identifier,
        title,
        onClick) as OpTableAction;
    };
  }

  public buildElement() {
    let element = document.createElement('a');
    element.title = this.title;
    element.href = '#';
    element.classList.add(contextColumnIcon, 'wp-table-action--unlink');
    element.dataset.workPackageId = this.workPackage.id.toString();
    element.appendChild(opIconElement('icon', 'icon-close'));
    jQuery(element).click((event) => {
      event.preventDefault();
      this.onClick(this.workPackage);
    });

    return element;
  }
}
