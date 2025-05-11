import {Terminal} from "https://esm.sh/xterm";
import {FitAddon} from "https://esm.sh/xterm-addon-fit";

const term = new Terminal({
    cursorBlink: true,
    theme: {
        background: '#282a36', // dracula
        foreground: '#f8f8f2',
        cursor: '#FFFFFF',
        selection: '#FFFFFF',
    },
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

export {term, fitAddon};
