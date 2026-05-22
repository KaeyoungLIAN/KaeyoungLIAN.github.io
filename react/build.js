import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/animations.js'],
  outfile: '../assets/react/animations.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
});
