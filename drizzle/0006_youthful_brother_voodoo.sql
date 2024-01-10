CREATE TABLE IF NOT EXISTS "like" (
	"id" text PRIMARY KEY NOT NULL,
	"recipeId" text NOT NULL,
	"userId" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
