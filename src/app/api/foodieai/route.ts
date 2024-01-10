import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialPromtMessages } from "./initialPromtMessages";
export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const { content } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [...initialPromtMessages, { role: "user", content }],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
