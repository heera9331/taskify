"use client";

import { socketURL } from "./config";
import { io } from "socket.io-client";
export const socket = io(socketURL);
