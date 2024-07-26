/* eslint-disable @next/next/no-img-element */
// app/page.js

"use client";
import { socketURL } from "@/lib/config";
import { useEffect, useMemo, useState } from "react";
import socketio from "socket.io-client";

export default function Home() {
  const socket = socketio.connect(`${socketURL}`);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server`);
    });

    socket.on("notification", (data) => {
      console.log(`Notification from server`);
      setNotifications([...notifications, data]);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from server`);
    });
  }, [socket]);

  const [notifications, setNotifications] = useState([]);

  return (
    <main className="grid grid-cols-2 p-24 gap-6">
      {notifications
        ? notifications.map((notification, index) => {
            return (
              <div
                key={index}
                id="toast-message-cta"
                className="w-full max-w-xs p-4 text-gray-500 
                        bg-white rounded-lg shadow dark:bg-gray-800 
                        dark:text-gray-400"
                role="alert"
              >
                {notifications.map((notify, idx) => {
                  return (
                    <>
                      <p>{notify.name}</p>
                      <p>{notify.message}</p>
                    </>
                  );
                })}
              </div>
            );
          })
        : null}
    </main>
  );
}
