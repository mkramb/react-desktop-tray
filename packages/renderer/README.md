# @react-tray/renderer

## Installation

```
npm install @react-tray/renderer
```

## Example usage

```
import React, { useEffect, useState } from 'react';
import { start, Tray, MenuItem, useShell } from '@react-tray/renderer';

const iconAsBuffer = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
`);

const Application = () => {
  const [url, setUrl] = useState(null);
  const { openExternal } = useShell();

  const handleGoogle = () => setUrl('http://google.com');
  const handleBing = () => setUrl('http://bing.com');

  useEffect(() => {
    if (url) {
      openExternal(url);
    }
  }, [url]);

  return (
    <Tray icon={iconAsBuffer}>
      <MenuItem label="Google" onClick={handleGoogle} />
      <MenuItem type="separator" />
      <MenuItem label="Bing" onClick={handleBing} />
    </Tray>
  );
};

start(<Application />);
```
