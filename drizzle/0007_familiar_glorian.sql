CREATE TABLE IF NOT EXISTS "comment" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"userId" text NOT NULL,
	"recipeId" text NOT NULL,
	"userImage" text,
	"timestamp" timestamp NOT NULL
);


