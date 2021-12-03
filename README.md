# react-desktop-tray

## Example usage

```
import React, { useState } from 'react';
import { start, Menu, MenuItem } from 'react-desktop-tray';

const Application = () => {
  return (
    <Menu>
      <MenuItem label="Google" onClick={() => console.log("Google")} />
      <MenuItem label="Bing" onClick={() => console.log("Google")} />
    </Menu>
  );
);

start(<Application>);
```