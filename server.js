const express = require('express');
const {createServer} = require('http');
const {WebSocketServer} = require('ws');
const {spawn} = require('child_process');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({server});

app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('New terminal connection');

    let shell;

    // start shell process
    if (process.platform === 'win32') {
        shell = spawn('cmd.exe');
    } else {
        // wrap bash in pseudo-terminal
        shell = spawn('script', ['-q', '-c', 'bash', '/dev/null']);
    }

    // forward output to client
    shell.stdout.on('data', (data) => {
        ws.send(data.toString());
    });

    shell.stderr.on('data', (data) => {
        ws.send(data.toString());
    });

    // forward client input to the shell
    ws.on('message', (data) => {
        shell.stdin.write(data);
    });

    // cleanup on disconnect
    ws.on('close', () => {
        shell.kill();
        console.log('Terminal disconnected');
    });
});

// start server
const PORT = 45005;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
