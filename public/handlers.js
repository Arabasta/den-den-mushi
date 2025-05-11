import {term} from './terminal.js';
import {getSocket} from './websocket.js';

let currentInput = '';

export function registerHandlers() {

    const socket = getSocket();

    term.onData((data) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) return;

        // backspace
        if (data === '\x7f') {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                term.write('\b \b');
            }
            return;
        }

        // Enter key
        if (data === '\r') {
            socket.send(currentInput + '\n');
            currentInput = '';
            term.write('\r\n');
            return;
        }

        // handle regular input
        currentInput += data;
        term.write(data);
    });

    term.attachCustomKeyEventHandler((e) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) return false;

        // Ctrl+C = SIGINT only when there's no selection
        if (e.ctrlKey && e.key === 'c' && !term.hasSelection()) {
            socket.send('\x03'); // SIGINT
            return false;
        }

        // Ctrl+D
        if (e.ctrlKey && e.key === 'd') {
            socket.send('\x04'); // EOF
            return false;
        }

        // Ctrl+Z
        if (e.ctrlKey && e.key === 'z') {
            socket.send('\x1a'); // SIGTSTP
            return false;
        }

        return true;
    });
}