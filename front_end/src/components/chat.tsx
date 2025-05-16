"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "../lib/auth-client";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { getMessages, sendMessage } from "@/server/queries";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { db } from "../server/db/";
import { LlmMessageCard, UserMessageCard } from "./message_cards";

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
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ChatCore />
    </QueryClientProvider>
  );
};

const ChatCore = () => {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = async () => {
    if (newMessage) {
      const msg = await sendMessage(
        newMessage,
        parseInt(session?.user?.id as string),
      );
      setMessages([
        ...messages!,
        msg as {
          id: number;
          createdAt: Date;
          updatedAt: Date | null;
          text: string | null;
          user_id: number;
          user_msg: boolean;
        },
      ]);
      setNewMessage("");
    }
  };
  const [messages, setMessages] = useState<
    {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      text: string | null;
      user_id: number;
      user_msg: boolean;
    }[]
  >();
  const { data, isSuccess: isMessagesSuccess } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(),
  });
  useEffect(() => {
    console.log("isMessagesSuccess", isMessagesSuccess);
    if (isMessagesSuccess) {
      setMessages(data);
      console.log("messages", data);
    }
  }, [isMessagesSuccess, data]);

  return (
    <div className="h-full max-h-full overflow-hidden">
      {session && (
    <div className="flex flex-col items-center overflow-hidden  justify-center md:w-[40vw] mx-auto">
     <ScrollArea className="w-full h-full pb-10 max-h-[85vh] overflow-scroll bg-black mx-auto ">
      <div className="h-full w-full grid bg-black mx-auto gap-y-5">
       {messages?.map((message) => (
        <>
         {message.user_msg ? (
          <UserMessageCard message={message.text!} />
                  ) : (
                    <LlmMessageCard message={message.text!} />
                  )}
                </>
              ))}
            </div>
          </ScrollArea>
          <div className="flex items-center justify-center w-full pb-10">
            <PlaceholdersAndVanishInput
              placeholders={[
                "What was the recent assignment?",
                "Help me with this worksheet",
              ]}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
