import { App, MenuItem } from 'electron';

import { ComponentTypes } from '../index';
import { HostContext } from '../types';

interface MenuItemComponentProps {
  readonly label: string;
  readonly onClick: () => void;
}

class MenuItemComponent {
  private menuItem: MenuItem;

  constructor(
    public type: ComponentTypes,
    public props: MenuItemComponentProps,
    public rootContainerInstance: App,
    public hostContext: HostContext
  ) {
    this.menuItem = new MenuItem({
      type: 'normal',
      label: props.label,
      click: props.onClick,
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

export { MenuItemComponent };
