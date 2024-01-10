CREATE TABLE IF NOT EXISTS "chat" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"userId" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_message" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"isUserMessage" boolean NOT NULL,
	"userId" text NOT NULL,
	"timestamp" timestamp NOT NULL
);
