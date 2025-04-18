import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 }, () => {
  console.log("WebSocket server is running on ws://localhost:8000");
});

wss.on('connection', (ws) => {
  console.log("New client connected");

  ws.on('message', (message) => {
    console.log("Received:", message);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log("Client disconnected");
  });
});

