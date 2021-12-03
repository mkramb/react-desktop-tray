import createReconciler from 'react-reconciler';

import { hostConfig } from './config';

const ElectronRenderer = createReconciler(hostConfig);

export { ElectronRenderer };
