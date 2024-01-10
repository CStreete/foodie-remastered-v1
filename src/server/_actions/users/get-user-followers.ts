"use server";
import { db } from "@/db";
import { RecipeWithRelations, follow, users } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { eq } from "drizzle-orm";

export const userFollowers = async (userId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Not logged in" };
    }
    const data = await db.query.follow.findMany({
      where: eq(follow.userId, userId),
    });

    const data2 = await db.query.follow.findMany({
      where: eq(follow.followerId, userId),
    });

    if (!data) {
      return { error: "No user found" };
    }
    return { following: data, followers: data2, error: null };
  } catch (error) {
    console.log(error);
    return { error: `Error ${error}` };
  }
};
