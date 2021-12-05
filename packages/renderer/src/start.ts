import createDebug from 'debug';
import { app } from 'electron';

import { createElement } from './components/utils';
import { ElectronRenderer } from './reconciler';

const debug = createDebug('renderer');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/**
 * Renders the element that is passed in
 * (equivalent of react-dom's render method)
 */
function start(element) {
  debug('rendering to %o', element);

  const container = createElement('ROOT', {}, app);

  // Returns the current fiber (flushed fiber)
  const root = ElectronRenderer.createContainer(container, 0, false, null);

  const startRender = async () => {
    // Schedules a top level update
    // with current fiber and a priority level
    ElectronRenderer.updateContainer(element, root, null, null);

    debug('application is ready');
  };

  app.whenReady().then(async () => {
    await startRender();
  });
}

export { start };
