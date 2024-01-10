CREATE TABLE IF NOT EXISTS "step" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"recipeId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "step" ADD CONSTRAINT "step_recipeId_recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
