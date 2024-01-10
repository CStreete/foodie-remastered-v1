"use server";
import { db } from "@/db";
import { chat, chatMessage } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export const newUserMessage = async (message: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { message: "Not logged in" };
    }

    /*const userChat = await db.query.chat.findFirst({
      where: eq(chat.userId, user.id),
      columns: {
        id: true,
        timestamp: false,
        userId: false,
      },
    });*/

    const data = await db.insert(chatMessage).values({
      id: randomUUID(),
      userId: user.id,
      timestamp: new Date(),
      isUserMessage: true,
      content: message,
    });

    if (!data) {
      return { message: "Error creating message", created: false };
    }

    return { created: true, error: null, data: data };
  } catch (error) {
    console.log(error);
    return { error: `Error ${error}` };
  }
};
