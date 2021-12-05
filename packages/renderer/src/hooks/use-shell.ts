import { shell } from 'electron';

const useShell = () => {
  return {
    showItemInFolder: shell.showItemInFolder,
    openExternal: shell.openExternal,
    openPath: shell.openPath,
  };
};

export { useShell };
