"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MoreVertical, CornerDownLeft, Mic, Paperclip } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";

import { useEffect, useState } from "react";
import Members from "./members";
import axios from "axios";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";
import { EmployeeType } from "@/lib/prism-types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import useUser from "@/hooks/useUser";
import useSocket from "@/hooks/useSocket";

export function Page() {
  const [activeUser, setActiveUser] = useState<EmployeeType | null>(null);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const user = useUser();
  const socket = useSocket();

  const sendMessage = () => {
    console.log("sending message > ", {
      senderId: user.id,
      receiverId: activeUserId,
      message,
    });
    if (message && socket && activeUserId && user) {
      console.log("sender > ", user);
      console.log("active > ", activeUser);
      console.log("message > ", message);

      socket.emit(`privateMessage}${activeUserId}`, {
        senderId: user.id,
        receiverId: activeUserId,
        message,
      });

      setMessage(""); // Clear the input after sending the message
    }
  };

  useEffect(() => {
    console.log("socket > ", socket);

    if (socket && user) {
      socket.emit("joinRoom", user.id);

      socket.on("connect", () => {
        console.log(`Connected to server`);
      });

      socket.on("notification", (data: any) => {
        console.log(`Notification from server:`, data);
      });

      
      socket.on("privateMessage", (data: any) => {
        console.log(`Private message from server:`, data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected from server`);
      });

      return () => {
        socket.off("privateMessage");
        socket.disconnect();
      };
    }
  }, [socket, user]);

  useEffect(() => {
    if (activeUserId) {
      (async () => {
        try {
          let userRes = await axios.get(`/api/employees/${activeUserId}`);
          let tmpUser = userRes.data.employee;
          console.log("user is > ", tmpUser);
          setActiveUser(tmpUser);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      })();
    }
  }, [activeUserId]);

  if (!socket) {
    return <p>socket problem</p>;
  }

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
                    className="flex h-9 border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background"
                    placeholder="Search..."
                  />
                </form>
                <Members onClick={setActiveUserId} />
              </div>
            </CardContent>
          </Card>
        </div>
        {activeUser && (
          <main className="w-4/5">
            <Card className="h-full">
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center pb-2">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarIcon className="h-5 w-5" />
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">{`${activeUser.firstName} ${activeUser.lastName}`}</p>
                      <p className="text-sm text-muted-foreground">
                        last active
                      </p>
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="relative flex h-full min-h-[75vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                  <div className="flex-1">
                    <ul>
                      {messages.map((msg, index) => (
                        <li key={index}>
                          From {msg.senderId}: {msg.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                    x-chunk="dashboard-03-chunk-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                  >
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                    <div className="flex items-center p-3 pt-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Paperclip className="size-4" />
                              <span className="sr-only">Attach file</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Attach File
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Mic className="size-4" />
                              <span className="sr-only">Use Microphone</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Use Microphone
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        type="submit"
                        size="sm"
                        className="ml-auto gap-1.5"
                      >
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </main>
        )}
      </div>
    </div>
  );
}

export default Page;
