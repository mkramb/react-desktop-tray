import { App, MenuItem } from 'electron';

import { ComponentTypes } from '../index';
import { HostContext } from '../types';

class MenuSeparatorComponent {
  private menuItem: MenuItem;

  constructor(
    public type: ComponentTypes,
    public props: {},
    public rootContainerInstance: App,
    public hostContext: HostContext
  ) {
    this.menuItem = new MenuItem({
      type: 'separator',
    });
  }

  static getHostContext() {}

  appendChild() {}
  removeChild() {}

  finalizeBeforeMount() {
    return false;
  }

  getPublicInstance() {
    return this.menuItem;
  }
}

export { MenuSeparatorComponent };
