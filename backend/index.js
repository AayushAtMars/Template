import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import queueRoutes from "./routes/queueRoutes.js";
import { initSocket } from "./socket/socketHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// REST API routes
app.use("/", queueRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Make io accessible in routes/controllers
app.set("io", io);

// Initialize socket events
initSocket(io);

// Start server
const PORT = 3000;

server.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});