import React from "react";

import { db } from "../server/db/";
import Navbar from "../components/navbar";
import Chat from "../components/chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default async function HomePage() {
  const messages = await db.query.messages.findMany();

  return (
    <div className="w-full flex flex-col justify-center h-dvh">
      <Navbar />
      <Chat messages={messages} />
    </div>
  );
}
