"use server";

import { db } from "@/db";
import { likes } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const likeRecipe = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const recipeId = formData.get("recipeId") as string;

    const isLiked = await db.query.likes
      .findFirst({
        where: and(eq(likes.recipeId, recipeId), eq(likes.userId, user.id)),
      })
      .execute();

    const isRecipeLiked = !!isLiked;

    if (isRecipeLiked) {
      await db.delete(likes).where(eq(likes.recipeId, recipeId)).execute();
      revalidatePath(`/home`);
      return { success: true, recipe: null };
    } else {
      const recipe = await db.insert(likes).values({
        id: randomUUID(),
        recipeId: recipeId,
        userId: user.id,
        timestamp: new Date(),
      });
      revalidatePath(`/home`);

      return { success: true };
    }
  } catch (error) {
    console.log(error);
  }
};
