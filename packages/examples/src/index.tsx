import React from 'react';
import { start, Menu, MenuItem } from '@react-tray/renderer';

const Application = () => {
  return (
    <Menu>
      <MenuItem label="Google" onClick={() => console.log("Google")} />
      <MenuItem label="Bing" onClick={() => console.log("Google")} />
    </Menu>
  );
);

start(<Application />);
