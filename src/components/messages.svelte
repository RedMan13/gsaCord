<script lang="ts">
    import { getContext } from 'svelte'
    import Message from './message.svelte'
    import Loading from './loading.svelte';
    import type {DiscordTheme} from '../utils/themes'
    import type {General} from 'discord-types'

    export let messages: Array<General.MessageJSON>
    messages = messages
        // @ts-ignore
        .map((message: General.MessageJSON, idx: number) => {
            message.collapsed = false
            if (messages[idx - 1]?.author?.id === message.author.id && !message.referenced_message) {
                message.collapsed = true
            }
            return message
        })
    

    export let theme: DiscordTheme
</script>

<Loading loaded={messages}>
    <div class="message-scrollable">
        <ol class="messages">
            {#each messages as message (message.id)}
                <li>
                    <Message {message} {theme} collapsed={message.collapsed}></Message>
                </li>
            {/each}
        </ol>
    </div>
</Loading>

<style>
    .message-scrollable {
	    overflow-y: scroll;
        height: 100%;
    }
    .messages {
        display: block;
        list-style-type: none;
    }
</style>