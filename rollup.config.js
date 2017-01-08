import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/main.js',
  dest: 'dist/hexie.js',
  format: 'umd',
  moduleName: 'hexie',
  plugins: [ buble() ]
}
