ALTER TABLE "recipe" DROP CONSTRAINT "recipe_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "userId" DROP NOT NULL;