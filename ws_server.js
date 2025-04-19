// ws_server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5005 });

wss.on('connection', (ws) => {
    console.log(' WebSocket Client Connected');

    ws.on('message', (message) => {
        console.log(`📨 Received: ${message}`);
        ws.send(' Message received by WebSocket server!');
    });

    ws.on('close', () => {
        console.log(' Client Disconnected');
    });
});

console.log(' WebSocket server running on ws://localhost:5005');
