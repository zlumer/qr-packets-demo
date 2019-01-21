import { Options } from 'poi'
import git from 'git-rev-sync'

let path = process.env.POI_PATH || ''
console.log(path ? `GOT PUBLIC PATH: ${path}` : `no public path used`)

let remoteUrl = git.remoteUrl()
let version = `${git.branch()}@${git.tag()}`
console.log(`Building version ${version}`)

const options: Options = {
  entry: 'src/index.ts',
  babel: {
    include: ['base-x']
  },
  minimize: false,
  plugins: [
    require('@poi/plugin-typescript')()
  ],
  publicPath: path,
  define: {
    ROOT_PATH: `"${path}"`,
    GIT_VERSION: `"${version}"`,
    GIT_REMOTE: `"${remoteUrl}"`,
  }
}

export default options