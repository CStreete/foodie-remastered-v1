"use server";
import { db } from "@/db";
import { currentUser } from "@/lib/currentUser";

export const getAllRecipies = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const recipe = await db.query.users.findMany();

    console.log(JSON.stringify(recipe));

    return null;
  } catch (error) {
    console.log(error);
  }
};
