import { RootComponent } from './root';
import { MenuComponent, MenuItemComponent } from './menu';

const Root = 'ROOT';
const Menu = 'MENU';
const MenuItem = 'MENU_ITEM';

const ComponentTypes = {
  [Root]: RootComponent,
  [Menu]: MenuComponent,
  [MenuItem]: MenuItemComponent,
};

type ComponentTypes = keyof typeof ComponentTypes;

export { ComponentTypes, Menu, MenuItem };

export * from './utils';
