import express, { urlencoded, json } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import axios from "axios";

const app = express();
const PORT = 4000;

// CORS options for Express
app.use(
  cors({
    origin: "*", // Update this to your client origin if needed
    methods: ["GET", "POST"],
  })
);

app.use(urlencoded({ extended: true }));
app.use(json());

const server = http.createServer(app);

// CORS options for Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to your client origin if needed
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on(`privateMessage${senderId}`, async ({ senderId, receiverId, message }) => {
    console.log("sender", senderId);
    console.log("receiver", receiverId);
    console.log("message", message);

    try {
      console.log("message sent");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.post("/api", (req, res) => {
  res.json({ message: "working" });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
