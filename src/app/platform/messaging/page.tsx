"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import Members from "./members";
import ChatArea from "./chat-area";
import { socketURL } from "@/lib/config";
import { socket } from "@/lib/socket";
import axios from "axios";

export function Page() {
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const socketio = socket.connect();

  const fetchChat = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);
  };

  useEffect(() => {
    socketio.on("connect", () => {
      console.log(`Connected to server`);
    });

    socketio.on("notification", (data) => {
      console.log(`Notification from server`);
    });

    socketio.on("disconnect", () => {
      console.log(`Disconnected from server`);
    });

    return () => {
      socket.off("message");
    };
    
  }, [socketio]);

  return (
    <div className="min-h-screen w-full bg-muted/40 overflow-hidden">
      <div className="flex p-2 gap-2">
        <div className="w-1/5">
          <Card className="min-h-[88vh]">
            <CardHeader>Search</CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <form action="" method="get">
                  <input
                    type="search"
                    className="flex h-9 border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background "
                    placeholder="Search..."
                  />
                </form>
                <Members onClick={setActiveChat} />
              </div>
            </CardContent>
          </Card>
        </div>
        <main className="w-4/5 ">
          <Card className="h-full">
            <CardHeader>Chat context</CardHeader>
            <CardContent>
              <ChatArea />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
export default Page;
