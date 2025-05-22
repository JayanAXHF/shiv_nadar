"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { authClient } from "../lib/auth-client";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { getMessages, sendLlmMessage, sendMessage } from "@/server/queries";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { db } from "../server/db/";
import { LlmMessageCard, UserMessageCard } from "./message_cards";
import Controls, {
  max_length_atom,
  check_circulars_atom,
  temperate_atom,
} from "./controls";
import { atom, getDefaultStore, useAtom } from "jotai";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { isError } from "util";
import { Switch } from "@radix-ui/react-switch";

interface propTypes {
  messages: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    text: string | null;
    user_id: string;
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
  const defaultStore = getDefaultStore();

  const [fetchingResponse, setFetchingResponse] = useState(false);
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (newMessage && !fetchingResponse) {
        setFetchingResponse(true);

        const res = await fetch(
          `http://127.0.0.1:8000/generate/${defaultStore.get(check_circulars_atom) ? "circular" : "ncert"}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: newMessage,
              max_length: defaultStore.get(max_length_atom),
              temperature: defaultStore.get(temperate_atom),
            }),
          },
        ).catch((err) => {
          toast.error(err.message);
          setFetchingResponse(false);
          return;
        });
        if (!res) {
          setFetchingResponse(false);
          return;
        }

        const msg = await sendMessage(newMessage, session?.user?.id as string);
        const push_queue = [];
        push_queue.push(
          msg as {
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            text: string | null;
            user_id: string;
            user_msg: boolean;
          },
        );

        setNewMessage("");
        const data: string = await res.json();
        console.log(data);
        const chatbot_response = data.response;
        console.log(chatbot_response);
        console.log(session?.user?.id);
        const to_push = await sendLlmMessage(
          chatbot_response as string,
          session?.user?.id!,
        ).catch((err) => {
          toast.error(err.message);
          setFetchingResponse(false);
        });
        console.log(data);
        push_queue.push(
          to_push as {
            id: number;
            createdAt: Date;
            updatedAt: Date | null;
            text: string | null;
            user_id: string;
            user_msg: boolean;
          },
        );
        if (to_push && push_queue[0]) {
        }
        setMessages([...messages!, ...push_queue]);
      }
      setFetchingResponse(false);
    } catch (error) {
      toast.error(error.message as string);
    }
    setFetchingResponse(false);
  };
  const [messages, setMessages] = useState<
    {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      text: string | null;
      user_id: string;
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
        <div className="flex flex-col h-full items-center overflow-hidden  justify-center md:w-[40vw] mx-auto">
          <Controls />
          <ScrollArea className="w-full h-full pb-14 max-h-[80vh] overflow-scroll bg-black mx-auto ">
            <div className="h-full w-full grid justify-center sm:justify-normal bg-black mx-auto gap-y-5">
              {messages?.map((message) => (
                <div key={message.id}>
                  {message.user_msg ? (
                    <UserMessageCard
                      message={message.text!}
                      timestamp={message.createdAt}
                    />
                  ) : (
                    <LlmMessageCard
                      message={message.text!}
                      timestamp={message.createdAt}
                    />
                  )}
                </div>
              ))}
              {fetchingResponse && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn("animate-spin")}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
            </div>
          </ScrollArea>
          <div className="flex items-center justify-center w-full md:pb-10 pb-5 absolute bottom-0">
            <PlaceholdersAndVanishInput
              placeholders={[
                "What was the recent assignment?",
                "Help me with this worksheet",
              ]}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              onSubmit={handleSubmit}
              disabled={fetchingResponse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
