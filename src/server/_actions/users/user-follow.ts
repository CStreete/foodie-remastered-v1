"use server";
import { db } from "@/db";
import { follow } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const userFollow = async (
  followUserId: string,
  isFollowing: boolean | undefined
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "No user found" };
    }

    if (isFollowing) {
      const data = await db
        .delete(follow)
        .where(eq(follow.followerId, followUserId))
        .execute();
      if (data) {
        revalidatePath(`/${followUserId}`);
        return { success: true, error: null };
      }
    } else {
      const data = await db.insert(follow).values({
        id: randomUUID(),
        userId: user.id,
        followerId: followUserId,
      });
      if (data) {
        revalidatePath(`/${followUserId}`);
        return { success: true, error: null };
      }
    }
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error ${error}` };
  }
};
