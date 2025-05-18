"use server";
import { db } from "./db";
import { messages } from "./db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function sendMessage(message: string, user_id: number) {
  const toSend = {
    text: message,
    user_id: user_id,
    user_msg: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const msg = await db.insert(messages).values(toSend).returning();
  return msg[0];
}

export async function sendLlmMessage(message: string, user_id: number) {
  const msg = await db
    .insert(messages)
    .values({
      text: message,
      user_id: user_id,
      user_msg: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return msg[0];
}

export async function getMessages() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (session) {
    const uid = parseInt(session.user.id);
    const messages = await db.query.messages.findMany({
      where: (model, { eq }) => eq(model.user_id, uid),
      orderBy: (model, { asc }) => asc(model.id),
    });
    return messages;
  }
}
