CREATE TABLE IF NOT EXISTS "recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"description" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe" ADD CONSTRAINT "recipe_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
