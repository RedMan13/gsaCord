<script lang="ts">
    import { state } from '../utils/state-managment'
    import Message from './message.svelte'
    import Loading from './loading.svelte';
    import type {DiscordTheme} from '../utils/themes'
    import type {MessageProto} from '../utils/discord-constants'

    const messages = state.messages
        .map((message: MessageProto, idx: number) => {
            message.collapsed = false
            if (messages[idx - 1]?.author?.id === message.author.id && !message.referenced_message) {
                message.collapsed = true
            }
            return message
        })
    

    export let theme: DiscordTheme
</script>

<div class="message-scrollable">
    <ol class="messages">
        {#each messages as message (message.id)}
            <li>
                <Message {message} {theme} collapsed={message.collapsed}></Message>
            </li>
        {/each}
    </ol>
</div>

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