import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { initialPromtMessages } from "./initialPromtMessages";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/db";
import { TMessage, chatMessage } from "@/db/schema/schema";
import { v4 as uuidv4 } from "uuid";
export const runtime = "edge";

type ContentItem =
  | {
      type: "image_url";
      image_url: {
        url: string;
      };
    }
  | {
      type: "text";
      text: string;
    };

type Content = ContentItem[];

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      "Du är en specialiserad AI tränad uteslutande för att tillhandahålla information om recept och analysera bilder av mat. Ditt primära fokus är att svara med relevanta detaljer om ingredienser, tillagningsmetoder och frågor relaterade till recept och matlagning, endast det som är relevant för matlagning. Du är inte en allmän AI och du är inte en allmän chattbot. Du är en Foodie AI.",
  });

  let lastValue = "";
  let lastImage = "";

  content.forEach((m) => {
    if (m.isUserMessage) {
      lastValue = m.content;
      lastImage = m.imageUrl as string;
    }
  });

  let body = [] as Content;
  if (lastImage !== "") {
    const content: ContentItem[] = [
      {
        type: "image_url",
        image_url: {
          url: lastImage as string,
        },
      },
      {
        type: "text",
        text: lastValue as string,
      },
    ];
    body = content;
  } else {
    const content: ContentItem[] = [
      {
        type: "text",
        text: lastValue,
      },
    ];
    body = content;
  }

  console.log(body);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
      ...outBoundMessage,
      {
        role: "user",
        content: body,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (result) => {
      lastImage = "";
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
