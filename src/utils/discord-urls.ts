import {gateway, httpapi, apiVersion, CDNUrl} from './discord-constants'

export function generateUrl(path: string, version: number = apiVersion) {
    return `${httpapi}v${version}${path}`
}
export function getGatewayUrl(
    version: number = apiVersion, 
    encoding: 'json' | 'etf' = 'json', 
    compress: boolean = false) {
    return `${gateway}?v=${version}&encoding=${encoding}${compress ? '&compress=zlib-stream' : ''}`
}
export function createCDNUrl(path: string) {
    return `${CDNUrl}${path}`
}
export function getAvatarCDN(userId: string, hash: string) {
    if (!hash) return null
    return createCDNUrl(`/avatars/${userId}/${hash}.png`)
}