import type {GatewayOpcodes} from 'discord-enums'
import type {MessageJSON} from 'discord-types/general'

export const gateway: string = 'wss://gateway.discord.gg/'
export const httpapi: string = 'https://discord.com/api/'
export const CDNUrl: string = 'https://cdn.discordapp.com'
export const apiVersion: number = 10
export interface GatewayPacket {
    op: GatewayOpcodes,
    d: any,
    s: number | null,
    t: string | null
}
export interface MessageProto extends MessageJSON {
    collapsed: boolean
}