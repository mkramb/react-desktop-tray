import { App } from 'electron';

import { HostContext, Props } from '../types';
import { ComponentTypes } from '../index';

class RootComponent {
  constructor(
    public type: ComponentTypes,
    public props: Props,
    public rootContainerInstance: App,
    public hostContext: HostContext
  ) {
    this.rootContainerInstance.dock.hide();
  }

  static getHostContext() {}

  appendChild() {}
  removeChild() {}

  finalizeBeforeMount() {
    return false;
  }

  unmount() {
    this.rootContainerInstance.quit();
  }

  getPublicInstance() {
    return this.rootContainerInstance;
  }
}

export { RootComponent };
