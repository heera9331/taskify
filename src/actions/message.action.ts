"use server";

import { pusherServer } from "@/lib/pusher";

const sendMessage = (message: string) => {
  try {
    // store message inside our db
    pusherServer.trigger("public", "upcoming-message", { message });
  } catch (error: any) {
    console.log("Action Error while sending message >", error);
    throw new Error(error.message);
  }
};

export default sendMessage;
