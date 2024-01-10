"use server";
import { db } from "@/db";
import { ingredient, recipes, step } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";

import { randomUUID } from "crypto";

import { eq } from "drizzle-orm";

export const uploadRecipe = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    console.log(formData);
    const ingredients = formData.getAll("ingredients");
    const steps = formData.getAll("instructions");
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    const new_recipe = await db
      .insert(recipes)
      .values({
        id: randomUUID(),
        title: title,
        description: description,
        userId: user.id,
        image: image,
      })
      .returning({ insertedID: recipes.id });

    for (const user_ingredient of ingredients) {
      await db.insert(ingredient).values({
        id: randomUUID(),
        content: user_ingredient as string,
        recipeId: new_recipe[0].insertedID,
      });
    }

    for (const user_step of steps) {
      await db.insert(step).values({
        id: randomUUID(),
        content: user_step as string,
        recipeId: new_recipe[0].insertedID,
      });
    }

    return { success: true };
  } catch (error) {
    console.log(error);
  }
};
