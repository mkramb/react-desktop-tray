import { MenuItem } from 'electron';

import { BaseItemComponent } from './base';

interface MenuItemComponentProps {
  readonly label: string;
  readonly onClick: () => void;
}

interface MenuItemSeparatorComponentProps {
  readonly type: 'separator';
}

class MenuItemComponent extends BaseItemComponent<
  MenuItemComponentProps | MenuItemSeparatorComponentProps
> {
  constructor(type, props, rootContainerInstance, hostContext) {
    super(type, props, rootContainerInstance, hostContext);

    let item = {};

    switch (props.type ?? 'normal') {
      case 'normal': {
        item = {
          type: 'normal',
          label: props.label,
          click: props.onClick,
        };
        break;
      }
      case 'separator': {
        item = {
          type: 'separator',
        };
        break;
      }
      default: {
        throw 'Unsupported "type" for MenuItem';
      }
    }

    this.menuItem = new MenuItem(item);
  }
}

export { MenuItemComponent };
