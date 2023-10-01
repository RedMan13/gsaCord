import App from './App.svelte';
import { DiscordDarkTheme } from './utils/themes';

document.body.style.backgroundColor = DiscordDarkTheme.background;

const app = new App({
    target: document.body,
    props: {
        // default theme
        theme: DiscordDarkTheme
    }
});

export default app;