import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "../server/db/";
import { authClient } from "../lib/auth-client";
import Navbar from "../components/navbar";
import Chat from "../components/chat";

export default async function HomePage() {
  const messages = await db.query.messages.findMany();


  return (
    <div className="w-full flex flex-col justify-center">
      <Navbar />
			<Chat messages={messages} />

    </div>
  );
}
