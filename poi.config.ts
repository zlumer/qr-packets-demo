import { Options } from 'poi'

let path = process.argv[3] || ''
console.log(`GOT PUBLIC PATH: ${path}`)

const options: Options = {
  entry: 'src/index.ts',
  babel: {
    include: ['base-x']
  },
  plugins: [
    require('@poi/plugin-typescript')()
  ],
  publicPath: path
}

export default options