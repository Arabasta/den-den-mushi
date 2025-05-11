import {term} from "./terminal.js";
import {config} from './config.js';

let socket;
let reconnectAttempts = 0;

export function connectWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        return;
    }

    socket = new WebSocket(`ws://${window.location.hostname}:${config.port}`);

    socket.onmessage = (event) => {
        console.log('Received from server:', event.data);
        term.write(event.data);
    };

    socket.onopen = () => {
        reconnectAttempts = 0;
        term.write('\r\n\x1b[32mConnected to terminal session\x1b[0m\r\n');
        term.focus();
    };

    socket.onerror = (error) => {
        term.write(`\r\n\x1b[31mConnection error: ${error.message}\x1b[0m\r\n`);
    };

    socket.onclose = ({code, reason}) => {
        if (code === 1003) { // Unsupported platform
            term.write(`\r\x1b[31m${reason}\x1b[0m\r\n`);
            return;
        }

        if (reconnectAttempts < config.maxReconnectAttempts) {
            reconnectAttempts++;
            term.write(`\r\x1b[33mReconnecting (${reconnectAttempts}/${config.maxReconnectAttempts})...\x1b[0m\r\n`);
            setTimeout(() => this.connect(), this.delay);
        } else {
            term.write('\r\n\x1b[31mMax reconnection attempts reached\x1b[0m\r\n');
        }
    };

    this.socket.onerror = (error) => {
        term.write(`\r\n\x1b[31mError: ${error.message}\x1b[0m\r\n`);
    };
}

export function getSocket() {
    return socket;
}
