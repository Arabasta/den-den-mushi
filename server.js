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

    if (process.platform !== 'linux') {
        console.log('Platform not supported: ' + process.platform);
        ws.close(1003, 'Platform not supported');
        return;
    }

    const shell = spawn(
        'script', // create terminal session
        ['-q', // quiet
            '-c', 'bash', // use bash shell
            '/dev/null']); // discard output


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

    const cleanup = (code, reason) => {
        shell.kill();
        if (ws.readyState === ws.OPEN) {
            ws.close(code, reason);
        }
    };


    ws.on('close', () => cleanup(1000, 'Normal closure'));
    shell.on('exit', () => cleanup(1001, 'Shell terminated'));

});

// start server
const PORT = 45005;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
