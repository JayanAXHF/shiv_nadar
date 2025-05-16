"use server";
import { db } from "./db";
import { messages } from "./db/schema";

export async function sendMessage(message: string, user_id: number) {
  const toSend = {
    text: message,
    user_id: user_id,
    user_msg: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
 const msg =  await db.insert(messages).values(toSend).returning();
  return msg[0];
}

export async function sendLlmMessage(message: string, user_id: number) {
  await db.insert(messages).values({
    text: message,
    user_id: user_id,
    user_msg: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function getMessages() {
  const messages = await db.query.messages.findMany();
  return messages;
}
