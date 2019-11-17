import cfg from './config'
export const ident = cfg.ident
export const appName = (cfg.ident == 'cold') ? 'Cold Crypto' : 'Ice Wallet'
export const cssident = { [cfg.ident]: true }
