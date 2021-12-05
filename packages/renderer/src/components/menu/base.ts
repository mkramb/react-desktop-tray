import { App, MenuItem } from 'electron';

import { ComponentTypes } from '../index';
import { HostContext } from '../types';

abstract class BaseItemComponent<TProps> {
  protected menuItem: MenuItem;

  constructor(
    public type: ComponentTypes,
    public props: TProps,
    public rootContainerInstance: App,
    public hostContext: HostContext
  ) {}

  static getHostContext() {}

  appendChild() {}
  removeChild() {}

  finalizeBeforeMount() {
    return true;
  }

  commitMount() {}
  commitUpdate() {}

  unmount() {
    this.menuItem = null;
  }

  getPublicInstance() {
    return this.menuItem;
  }
}

export { BaseItemComponent };
