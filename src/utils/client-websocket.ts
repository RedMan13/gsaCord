import {getGatewayUrl} from './discord-urls'
import {GatewayStatus, state} from './state-managment'
import type {GatewayPacket} from './discord-constants'
import {GatewayOpcodes} from 'discord-enums'
import DispatchEvent from './gateway-dispatch-event'

export default class ClientWebsocket extends WebSocket {
    seq: number | null = null
    resumePoint: string = ''
    sessionId: string = ''
    interval: NodeJS.Timer
    waiting: boolean

    constructor(token: string, oldWebsocket?: ClientWebsocket) {
        state.gateway.status = GatewayStatus.Connecting
        let url = getGatewayUrl()
        if (oldWebsocket) {
            url = oldWebsocket.resumePoint
        }
        super(url)
        if (oldWebsocket) {
            this.onopen = () => {
                this.sendOpcode(GatewayOpcodes.Resume, {
                    token,
                    session_id: oldWebsocket.sessionId,
                    seq: oldWebsocket.seq
                })
            }
        }
        this.addEventListener('message', (e) => {
            const packet: GatewayPacket = JSON.parse(e.data)
            const eventData: any = packet.d

            switch (packet.op) {
            case GatewayOpcodes.Dispatch:
                if (packet.t === 'READY') {
                    this.resumePoint = eventData.resume_gateway_url
                    this.sessionId = eventData.session_id
                    state.gateway.status = GatewayStatus.Connected
                }
                this.seq ??= packet.s
                this.dispatchEvent(new DispatchEvent(packet.t, eventData))
                break
            case GatewayOpcodes.Heartbeat:
                this.sendHeartbeat()
                break
            case GatewayOpcodes.Reconnect:
                state.gateway.status = GatewayStatus.Reconnecting
                this.reconnect()
                break
            case GatewayOpcodes.InvalidSession:
                this.close()
                state.gateway.status = GatewayStatus.Unauthorized
                break
            case GatewayOpcodes.Hello:
                this.setHeartbeat(eventData.heartbeat_interval)
                this.sendHeartbeat()
                this.sendOpcode(GatewayOpcodes.Indentify, {
                    token,
                    capabilities: 8189,
                    properties: {
                        os: 'linux',
                        browser: "app",
                        device: 'pooter'
                    }
                })
                break
            case GatewayOpcodes.HeartbeatACK:
                this.waiting = false
                break
            }
        })
        this.addEventListener('close', () => {
            state.gateway.status = GatewayStatus.Closed
        })
    }
    close() {
        super.close()
        if (this.interval) clearInterval(this.interval)
        this.waiting = false
        this.seq = null
        this.resumePoint = ''
        this.sessionId = ''
    }
    reconnect() {
        this.close()
        state.gateway.ws = new ClientWebsocket(state.token, this)
    }
    sendOpcode(opcode: GatewayOpcodes, data: any) {
        this.send(JSON.stringify({
            op: opcode,
            d: data
        }))
    }
    sendHeartbeat() {
        if (this.waiting) {
            this.reconnect()
            return
        }
        this.sendOpcode(GatewayOpcodes.Heartbeat, this.seq)
        this.waiting = true
    }
    setHeartbeat(interval: number) {
        if (this.interval) clearInterval(this.interval)
        this.interval = setInterval(() => this.sendHeartbeat(), interval)
    }
}