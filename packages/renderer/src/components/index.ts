import { RootComponent } from './root';
import { MenuComponent, MenuItemComponent, MenuSeparatorComponent } from './menu';

const Root = 'ROOT';
const Menu = 'MENU';
const MenuItem = 'MENU_ITEM';
const MenuSeparator = 'MENU_SEPARATOR';

const ComponentTypes = {
  [Root]: RootComponent,
  [Menu]: MenuComponent,
  [MenuItem]: MenuItemComponent,
  [MenuSeparator]: MenuSeparatorComponent,
};

type ComponentTypes = keyof typeof ComponentTypes;

export { ComponentTypes, Menu, MenuItem, MenuSeparator };

export * from './utils';
