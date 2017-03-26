import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/polyglot.js',
  dest: 'dist/polyglot.js',
  format: 'umd',
  moduleName: 'Polyglot',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel()
  ]
};
