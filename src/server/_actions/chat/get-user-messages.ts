"use server";
import { db } from "@/db";
import { RecipeWithRelations, TMessage, chatMessage } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { asc, desc, eq } from "drizzle-orm";

export const userMessages = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { data: null, error: "Not logged in" };
    }
    const data = await db.query.chatMessage.findMany({
      where: eq(chatMessage.userId, user.id),
      orderBy: [asc(chatMessage.timestamp)],
      limit: 5,
    });
    if (!data) {
      return { data: null, error: "No recipes found" };
    }

    return { data: data as TMessage[], error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error ${error}` };
  }
};
