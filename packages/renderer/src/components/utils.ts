import { ComponentTypes } from './index';

function getElementClass(type) {
  const elementClass = ComponentTypes[type];

  if (!elementClass) {
    throw new Error(`type '${type}' is not supported!`);
  }

  return elementClass;
}

function createElement(
  type: keyof typeof ComponentTypes,
  props = {},
  rootContainerInstance = undefined,
  hostContext = null
) {
  const ElementClass = getElementClass(type);
  return new ElementClass(type, props, rootContainerInstance, hostContext);
}

export { createElement, getElementClass };
