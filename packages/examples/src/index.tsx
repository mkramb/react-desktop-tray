import React from 'react';
import { start, Menu, MenuItem, MenuSeparator } from '@react-tray/renderer';

const Application = () => {
  return (
    <Menu tooltip="This is my application.">
      <MenuItem label="Google" onClick={() => console.log('open Google')} />
      <MenuSeparator />
      <MenuItem label="Bing" onClick={() => console.log('open Bing')} />
    </Menu>
  );
};

start(<Application />);
