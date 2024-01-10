import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferSelectModel, relations } from "drizzle-orm";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
  likes: many(likes),
  comments: many(comment),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const recipes = pgTable("recipe", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  image: text("image"),
  description: text("description").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, { fields: [recipes.userId], references: [users.id] }),
  steps: many(step),
  ingredients: many(ingredient),
  likes: many(likes),
  comments: many(comment),
}));

export const step = pgTable("step", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  recipeId: text("recipeId")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
});

export const stepRelations = relations(step, ({ one }) => ({
  recipe: one(recipes, { fields: [step.recipeId], references: [recipes.id] }),
}));

export const ingredient = pgTable("ingredient", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  recipeId: text("recipeId")
    .notNull()
    .references(() => recipes.id, { onDelete: "cascade" }),
});

export const ingredientRelations = relations(ingredient, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredient.recipeId],
    references: [recipes.id],
  }),
}));

export const likes = pgTable("like", {
  id: text("id").notNull().primaryKey(),
  recipeId: text("recipeId").notNull(),
  userId: text("userId").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  recipe: one(recipes, {
    fields: [likes.recipeId],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

export const comment = pgTable("comment", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  userId: text("userId").notNull(),
  recipeId: text("recipeId").notNull(),
  userImage: text("userImage"),
  userName: text("userName"),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comment.recipeId],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [comment.userId],
    references: [users.id],
  }),
}));

export const follow = pgTable("user_follow", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  followerId: text("followerId").notNull(),
});

export const followRelations = relations(follow, ({ one }) => ({
  user: one(users, {
    fields: [follow.userId],
    references: [users.id],
  }),
  follower: one(users, {
    fields: [follow.followerId],
    references: [users.id],
  }),
}));

export const chat = pgTable("chat", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const chatRelations = relations(chat, ({ one, many }) => ({
  user: one(users, {
    fields: [chat.userId],
    references: [users.id],
  }),
  messages: many(chatMessage),
}));

export const chatMessage = pgTable("chat_message", {
  id: text("id").notNull().primaryKey(),
  content: text("content").notNull(),
  isUserMessage: boolean("isUserMessage").notNull(),
  userId: text("userId").notNull(),
  imageUrl: text("imageUrl"),
  timestamp: timestamp("timestamp", { mode: "date" }).notNull(),
});

export const chatMessageRelations = relations(chatMessage, ({ one }) => ({
  user: one(users, {
    fields: [chatMessage.userId],
    references: [users.id],
  }),
  chat: one(chat, {
    fields: [chatMessage.id],
    references: [chat.id],
  }),
}));

export type Recipe = typeof recipes.$inferSelect;
type Ingredient = typeof ingredient.$inferSelect;
type Step = typeof step.$inferSelect;
export type TUser = typeof users.$inferSelect;
type Like = typeof likes.$inferSelect;

export type TComment = InferSelectModel<typeof comment>;

export type RecipeWithRelations = Recipe & {
  ingredients: Ingredient[];
  steps: Step[];
  author: TUser;
  comments: TComment[];
  likes: Like[];
};

export type TMessage = typeof chatMessage.$inferSelect;

export type CommentWithRelations = Comment & {};
