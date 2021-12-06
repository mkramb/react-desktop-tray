import { Key, ReactNode } from 'react';

import { RootComponent } from './root';
import { TrayComponent, TrayComponentProps } from './tray';
import { MenuItemComponent, MenuItemComponentProps } from './menu';

const Root = 'ROOT';
const Tray = 'TRAY';
const MenuItem = 'MENU_ITEM';

type Tray = {
  readonly children?: ReactNode;
  readonly key?: Key;
} & TrayComponentProps;

type MenuItem = {
  key?: Key;
} & MenuItemComponentProps;

const ComponentTypes = {
  [Root]: RootComponent,
  [Tray]: TrayComponent,
  [MenuItem]: MenuItemComponent,
};

type ComponentTypes = keyof typeof ComponentTypes;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      TRAY: Tray;
      MENU_ITEM: MenuItem;
    }
  }
}

export { ComponentTypes, Tray, MenuItem };
