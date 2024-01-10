import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialPromtMessages } from "./initialPromtMessages";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/db";
import { TMessage, chatMessage } from "@/db/schema/schema";
import { v4 as uuidv4 } from "uuid";
export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const user = await currentUser();
  if (!user) {
    return new Response("Not logged in", { status: 403 });
  }
  uuidv4();

  const { content }: { content: TMessage[] } = await request.json();

  const outBoundMessage = content.map((m) => {
    return {
      role: m.isUserMessage
        ? ChatCompletionRequestMessageRoleEnum.User
        : ChatCompletionRequestMessageRoleEnum.System,
      content: m.content,
    };
  });

  outBoundMessage.unshift({
    role: ChatCompletionRequestMessageRoleEnum.System,
    content:
      "Du är en specialiserad AI tränad uteslutande för att tillhandahålla information om recept och analysera bilder av mat. Ditt primära fokus är att svara med relevanta detaljer om ingredienser, tillagningsmetoder och frågor relaterade till recept",
  });

  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: outBoundMessage,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (result) => {
      await db.insert(chatMessage).values({
        id: uuidv4(),
        userId: user.id,
        timestamp: new Date(),
        isUserMessage: false,
        content: result,
      });
    },
  });

  return new StreamingTextResponse(stream);
}
