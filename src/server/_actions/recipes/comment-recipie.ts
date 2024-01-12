"use server";
import { db } from "@/db";
import { comment } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export const newComment = async (recipeId: string, content: string) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const comments = await db.insert(comment).values({
      id: randomUUID(),
      recipeId: recipeId,
      userId: user.id,
      timestamp: new Date(),
      content: content,
      userImage: user.image,
      userName: user.name,
    });

    console.log(JSON.stringify(comments));

    revalidatePath("/home");

    return { comments };
  } catch (error) {
    console.log(error);
  }
};
