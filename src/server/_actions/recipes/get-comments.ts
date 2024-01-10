"use server";
import { db } from "@/db";
import { comment } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { eq } from "drizzle-orm";

export const getComments = async (recipeId: string) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const comments = await db.query.comment.findMany({
      where: eq(comment.recipeId, recipeId),
    });

    console.log(JSON.stringify(comments));

    return { comments };
  } catch (error) {
    console.log(error);
  }
};
