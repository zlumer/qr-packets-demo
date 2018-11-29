import { Options } from 'poi'

const options: Options = {
  entry: 'src/index.ts',
  plugins: [
    require('@poi/plugin-typescript')()
  ],
  publicPath: ""
}

export default options