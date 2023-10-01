<script lang="ts">
    import {state} from '../utils/state-managment'
    import {fetchDiscord} from '../utils/discord-requests'
    import type {General} from 'discord-types'
    import {type DiscordTheme, themeString} from '../utils/themes'

    export let theme: DiscordTheme
    const channel: string = state.channel
    const sendProto = () => {
        fetchDiscord(`/channels/${channel}/messages`, 'POST', {
            content: 'test'
        })
    }
</script>

<div class="msg-container" style={themeString(theme)}>
    <button on:click={sendProto}/>
</div>

<style lang="css">
</style>