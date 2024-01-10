"use server";
import { db } from "@/db";
import { RecipeWithRelations, chat, follow, users } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export const newChat = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { message: "Not logged in" };
    }

    const isChatCreated = await db.query.chat.findFirst({
      where: eq(chat.userId, user.id),
    });

    if (isChatCreated) {
      return { message: "Chat already created" };
    }

    const data = await db
      .insert(chat)
      .values({
        id: randomUUID(),
        userId: user.id,
        timestamp: new Date(),
      })
      .returning({ chatID: chat.id });

    if (!data) {
      return { message: "Error creating chat" };
    }

    const chatID = data[0].chatID;

    return { created: true, error: null, data: chatID };
  } catch (error) {
    console.log(error);
    return { error: `Error ${error}` };
  }
};
