import createDebug from 'debug';
import { applyChange, observableDiff } from 'deep-diff';

import { createElement, getElementClass } from '../components';

const debug = createDebug('config');

const hostConfig = {
  /**
   * Only a single renderer instance is permitted.
   */
  isPrimaryRenderer: true,

  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  /**
   * `hostContext` allows us to pass information down to the create and update
   * functions of lower lying elements. We're not using it at the moment, but
   * in this function we could create the `rootHostContext` that gets passed
   * down. This function will only get called for the root.
   *
   * Note that the hostContext functions get called from the root to the leaves
   * of the tree. This is important, because not every lifecycle step behaves
   * that way.
   */
  getRootHostContext() {
    debug('getRootHostContext');
    return null;
  },

  /**
   * This function will get called for every node in the tree that is not the
   * root. We can expand on a parent's hostContext here, and pass an extended
   * object further down.
   *
   * We let the element classes decide for themselves what to return here. Note
   * that at this point we don't have an instance of the element yet, so all we
   * can do is call a static function on the class.
   */
  getChildHostContext(parentHostContext, type) {
    debug('getChildHostContext %o', { type });

    return {
      hostContext: parentHostContext,
      ...getElementClass(type).getHostContext(),
    };
  },

  /**
   * When `ref` is used on one of our components, this is what will be returned.
   * We let the instance decide what should be returned.
   */
  getPublicInstance(instance) {
    debug('getChildHostContext', { instance });

    return instance.getPublicInstance();
  },

  /**
   * This will be called for every element in the user's tree that is not a
   * custom component. In our case, `createElement` knows what to do with each
   * element type, and creates the instances for us.
   */
  createInstance(type, props, rootContainer, hostContext) {
    debug('createInstance %o', { type });

    return createElement(type, props, rootContainer, hostContext);
  },

  /**
   * Text Instances are not supported.
   */
  createTextInstance() {
    throw new Error('TextElements are not supported!');
  },
  shouldSetTextContent() {
    return false;
  },

  /**
   * This will get called before the first mount for every child in the tree,
   * except for direct children of the root. Note that we don't need initial
   * insert or remove, as before the first mount there are no children yet, and
   * every child can simply be appended.
   */
  appendInitialChild(parentInstance, child) {
    debug('appendInitialChild');

    parentInstance.appendChild(child);
  },
  appendChild(parentInstance, child) {
    debug('appendChild');

    parentInstance.appendChild(child);
  },
  appendChildToContainer(container, child) {
    debug('appendChildToContainer');

    container.appendChild(child);
  },

  /**
   * As above, but for the case where the an existing child element is being removed.
   */
  removeChild(parentInstance, child) {
    debug('removeChild');

    parentInstance.removeChild(child);
    child.unmount();
  },
  removeChildFromContainer(container, child) {
    debug('removeChildFromContainer');

    container.removeChild(child);
    child.unmount();
  },

  /**
   * Likewise, this is meant to finalize an element *after* it has had a chance
   * to 'attach' its children (i.e. after `appendInitialChild` has run for all
   * its child elements.)
   *
   * The return value of this function determines whether React Fiber will run
   * `commitMount` for the newly created element.
   */
  finalizeInitialChildren(newElement, type, props, rootContainerInstance) {
    debug('finalizeInitialChildren %o', { type });

    return newElement.finalizeBeforeMount(props, rootContainerInstance);
  },

  /**
   * ReactDOM uses this to focus any input elements it just created.
   * Used for any last processing of component.
   */
  commitMount(instance, type, newProps, _internalInstanceHandle) {
    debug('commitMount %o', { type });

    instance.commitMount(newProps);
  },

  /**
   * Not used.
   */
  clearContainer() {},
  resetAfterCommit() {},
  preparePortalMount() {},
  prepareForCommit() {
    return null;
  },

  /**
   * This method happens **in the render phase**. It should only *calculate* the update —
   * but not apply it! For example, the DOM renderer returns an array that looks like
   * `[prop1, value1, prop2, value2, ...]` for all props that have actually changed.
   * And only in `commitUpdate` it applies those changes. You should calculate as
   * much as you can in `prepareUpdate` so that `commitUpdate` can be very fast
   * and straightforward.
   */
  prepareUpdate(_instance, type, oldProps, newProps) {
    debug('prepareUpdate %o', { type });

    const filteredProps = {
      children: undefined,
    };

    const oldPropsToBeCompared = { ...oldProps, ...filteredProps };
    const newPropsToBeCompared = { ...newProps, ...filteredProps };

    let diffProps = {};

    observableDiff(oldPropsToBeCompared, newPropsToBeCompared, (diff) => {
      applyChange(diffProps, {}, diff);
    });

    debug('prepareUpdate - diffProps %o', { diffProps });

    return diffProps;
  },
  commitUpdate(instance, updatePayload) {
    debug('commitUpdate %o', { updatePayload });

    instance.commitUpdate(updatePayload);
  },

  /**
   * Timers and scheduling.
   */
  now: Date.now,
  noTimeout: -1,
  scheduleTimeout() {},
  cancelTimeout() {},
};

export { hostConfig };
