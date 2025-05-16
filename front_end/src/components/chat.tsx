"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "../lib/auth-client";

interface propTypes {
  messages: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    text: string | null;
    user_id: number;
    user_msg: boolean;
  }[];
}

const Chat = ({ messages }: propTypes) => {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  return (
    <div>
      {session && (
        <ScrollArea className="h-dvh md:w-[60vw] flex bg-black pt-10 mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="justify-end w-full text-center">
              {message.text}
            </div>
          ))}
          <Button className="">Send</Button>
        </ScrollArea>
      )}
    </div>
  );
};

export default Chat;
