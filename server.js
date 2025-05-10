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
        shell = spawn('script', ['-q', '-c', 'bash --norc', '/dev/null'], {
            env: {
                ...process.env,
                TERM: 'xterm-256color',
                PS1: '[\\u@\\h \\W]\\$ '
            }
        });
    }

    // forward output to client
    shell.stdout.on('data', (data) => {
        ws.send(data.toString());
    });

    shell.stderr.on('data', (data) => {
        ws.send(data.toString());
    });

    // handle client input
    ws.on('message', (data) => {
        if (data === '\x03') { // Ctrl+C
            shell.kill('SIGINT');
        } else if (data === '\x04') { // Ctrl+D
            shell.stdin.end();
        } else if (data === '\x1a') { // Ctrl+Z
            shell.kill('SIGTSTP');
        } else {
            shell.stdin.write(data);
        }
    });

    const cleanup = () => {
        shell.kill();
        console.log('Terminal disconnected');
    };

    shell.on('exit', cleanup);
    ws.on('close', cleanup);
    ws.on('error', cleanup);
});

// start server
const PORT = 45005;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
