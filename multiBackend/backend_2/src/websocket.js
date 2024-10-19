import { WebSocketServer } from 'ws';
import userList from './utils/userList.js';

export function initializeWebSocketServer(port) {
    const wss = new WebSocketServer({ port });

    wss.on('connection', (ws) => {
        console.log("Backend 2 WebSocket connected");

        ws.on('message', (message) => {
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);

            if (parsedMessage.type === 'sum') {
                const { a, b } = parsedMessage.data;
                const result = a + b;
                ws.send(JSON.stringify({ result }));
            } else if (parsedMessage.type === 'userData') {
                const { id } = parsedMessage.data;
                const user = userList.find((e) => e.id === id);

                if (user) {
                    ws.send(JSON.stringify({ ...user, message: "User fetched Successfully!" }));
                } else {
                    ws.send(JSON.stringify({ message: "User not found" }));
                }
            } else {
                ws.send(JSON.stringify({ message: "Hello from WebSocket!" }));
            }
        });

        ws.on('close', () => {
            console.log("WebSocket connection closed");
        });
    });

    console.log(`WebSocket Server 2 running on port ${port}`);
}
