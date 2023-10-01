import type {DiscordTheme} from './themes'
import type {Guild, MessageJSON} from 'discord-types/general'
import type ClientWebsocket from './client-websocket'

export enum GatewayStatus {
    Disconnected,
    Connecting,
    Connected,
    Closed,
    Reconnecting,
    Unauthorized
}
export interface GatewayState {
    ws: ClientWebsocket | null,
    status: GatewayStatus
}
export interface State {
    login: boolean,
    token: string | null,
    theme: DiscordTheme | null,
    guilds: Array<Guild>,
    channel: string,
    mPage: number,
    guild: string,
    gateway: GatewayState,
    messages: Array<MessageJSON>,
    lastMessage: string | null
}

export const state: State = {
    login: false,
    token: null,
    theme: null,
    guilds: [],
    channel: '',
    mPage: 0,
    guild: 'friends',
    gateway: {
        ws: null,
        status: GatewayStatus.Disconnected
    },
    messages: [],
    lastMessage: null
}
