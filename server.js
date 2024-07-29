// server.js

import express, { urlencoded, json } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const PORT = 4000;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

const server = http.createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.post("/api", (req, res) => {
  const { name, message } = req.body;
  socketIO.emit("notification", { name, message });
  console.log(name, message);

  res.status(200).json({ name, message });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
