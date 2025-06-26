// ws_server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5005 });

const responses = [
    "Hello! How can I help you today?",
    "I'm here to assist you!",
    "Did you know? You can ask me anything!",
    "Processing your request...",
    "That's interesting! Tell me more.",
    "I'm just a bot, but I love to chat!",
    "Let me check that for you.",
    "Can you please clarify your question?",
    "Here's a random fact: The Eiffel Tower can be 15 cm taller during hot days!",
    "I'm always learning new things!"
];

wss.on('connection', (ws) => {
    console.log(' WebSocket Client Connected');

    ws.on('message', (message) => {
        console.log(`📨 Received: ${message}`);
        // Pick a random response
        const randomIndex = Math.floor(Math.random() * responses.length);
        const randomResponse = responses[randomIndex];
        ws.send(randomResponse);
    });

    ws.on('close', () => {
        console.log(' Client Disconnected');
    });
});

console.log(' WebSocket server running on ws://localhost:5005');
