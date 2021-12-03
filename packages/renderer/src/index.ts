import { app } from 'electron';

import { createElement } from './components';
import { ElectronRenderer } from './reconciler';

/**
 * Renders the element that is passed in
 * (equivalent of react-dom's render method)
 */
function start(element) {
  const container = createElement('ROOT', {}, app);

  // Returns the current fiber (flushed fiber)
  const root = ElectronRenderer.createContainer(container, 0, false, null);

  const startRender = async () => {
    // Schedules a top level update
    // with current fiber and a priority level
    ElectronRenderer.updateContainer(element, root, null, null);
  };

  app.whenReady().then(async () => {
    await startRender();
  });
}

export { start };
