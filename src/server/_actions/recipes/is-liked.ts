import { db } from "@/db";
import { likes } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { and, eq } from "drizzle-orm";

export const isRecipeLiked = async (recipeId: string, userId: string) => {
  try {
    const isLiked = await db.query.likes
      .findFirst({
        where: and(eq(likes.recipeId, recipeId), eq(likes.userId, userId)),
      })
      .execute();
    return { isLiked };
  } catch (error) {
    console.log(error);
  }
};
