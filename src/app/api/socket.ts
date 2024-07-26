// Import necessary modules
import { Server as HTTPServer, IncomingMessage, ServerResponse } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

// Configure port and CORS options
const PORT = 3000;
const corsOptions = {
  origin: "*", // Adjust for your specific needs!
};

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  if (res?.socket?.server?.io) {
    console.log("Socket.IO server already running");
    res.end();
    return;
  }

  const httpServer = new HTTPServer((req, res) => {
    res.setHeader("Allow", ["GET, POST, OPTIONS, PUT, DELETE"]);
    res.writeHead(404);
    res.end();
  });

  const io = new SocketIOServer(httpServer, {
    path: "/api/socket",
    cors: corsOptions,
  });

  httpServer.listen(PORT, () => console.log(`Socket.IO server listening on port ${PORT}`));

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    // Sample event handler for sending messages to clients
    socket.on("send-message", (data) => {
      console.log("Received message from client:", data);
      io.emit("message", data); // Broadcast to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  res.end();
}

