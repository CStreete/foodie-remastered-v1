"use server";
import { db } from "@/db";
import { users } from "@/db/schema/schema";
import { currentUser } from "@/lib/currentUser";
import { randomUUID } from "crypto";
import { ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const reccomendedUsers = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const reccomendedUsers = await db.query.users.findMany({
      where: ne(users.id, user.id),
    });

    return reccomendedUsers;
  } catch (error) {
    console.log(error);
  }
};
