import { Options } from 'poi'

let path = process.env.POI_PATH || ''
console.log(path ? `GOT PUBLIC PATH: ${path}` : `no public path used`)

const options: Options = {
  entry: 'src/index.ts',
  babel: {
    include: ['base-x']
  },
  plugins: [
    require('@poi/plugin-typescript')()
  ],
  publicPath: path,
  define: {
    ROOT_PATH: `"${path}"`
  }
}

export default options