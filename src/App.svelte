<script lang="ts">
    import {GatewayStatus, state} from './utils/state-managment'
    import {fetchDiscord} from './utils/discord-requests'
    import Loading from './components/loading.svelte'
    import ClientWebsocket from './utils/client-websocket'
    import type {DiscordTheme} from './utils/themes'
    import type GatewayEvent from './utils/gateway-dispatch-event'
    import Messages from './components/messages.svelte';
    import MessageProto from './components/message-proto.svelte';
    import Card from './components/card.svelte';

    // give the token to local storage any time it changes
    $: localStorage.setItem('token', state.token)
    state.token = ''
    state.channel = '1038236110335266907'
    let ws = new ClientWebsocket(state.token)
    state.gateway.ws = ws
    let ready = 0
    ws.addEventListener('READY', (e: GatewayEvent) => {
        const data = e.data
        state.guilds = data.guilds
        fetchDiscord(`/channels/${state.channel}/messages`)
            .then(data => {
                state.messages = data.reverse()
                ready++
            })
        console.log(data)
        ready++
    })
    $: {
        if (state.gateway.status === GatewayStatus.Unauthorized) {
            state.login = true
        }
        console.log(state)
    }

    export let theme: DiscordTheme
    /*<Loading />*/
</script>

<main style="height: 100%;">
    
    {#if state.login}
        <Card>
            your mom :Trol:
        </Card>
    {:else}
        <Messages {theme}></Messages>
        <MessageProto {theme}></MessageProto>
    {/if}
</main>

<style>
</style>