# @react-tray/renderer

> React renderer for creating desktop tray application.

This is monorepo which contains multiple `packages`:

- [@react-tray/examples](./packages/examples/README.md)
- [@react-tray/renderer](./packages/examples/README.md)

## Example usage

```
import React, { useState } from 'react';
import { start, Menu, MenuItem } from '@react-tray/renderer';

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
