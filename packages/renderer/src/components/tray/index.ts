import { App, Menu, MenuItem, nativeImage, Tray } from 'electron';

import { HostContext } from '../types';
import { ComponentTypes } from '../index';
import { MenuItemComponent } from '../menu';

interface TrayComponentProps {
  readonly iconDataUrl: string;
  readonly tooltip?: string;
}

class TrayComponent {
  private tray: Tray;
  private menuItems: MenuItem[] = [];

  constructor(
    public type: ComponentTypes,
    public props: TrayComponentProps,
    public rootContainerInstance: App,
    public hostContext: HostContext
  ) {
    this.tray = new Tray(nativeImage.createEmpty());
    this.tray.setIgnoreDoubleClickEvents(true);
  }

  static getHostContext() {}

  appendChild(child: MenuItemComponent) {
    this.menuItems.push(child.getPublicInstance());
  }

  removeChild(child: MenuItemComponent) {
    const index = this.menuItems.indexOf(child.getPublicInstance());

    if (index > -1) {
      this.menuItems.splice(index, 1);
    }
  }

  finalizeBeforeMount() {
    if (this.props.tooltip) {
      this.tray.setToolTip(this.props.tooltip);
    }

    return true;
  }

  commitMount() {
    const icon = nativeImage.createFromDataURL(this.props.iconDataUrl);
    const menu = Menu.buildFromTemplate(this.menuItems);

    this.tray.setContextMenu(menu);
    this.tray.setImage(icon);
  }

  commitUpdate() {}

  unmount() {
    this.tray.destroy();

    this.menuItems = null;
    this.tray = null;
  }

  getPublicInstance() {
    return this.rootContainerInstance;
  }
}

export { TrayComponent };
