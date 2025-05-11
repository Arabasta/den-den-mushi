import {term, fitAddon} from './terminal.js';
import {connectWebSocket} from './websocket.js';
import {registerHandlers} from './handlers.js';
import showAsciiArt from "./welcome.js";

term.open(document.getElementById('terminal'));
fitAddon.fit();

showAsciiArt(term);
connectWebSocket();
registerHandlers();

// handle window resize
window.addEventListener('resize', () => fitAddon.fit());