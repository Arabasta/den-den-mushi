import {term, fitAddon} from './terminal.js';
import socketManager from './websocket.js';
import {registerHandlers} from './handlers.js';
import showAsciiArt from "./welcome.js";

term.open(document.getElementById('terminal'));
fitAddon.fit();

showAsciiArt(term);
socketManager.connect();
registerHandlers();

// handle window resize
window.addEventListener('resize', () => fitAddon.fit());