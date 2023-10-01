<script lang="ts">
    import { setContext, getContext } from 'svelte'
    import {fetchDiscord} from './utils/discord-requests'
    import Loading from './components/loading.svelte'
    import ClientWebsocket from './utils/client-websocket'
    import type {DiscordTheme} from './utils/themes'
    import type GatewayEvent from './utils/gateway-dispatch-event'
    import Messages from './components/messages.svelte';
    import MessageProto from './components/message-proto.svelte';
    import Card from './components/card.svelte';
    const token: string = 'MTA2MDg1NzE4Mzc1Mjk0OTc5MA.GJBYrI.qnQmCymskbMGgszi5fzPuryQX1evxUrJ9ZY1CI'
    setContext('token', token)
    setContext('channel', '1038236110335266907')
    let guilds = []
    $: setContext('guilds', guilds)
    const channel: string = getContext('channel')
    let login = false
    let ws = new ClientWebsocket(token)
    let ready = 0
    let messages = []
    function reconnect() {
        ws = new ClientWebsocket(token, ws)
    }
    ws.addEventListener('READY', (e: GatewayEvent) => {
        const data = e.data
        guilds = data.guilds
        fetchDiscord(`/channels/${channel}/messages`)
            .then(data => {
                messages = data.reverse()
                ready++
            })
        console.log(data)
        ready++
    })
    ws.addEventListener('unauthorized', () => {
        login = true
        ready = 2
    })

    export let theme: DiscordTheme
</script>

<main style="height: 100%;">
    <Loading loaded={ready === 2}>
        {#if login}
            <card>
                your mom :Trol:
            </card>
        {:else}
            $: <Messages {theme} {messages}></Messages>
            <MessageProto {theme}></MessageProto>
        {/if}
    </Loading>
</main>

<style>
</style>