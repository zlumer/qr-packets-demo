import { Options } from 'poi'
import git from 'git-rev-sync'

let path = process.env.POI_PATH || ''
console.log(path ? `GOT PUBLIC PATH: ${path}` : `no public path used`)


let proj:'cold'|'ice' = (process.env.POI_PROJ as any) || 'cold'                                 
console.log(`GOT PROJ: ${proj}`)                                                                
function htmlTitle(p: typeof proj){ return (p == 'cold') ?                                      
  'Cold Crypto · Secure Crypto Wallet for ETH and EOS'                                          
  : 'Ice Wallet · Secure Crypto Wallet for ETH and EOS'                                         
}                                                                                               
function favicon(p: typeof proj){ return (p == 'cold') ? {favicon: 'static/favicon.ico'} : {} } 


let remoteUrl = git.remoteUrl()
let version = `${git.tag()}`
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
  html: {
    title: htmlTitle(proj),                                                                                                   
    description: 'Secure cold wallet for crypto assets. Store your crypto safely on any cheap mobile phone.',                 
    ...favicon(proj)
  },
  publicPath: path,
  define: {
    ROOT_PATH: `"${path}"`,
    GIT_VERSION: `"${version}"`,
    GIT_REMOTE: `"${remoteUrl}"`,
    PROJ_IDENT: `"${proj}"`,
  }
}

export default options