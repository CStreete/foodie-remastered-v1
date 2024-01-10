CREATE TABLE IF NOT EXISTS "ingredient" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"recipeId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_recipeId_recipe_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
