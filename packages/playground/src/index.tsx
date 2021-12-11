import React, { useEffect, useState } from 'react';
import { start, Tray, MenuItem, useShell } from '@react-tray/renderer';

const iconAsBuffer = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
`);

interface UrlItem {
  key: string;
  label: string;
  onClick: () => void;
}

const Application = () => {
  const [urlItems, setUrlItems] = useState<UrlItem[]>([]);
  const { openExternal } = useShell();

  const handleOnClick = (selectedKey) => {
    return () => {
      if (selectedKey === 'google') openExternal('http://google.com');
      if (selectedKey === 'bing') openExternal('http://bing.com');

      setUrlItems((items) => {
        return items.map((item) => {
          let label = item.label;

          if (item.key === selectedKey) {
            label = `${item.label} ✅`;
          }

          return {
            ...item,
            label,
          };
        });
      });
    };
  };

  useEffect(() => {
    setUrlItems([
      { key: 'google', label: 'Google', onClick: handleOnClick('google') },
      { key: 'bing', label: 'Bing', onClick: handleOnClick('bing') },
    ]);
  }, []);

  return (
    <Tray icon={iconAsBuffer} tooltip="Url selector">
      {urlItems.map((item) => {
        return <MenuItem key={item.key} label={item.label} onClick={item.onClick} />;
      })}
    </Tray>
  );
};

start(<Application />);
