import {term} from './terminal.js';
import socketManager from './websocket.js';

let currentInput = '';

export function registerHandlers() {
    term.onData((data) => {
        const socket = socketManager.getSocket();
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            return;
        }

        socket.send(data);
    });

    // term.attachCustomKeyEventHandler((e) => {
    //     const socket = socketManager.getSocket();
    //     if (!socket || socket.readyState !== WebSocket.OPEN) return false;
    //
    //     if (e.ctrlKey) {
    //         const key = e.key.toLowerCase();
    //         if (key === 'c') {
    //             socket.send('\x03'); // SIGINT
    //             return false;
    //         }
    //         if (key === 'd') {
    //             socket.send('\x04'); // EOF
    //             return false;
    //         }
    //         if (key === 'z') {
    //             socket.send('\x1a'); // SIGTSTP
    //             return false;
    //         }
    //     }
    //     return true;
    // });
}
