<script lang="ts">
    import {getAvatarCDN} from '../utils/discord-urls'
    import type {General} from 'discord-types'
    import {type DiscordTheme, themeString} from '../utils/themes'
    export let message: General.MessageJSON
    export let theme: DiscordTheme
    export let collapsed: boolean = false

    const userId = message.author.id
    // @ts-ignore display_name exists, the module is just a lil outdated
    const name = message.author.global_name
    const pfpHash = message.author.avatar
    const pfp = getAvatarCDN(userId, pfpHash)
    const content = message.content
    const timestamp = new Date(message.timestamp).toLocaleString()
    let reply = null
    if (message.referenced_message) {
        reply = message.referenced_message
        reply.pfp = getAvatarCDN(reply.author.id, reply.author.avatar)
        reply.name = reply.author.global_name
    }
</script>

<div class="msg-container" style={themeString(theme)}>
    {#if collapsed}
        <div class="msg-content">
            <!--<Markdown {content} {theme} {context} />-->
            {content}
        </div>
    {:else}
        {#if reply}
            <div class="reply-container" style={themeString(theme)}>
                <img
                    class="msg-reply-avatar"
                    src={reply.pfp || "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt="user"
                />
                <div class="msg-header">
                    <span class="msg-username" style:color={/*author.color || */"inherit"}>{reply.name}</span>
                    <div class="msg-reply-content" style:color={theme.textMuted}>
                        <!--<Markdown {content} {theme} {context} />-->
                        {reply.content}
                    </div>
                </div>
            </div>
        {/if}
        <img
            class="msg-avatar"
            src={pfp || "https://cdn.discordapp.com/embed/avatars/0.png"}
            alt="user"
        />
        <div class="msg-header">
            <span class="msg-username" style:color={/*author.color || */"inherit"}>{name}</span>
            <span class="msg-timestamp" style:color={theme.textMuted}>
                {timestamp}
            </span>
        </div>
        <div class="msg-content">
            <!--<Markdown {content} {theme} {context} />-->
            {content}
        </div>
    {/if}
</div>

<style lang="css">
    .msg-container {
        background: var(--background);
        color: var(--text);
        word-wrap: break-word;
        position: relative;
        padding-left: 72px;
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
        /* Load a font called gg sans to use it. */
        font-family: "gg sans", "Roboto", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .msg-avatar {
        position: absolute;
        left: 16px;
        margin-top: calc(4px - 0.125rem);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        flex: 0 0 auto;
        pointer-events: none;
        z-index: 1;
    }
    .msg-header {
        overflow: hidden;
        display: block;
        position: relative;
        line-height: 1.375rem;
        min-height: 1.375rem;
        white-space: break-spaces;
    }
    .msg-username {
        margin-right: 0.25rem;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.375rem;
        display: inline;
        vertical-align: baseline;
        position: relative;
        overflow: hidden;
    }
    .msg-timestamp {
        font-size: 0.75rem;
        line-height: 1.375rem;
        color: var(--text-muted);
        vertical-align: baseline;
        display: inline-block;
        height: 1.25rem;
        cursor: default;
        pointer-events: none;
        font-weight: 500;
    }

    .msg-content {
        user-select: text;
        margin-left: -72px;
        padding-left: 72px;
        font-size: 1rem;
        line-height: 1.375rem;
        white-space: pre-wrap;
        white-space: break-spaces;
        word-wrap: break-word;
        user-select: text;
        overflow: hidden;
    }

    /* --- reply content --- */

    .reply-container {
        background: var(--background);
        color: var(--text);
        word-wrap: break-word;
        position: relative;
        padding-left: 18px;
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
        /* Load a font called gg sans to use it. */
        font-family: "gg sans", "Roboto", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .reply-container::before {
        --spine-width: 2px;
        content: "";
        display: block;
        position: absolute;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        top: 50%;
        right: 100%;
        bottom: 0;
        left: calc(var(--avatar-size)/2*-1 + var(--gutter)*-1);
        margin-right: var(--reply-spacing);
        margin-top: calc(var(--spine-width)*-1/2);
        margin-left: calc(var(--spine-width)*-1/2);
        margin-bottom: calc(.125rem - 4px);
        border-left: var(--spine-width) solid var(--interactive-muted);
        border-bottom: 0 solid var(--interactive-muted);
        border-right: 0 solid var(--interactive-muted);
        border-top: var(--spine-width) solid var(--interactive-muted);
        border-top-left-radius: 6px;
    }
    .msg-reply-avatar {
        position: absolute;
        left: 0px;
        margin-top: calc(4px - 0.125rem);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        flex: 0 0 auto;
        pointer-events: none;
        z-index: 1;
    }

    .msg-reply-content {
        user-select: text;
        margin-left: -18px;
        padding-left: 18px;
        font-size: 1rem;
        line-height: 1.375rem;
        user-select: text;
        overflow: hidden;
        display: inline;
    }
</style>