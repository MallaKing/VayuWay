import express from "express";
import cors from "cors";
import Router from "./route.js";
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/corridors", Router);
import path from "path";
import { fileURLToPath } from "url";

// Required to get __dirname with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Optional: Serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log("Client connected");

  ws.on('message', message => {
    const data = JSON.parse(message);
    console.log("Received GPS:", data);
    // You can save to DB or forward to other clients
  });

  ws.on('close', () => {
    console.log("Client disconnected");
  });
});
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;


