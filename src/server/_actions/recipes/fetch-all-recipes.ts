"use server";
import { db } from "@/db";
import { RecipeWithRelations } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";

export const forYouRecipes = async () => {
  try {
    const data = await db.query.recipes.findMany({
      with: {
        steps: true,
        ingredients: true,
        author: true,
        likes: true,
        comments: true,
      },
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
