const net = require('net');

function startTCPServer(port = 5000) {
    const server = net.createServer((socket) => {
        console.log('Client connected');

        socket.on('data', (data) => {
            console.log('Received from client:', data.toString());
            socket.write('Hello from Electron server!');
        });

        socket.on('end', () => {
            console.log('Client disconnected');
        });

        socket.on('error', (err) => {
            console.error('Socket error:', err.message);
        });
    });

    server.listen(port, () => {
        console.log(`TCP server listening on port ${port}`);
    });
}

module.exports = { startTCPServer };
