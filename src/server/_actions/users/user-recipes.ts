"use server";
import { db } from "@/db";
import { RecipeWithRelations, recipes } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { eq } from "drizzle-orm";

export const forYouRecipes = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const data = await db.query.recipes.findMany({
      with: {
        steps: true,
        ingredients: true,
        author: true,
        likes: true,
        comments: true,
      },
      where: eq(recipes.userId, user.id),
    });

    if (!data) {
      return { data: null, error: "No recipes found" };
    }
    return { data: data as RecipeWithRelations[], error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error ${error}` };
  }
};
