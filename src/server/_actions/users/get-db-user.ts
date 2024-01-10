"use server";
import { db } from "@/db";
import { TUser, users } from "@/db/schema/schema";

import { eq } from "drizzle-orm";

export const userById = async (userId: string) => {
  try {
    const data = await db.query.users.findFirst({
      where: eq(users.id, userId),
      // include re
    });
    if (!data) {
      return { data: null, error: "No user found" };
    }
    return { data: data as TUser, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: `Error ${error}` };
  }
};
