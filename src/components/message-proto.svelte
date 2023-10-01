<script lang="ts">
    import { getContext } from 'svelte'
    import {fetchDiscord} from '../utils/discord-requests'
    import type {General} from 'discord-types'
    import {type DiscordTheme, themeString} from '../utils/themes'

    export let theme: DiscordTheme
    const token: string = getContext('token')
    const channel: string = getContext('channel')
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