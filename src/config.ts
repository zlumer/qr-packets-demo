// webpack env variables

declare let ROOT_PATH: string
console.log(`ROOT_PATH: ${ROOT_PATH}`)
// console.assert(ROOT_PATH, "ROOT_PATH is not defined!") // valid if empty

declare let GIT_VERSION: string
console.assert(GIT_VERSION, "GIT_VERSION is not defined!")
declare let GIT_REMOTE: string
console.assert(GIT_REMOTE, "GIT_REMOTE is not defined!")

declare let PROJ_IDENT: string                                                                                                
console.log(`PROJ_IDENT: ${PROJ_IDENT}`)

export default {
	blockchains: ["eth", "eos", "btc", "bch"],
	basePath: ROOT_PATH,
	ident: PROJ_IDENT,
	gitVersion: GIT_VERSION,
	gitRemote: GIT_REMOTE,
}