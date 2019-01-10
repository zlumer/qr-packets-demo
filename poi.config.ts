import { Options } from 'poi'

const options: Options = {
  entry: 'src/index.ts',
  babel: {
    include: ['base-x']
  },
  plugins: [
    require('@poi/plugin-typescript')()
  ],
  publicPath: ""
}

export default options