import sharp from 'sharp';
import { App, Menu, MenuItem, nativeImage, Tray } from 'electron';

import { HostContext } from '../types';
import { ComponentTypes } from '../index';
import { MenuItemComponent } from '../menu';

interface TrayComponentProps {
  readonly icon: Buffer;
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

  async removeChild(child: MenuItemComponent) {
    const index = this.menuItems.indexOf(child.getPublicInstance());

    if (index > -1) {
      this.menuItems.splice(index, 1);
    }
  }

  finalizeBeforeMount() {
    return true;
  }

  async commitMount() {
    const icon = await sharp(this.props.icon).png().resize(16, 16).toBuffer();
    const menu = Menu.buildFromTemplate(this.menuItems);

    this.tray.setImage(nativeImage.createFromBuffer(icon));
    this.tray.setToolTip(this.props.tooltip);
    this.tray.setContextMenu(menu);
  }

  async commitUpdate(_payload) {
    await this.commitMount();
  }

  unmount() {
    this.tray.destroy();

    this.menuItems = null;
    this.tray = null;
  }

  getPublicInstance() {
    return this.rootContainerInstance;
  }
}

export { TrayComponent, TrayComponentProps };
