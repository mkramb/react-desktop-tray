import { RootComponent } from './root';
import { TrayComponent } from './tray';
import { MenuItemComponent } from './menu';

const Root = 'ROOT';
const Tray = 'TRAY';
const MenuItem = 'MENU_ITEM';
const MenuSeparator = 'MENU_SEPARATOR';

const ComponentTypes = {
  [Root]: RootComponent,
  [Tray]: TrayComponent,
  [MenuItem]: MenuItemComponent,
};

type ComponentTypes = keyof typeof ComponentTypes;

export { ComponentTypes, Tray, MenuItem, MenuSeparator };

export * from './utils';
