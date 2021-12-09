import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [{ file: pkg.main, format: 'cjs' }],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
    external: Object.keys(pkg.dependencies),
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'cjs' }],
    plugins: [dts()],
  },
];
